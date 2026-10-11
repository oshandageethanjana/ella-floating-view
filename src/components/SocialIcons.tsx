import { Facebook, Instagram, Youtube } from 'lucide-react';
import { site } from '@/data/site';
function TikTok(){return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor"><path d="M14.2 2h3.1a5.2 5.2 0 0 0 4.2 4.2v3.1a8.2 8.2 0 0 1-4.2-1.2v7.3A6.6 6.6 0 1 1 11.5 9v3.2a3.4 3.4 0 1 0 2.7 3.3V2Z"/></svg>}
export function SocialIcons(){
  const items=[{label:'Facebook',href:site.socials.facebook,icon:<Facebook size={21}/>},{label:'Instagram',href:site.socials.instagram,icon:<Instagram size={21}/>},{label:'TikTok',href:site.socials.tiktok,icon:<TikTok/>},{label:'YouTube',href:site.socials.youtube,icon:<Youtube size={22}/>}];
  return <div className="social-list">{items.map(item=><div className="social-item" key={item.label}>{item.href?<a className="social-circle" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.label}>{item.icon}</a>:<span className="social-circle social-pending" role="img" aria-label={`${item.label} — coming soon`} title={`${item.label} — coming soon`}>{item.icon}</span>}<span className="social-name">{item.label}</span></div>)}</div>;
}


