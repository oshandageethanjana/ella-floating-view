'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, MapPin, Map, X } from 'lucide-react';
import { site } from '@/data/site';
const mapQuery = encodeURIComponent('Ella Floating View, Waterfall Road, Ella, Sri Lanka');
export function GoogleMap() {
 const [showMap,setShowMap]=useState(false);
 const directionsUrl=`https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
 return <section className={`location-preview ${showMap?'location-map-open':''}`} aria-label="Ella Floating View location">
  <Image quality={90} src="/images/gallery/garden-corner.webp" alt="The garden and hills around Ella Floating View" fill sizes="100vw" className="object-cover"/>
  <div className="location-preview-shade"/>
  {showMap&&<iframe src={`https://www.google.com/maps?q=${mapQuery}&output=embed&z=16`} title="Ella Floating View map" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="location-live-map"/>}
  <div className="location-preview-card"><MapPin size={30} strokeWidth={1.2}/><p className="eyebrow">Your little place in Ella</p><h3>Waterfall Road.<br/>A higher view.</h3><p>{site.address}</p><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link">Open in Google Maps <ArrowUpRight size={16}/></a><button type="button" onClick={()=>setShowMap(!showMap)} aria-expanded={showMap}>{showMap?<X size={15}/>:<Map size={15}/>} {showMap?'Back to the view':'Show interactive map'}</button></div>
  {!showMap&&<span className="location-preview-caption">Ella Floating View · Sri Lanka</span>}
 </section>;
}
