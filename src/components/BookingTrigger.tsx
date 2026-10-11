'use client';

import type { ReactNode } from 'react';

type BookingDetail = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  room?: string;
};

type Props = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  detail?: BookingDetail;
  onClick?: () => void;
};

export function BookingTrigger({ children, className = '', ariaLabel, detail, onClick }: Props) {
  function open() {
    onClick?.();
    window.dispatchEvent(new CustomEvent('efv:booking-open', { detail: detail || {} }));
  }

  return (
    <button type="button" onClick={open} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}


