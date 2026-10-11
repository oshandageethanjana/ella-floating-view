import { NextRequest, NextResponse } from 'next/server';
import { rooms } from '@/data/site';

export const runtime = 'nodejs';

type Payload = {
  kind?: 'contact' | 'booking';
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
  checkIn?: unknown;
  checkOut?: unknown;
  guests?: unknown;
  room?: unknown;
  turnstileToken?: unknown;
};

const LIMIT_WINDOW_MS = 15 * 60 * 1000;
const LIMIT_MAX = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 160;
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('cf-connecting-ip') || 'unknown';
}

function rateLimited(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= LIMIT_MAX) return true;
  current.count += 1;
  return false;
}

function originAllowed(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host;
    return originUrl.host === forwardedHost;
  } catch {
    return false;
  }
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== 'unknown') body.set('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
    cache: 'no-store',
    signal: AbortSignal.timeout(8000)
  });

  if (!response.ok) return false;
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

async function sendResend(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('MAIL_NOT_CONFIGURED');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    const reason = await response.text().catch(() => '');
    console.error('Mail provider rejected request', response.status, reason.slice(0, 300));
    throw new Error('MAIL_FAILED');
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (!contentType.includes('application/json') || contentLength > 12_000) {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 415 });
  }

  if (!originAllowed(request)) {
    return NextResponse.json({ message: 'Request origin rejected.' }, { status: 403 });
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': '900' } });
  }

  let body: Payload;
  try {
    body = await request.json() as Payload;
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const kind = body.kind === 'booking' ? 'booking' : 'contact';
  const name = clean(body.name, 80);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);
  const checkIn = clean(body.checkIn, 10);
  const checkOut = clean(body.checkOut, 10);
  const guests = Math.min(6, Math.max(1, Number.parseInt(clean(body.guests, 2) || '2', 10) || 2));
  const room = clean(body.room, 120);
  const turnstileToken = clean(body.turnstileToken, 2048);

  if (!name || !validEmail(email)) {
    return NextResponse.json({ message: 'Please enter a valid name and email.' }, { status: 400 });
  }

  if (kind === 'contact' && !message) {
    return NextResponse.json({ message: 'Please enter a message.' }, { status: 400 });
  }

  if (kind === 'booking') {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Colombo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const pick = (type: string) => parts.find((part) => part.type === type)?.value || '';
    const todaySriLanka = `${pick('year')}-${pick('month')}-${pick('day')}`;
    if (!validDate(checkIn) || !validDate(checkOut) || checkIn < todaySriLanka || checkOut <= checkIn) {
      return NextResponse.json({ message: 'Please select valid future check-in and check-out dates.' }, { status: 400 });
    }
    if (room && !rooms.some((item) => item.name === room)) {
      return NextResponse.json({ message: 'Please select a valid room.' }, { status: 400 });
    }
  }

  const human = await verifyTurnstile(turnstileToken, ip).catch(() => false);
  if (!human) {
    return NextResponse.json({ message: 'Security verification failed. Please try again.' }, { status: 403 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from || !process.env.RESEND_API_KEY) {
    console.error('Email environment variables are not configured.');
    return NextResponse.json({ message: 'Email service is not configured yet. Please use WhatsApp or call the property.' }, { status: 503 });
  }

  const lines = kind === 'booking'
    ? [
        'New booking request — Ella Floating View',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        `Check-in: ${checkIn}`,
        `Check-out: ${checkOut}`,
        `Guests: ${guests}`,
        `Room: ${room || 'Any available room'}`,
        `Message: ${message || '-'}`
      ]
    : [
        'New website message — Ella Floating View',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        '',
        message
      ];

  try {
    await sendResend({
      from,
      to: [to],
      reply_to: email,
      subject: kind === 'booking' ? `Booking request from ${name}` : `Website message from ${name}`,
      text: lines.join('\n')
    });

    // Best-effort acknowledgement. The inquiry has already been delivered if this fails.
    await sendResend({
      from,
      to: [email],
      subject: kind === 'booking' ? 'We received your booking request — Ella Floating View' : 'We received your message — Ella Floating View',
      text: kind === 'booking'
        ? `Hello ${name},\n\nThank you for contacting Ella Floating View. We received your booking request for ${checkIn} to ${checkOut}. The property will reply to confirm availability.\n\nElla Floating View\nWaterfall Road, Ella, Ella Town, Sri Lanka, 900090\n+94 75 200 0030`
        : `Hello ${name},\n\nThank you for contacting Ella Floating View. We received your message and will reply as soon as possible.\n\nElla Floating View\nWaterfall Road, Ella, Ella Town, Sri Lanka, 900090\n+94 75 200 0030`
    }).catch((error) => console.error('Acknowledgement email failed', error));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API error', error);
    return NextResponse.json({ message: 'Unable to send the message right now. Please use WhatsApp or call the property.' }, { status: 502 });
  }
}

