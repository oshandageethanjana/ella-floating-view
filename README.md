# Ella Floating View — refined website

A warm, editorial redesign for Ella Floating View. Includes a new homepage, responsive navigation, coordinated typography and colours across the site, room rates, gallery, destination pages and booking requests.

## Run on Windows

1. Install Node.js (20 or newer).
2. Open this folder in a terminal.
3. Run `npm ci`.
4. Run `npm run dev` and open http://localhost:3000.

If port 3000 is busy, run `npm run dev -- --port 3107`.

## Production

Run `npm run build`, then `npm start`. Deploy as a Next.js application on a Node.js hosting service. This is source code, not a static site export.

## Booking and contact

The booking bar passes selected dates and guest count to the booking drawer. Availability is confirmed by the property; the website does not claim real-time inventory or take payment.

WhatsApp requests use the existing property number. Email delivery requires Resend configuration. Copy `.env.example` to `.env.local` and fill `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` with a verified sender. Optional Turnstile keys protect submissions. See `SECURE-MAIL-SETUP.txt` for the existing setup guide.

Supabase is optional. Without credentials the site uses local room content in `src/data/site.ts`. The gallery always uses the seven curated supplied photos in that file so older database gallery rows cannot bring back the previous images. The existing admin and database schema remain included.

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain, and confirm the address, phone number and room rates before publishing. Add social URLs only when available.

## Photography

The supplied property, room and terrace photos have AI-assisted restored versions in WebP, with the originals retained. They are previews based on the supplied material; generated details may differ from reality. Use original photography for exact room-category representation. The room collection uses a supplied bedroom preview once, with clearly captioned garden and breakfast scenes for variety. Category-specific bedroom photography can be added through the admin data when available. The terrace lettering was removed during restoration. Destination imagery is licensed, high-resolution photography from Wikimedia Commons, optimized to a maximum 2400px width. Attribution appears on /photo-credits and in PHOTO-CREDITS.md.

## Design and usability

- Ivory, forest green and copper palette; editorial serif headings.
- Responsive desktop navigation and mobile menu.
- Clear room pricing and an availability-request flow.
- Keyboard focus indicators, skip link, Escape-to-close menus and focus handling in the booking drawer.
- Reduced-motion support and mobile-safe date inputs.
- All original public pages and the existing admin/contact backend retained.

## Verification

Production build and TypeScript checks passed. Browser checks at 1440px and 390px covered the booking drawer, menu, date transfer, horizontal overflow and all main public routes. No browser page errors were reported. Email delivery, external WhatsApp sending, Supabase sign-in and live availability were not exercised because no live credentials or booking inventory were supplied.

## Updated design — island guide and room showcase

The homepage room section now uses a photography-led image-and-copy carousel with previous/next controls, room count and a booking button that selects the displayed room. The header and footer use the supplied full brand logo. Footer Facebook and Instagram links use the exact URLs provided by the property owner.

The interactive guide has two views: Sri Lanka and the journey into Ella, plus a local schematic for Nine Arches Bridge, Little Adam’s Peak and Ravana Falls. Selecting a pin or a destination button updates the adjacent photo and information. Official railway reservations and timetable links are included. The map is an illustrated guide, not a navigable road or rail map; no fixed train times or guaranteed transfers are claimed.

## Map and photo sources

Island outline: Natural Earth, 1:50m country boundaries (public domain): https://www.naturalearthdata.com/about/terms-of-use/
Dataset: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson

Railway references: https://seatreservation.railway.gov.lk/mtktwebslr/faq and https://www.eservices.railway.gov.lk/schedule/homeAction.action?lag=en
Destination reference: https://srilanka.travel/attraction?attraction_id=154

Destination photographs are bundled in `public/images/destinations/`; attribution and license links appear alongside each image on the website. The train image is from Haputale and is explicitly captioned as journey inspiration when another station is selected. It does not claim to depict Colombo Fort, Kandy or another station.

Full image source details: `src/data/photo-credits.json` and `PHOTO-CREDITS.md`. Retain these attributions when publishing.

`nThe supplied full brand logo is now displayed in the header and footer, without a separate text wordmark or circular background.

## Add TikTok and YouTube links

Open src/data/site.ts and fill the empty socials.tiktok and socials.youtube values with your full profile URLs. Both icons are already visible with Coming soon labels; until URLs are supplied they do not redirect visitors to unrelated profiles. Existing Facebook and Instagram links remain active.


## Gallery update (v5)

Seven supplied photos from New folder (3).zip replace the previous gallery. Built-in ImageGen restored colour and clarity; WebP assets retain the supplied scenes. See IMAGE-RESTORATION.md for exact prompts and source filenames. Full-frame modal with Escape, arrow keys, focus return, category filters and mobile layouts. Homepage inset and slow-life section use the new garden and sunset photos. The existing restored room/property and high-resolution destination photos remain in use. Legacy database room image paths are mapped to the restored room image. No live database data was changed.

## Rooms, Our stay and Contact — v6
The room showcase now uses one bedroom preview, a garden photograph for Deluxe Double, and a breakfast photograph for Family. These shared-property scenes are explicitly captioned, not represented as additional bedroom photographs. Custom room photographs from the admin data are preserved. The Rooms page removes duplicated photo sections and adds a concise rate comparison. Room detail pages use distinct supporting photography and text-only alternative room links.

Our stay has a new supplied garden-view hero. Contact has a split editorial introduction, direct phone/WhatsApp/directions cards, a styled form, arrival help and a photographed location preview. The live Google map is loaded on request so the page stays useful before third-party content loads. No new hotel facilities or room layouts are invented.

Verified: production build/type checks, image loading, room carousel choices and booking selection, desktop and mobile 390/320 layouts, contact required fields and simulated API success/error. Actual email delivery and external Google Maps content were not exercised.


## Hero video — v7
The homepage hero uses the supplied hero.mp4 instead of the mountain still. The original 1280×720, approximately 102-second video is bundled unchanged to preserve quality. Muted autoplay, loop and inline playback; no visible playback controls. Reduced-motion visitors see a paused frame with no playback controls. hero-poster.jpg is extracted from the supplied video. The video is about 59 MB; allow it to load on slower connections.

