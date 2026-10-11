'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BookingTrigger } from '@/components/BookingTrigger';
const links = [['Our stay','/about'],['Rooms','/rooms'],['Explore Ella','/explore'],['Gallery','/gallery'],['Contact','/contact']];
export function Header({ dark = false }: { dark?: boolean }) {
  const [open,setOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>32); scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[]);
  useEffect(()=>{
    if(!open)return;
    const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    const first=menu.current?.querySelector<HTMLAnchorElement>('a');first?.focus();
    function keyboard(e:KeyboardEvent){if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}if(e.key==='Tab'){const controls=[toggle.current,...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>('a')||[])].filter(Boolean) as HTMLElement[];const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}
    window.addEventListener('keydown',keyboard);return()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',keyboard)};
  },[open]);
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className={`site-header ${scrolled||!dark?'header-solid':''} ${open?'header-open':''}`}><div className="shell header-inner"><Link href="/" className="brand" aria-label="Ella Floating View home" onClick={()=>setOpen(false)}><Image quality={90} src="/images/brand-logo.png" alt="Ella Floating View" width={490} height={490} className="brand-logo" priority /></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined}>{label}</Link>)}</nav><div className="header-actions"><BookingTrigger className="header-book" onClick={()=>setOpen(false)}>Book a stay <ArrowUpRight size={16}/></BookingTrigger><button ref={toggle} className="menu-toggle" type="button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X size={24}/>:<Menu size={24}/>}</button></div></div></header>{open&&<div ref={menu} id="mobile-menu" className="mobile-menu"><p className="eyebrow">Your Ella escape</p><nav aria-label="Mobile navigation">{[['Home','/'],...links].map(([label,href],i)=><Link href={href} key={href} onClick={()=>setOpen(false)}><span>{label}</span><small>0{i+1}</small></Link>)}</nav><p>Mountain views. Slow mornings.<br/>A little closer to nature.</p></div>}</>;
}




