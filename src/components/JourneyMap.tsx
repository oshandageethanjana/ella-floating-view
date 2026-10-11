'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, TrainFront, Mountain, MapPin, Plane, Footprints } from 'lucide-react';
import outline from '@/data/sri-lanka-outline.json';
import credits from '@/data/photo-credits.json';

type Stop = { id: string; name: string; label: string; lat: number; lon: number; kind: 'rail'|'airport'|'stay'; text: string; image: string; photo: string };
const stops: Stop[] = [
  {id:'airport',name:'Bandaranaike International Airport',label:'Airport',lat:7.18,lon:79.884,kind:'airport',text:'Arriving by air? Continue towards Colombo Fort for the railway journey, or plan a road transfer to Ella. Arrange the onward journey separately.',image:'railway',photo:'Hill-country railway near Haputale · journey inspiration'},
  {id:'colombo',name:'Colombo Fort',label:'Colombo Fort',lat:6.934,lon:79.85,kind:'rail',text:'Start your hill-country railway journey from Colombo Fort. Search official services for Ella and reserve seats for your travel date.',image:'railway',photo:'Hill-country railway near Haputale · journey inspiration'},
  {id:'kandy',name:'Kandy',label:'Kandy',lat:7.29,lon:80.633,kind:'rail',text:'A popular starting point for the mountain railway journey to Ella. Look up services and seat availability with Sri Lanka Railways before travelling.',image:'railway',photo:'Hill-country railway near Haputale · journey inspiration'},
  {id:'nanuoya',name:'Nanu Oya',label:'Nanu Oya',lat:6.942,lon:80.744,kind:'rail',text:'A hill-country stop serving the Nuwara Eliya area. Continue along the railway towards Haputale and Ella, checking the current timetable.',image:'railway',photo:'Hill-country railway near Haputale · journey inspiration'},
  {id:'haputale',name:'Haputale',label:'Haputale',lat:6.768,lon:80.958,kind:'rail',text:'Green hills and a memorable stretch of the railway. Haputale lies on the main line before the onward journey towards Ella.',image:'railway',photo:'Train in the mountains near Haputale'},
  {id:'ella',name:'Ella — your mountain escape',label:'Ella',lat:6.876,lon:81.048,kind:'stay',text:'Arrive at Ella railway station and contact Ella Floating View for directions to the property on Waterfall Road. Settle in, then discover the trails and viewpoints around town.',image:'bridge',photo:'Nine Arches Bridge, Demodara'},
  {id:'badulla',name:'Badulla',label:'Badulla',lat:6.985,lon:81.056,kind:'rail',text:'The main line continues beyond Ella towards Badulla. When booking, select your actual arrival station and check the latest railway service information.',image:'railway',photo:'Hill-country railway near Haputale · journey inspiration'}
];
const nearby = [
  {id:'bridge',name:'Nine Arches Bridge',label:'The railway landmark',text:'Discover the stone arches in the green hills near Demodara. A favourite place to enjoy the landscape and see Ella’s railway heritage.',image:'bridge',photo:'Nine Arches Bridge, Demodara',x:74,y:23,query:'Nine Arches Bridge Ella'},
  {id:'peak',name:'Little Adam’s Peak',label:'Walk into the view',text:'Take a walk towards one of Ella’s best-known viewpoints. Plan for the weather, wear comfortable shoes and enjoy the surrounding green hills.',image:'peak',photo:'Little Adam’s Peak, Ella',x:81,y:58,query:'Little Adams Peak Ella'},
  {id:'falls',name:'Ravana Falls',label:'A waterfall stop',text:'Add a visit to Ravana Falls to your Ella plans. Follow local guidance and enjoy the falls from a safe viewing area.',image:'falls',photo:'Ravana Falls near Ella',x:33,y:85,query:'Ravana Falls Ella'}
];
const project = (lon:number,lat:number) => ({x:58+(lon-79.5)*155,y:32+(9.9-lat)*142});
const geometry = outline as { type: string; coordinates: number[][][] | number[][][][] };
const rings: number[][][] = geometry.type === 'Polygon' ? geometry.coordinates as number[][][] : (geometry.coordinates as number[][][][]).flat();
const coast = rings.map(ring=>ring.map((p,i)=>{const point=project(p[0],p[1]);return `${i?'L':'M'}${point.x.toFixed(1)},${point.y.toFixed(1)}`}).join(' ')+' Z').join(' ');
const routeStops = ['colombo','kandy','nanuoya','haputale','ella','badulla'].map(id=>stops.find(s=>s.id===id)!);
const route = routeStops.map((stop,i)=>{const p=project(stop.lon,stop.lat);return `${i?'L':'M'} ${p.x} ${p.y}`}).join(' ');
const labelPosition: Record<string,{dx:number;dy:number;anchor:'start'|'end'}> = {airport:{dx:-15,dy:-4,anchor:'end'},colombo:{dx:-15,dy:15,anchor:'end'},kandy:{dx:15,dy:-6,anchor:'start'},nanuoya:{dx:-17,dy:-6,anchor:'end'},haputale:{dx:-16,dy:22,anchor:'end'},ella:{dx:20,dy:10,anchor:'start'},badulla:{dx:20,dy:-18,anchor:'start'}};

export function JourneyMap() {
  const [mode,setMode]=useState<'journey'|'nearby'>('journey');
  const [station,setStation]=useState('ella');
  const [place,setPlace]=useState('bridge');
  const selected=mode==='journey'?stops.find(stop=>stop.id===station)!:nearby.find(stop=>stop.id===place)!;
  const credit=credits.find(item=>item.id===selected.image)!;
  return <section id="journey" className="journey-section" aria-labelledby="journey-title"><div className="shell">
    <div className="journey-heading"><div><p className="eyebrow">An island of possibilities</p><h2 id="journey-title">Find your way here.<br /><em>Then find your adventure.</em></h2></div><p className="body-copy">Follow the railway into the hills, then explore a little closer to home. Select a stop on the map to take a look.</p></div>
    <div className="journey-layout"><div className="journey-map-panel">
      <div className="map-tabs" role="group" aria-label="Map view"><button type="button" aria-pressed={mode==='journey'} onClick={()=>setMode('journey')}><TrainFront size={16}/>The journey to Ella</button><button type="button" aria-pressed={mode==='nearby'} onClick={()=>setMode('nearby')}><Footprints size={16}/>Around Ella</button></div>
      {mode==='journey'?<div className="island-map">
        <svg viewBox="0 0 520 670" role="img" aria-label="Sri Lanka outline with an illustrated railway route from Colombo through the hill country to Ella and Badulla"><defs><pattern id="map-contours" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M-10 48 Q12 4 48 0 M0 60 Q30 18 60 10" fill="none" stroke="#f7faf3" strokeWidth=".7" opacity=".65"/></pattern></defs><path d={coast} className="island-coast"/><path d={coast} fill="url(#map-contours)"/><path d={route} className="railway-route"/>
          <text x="98" y="148" className="ocean-label" transform="rotate(-90 98 148)">INDIAN OCEAN</text><text x="362" y="202" className="island-label">SRI LANKA</text><path d="M445 73v-30m-5 7 5-8 5 8" fill="none" stroke="#6a8270"/><text x="445" y="30" textAnchor="middle" className="map-place-label">N</text>
          {stops.map(stop=>{const p=project(stop.lon,stop.lat),label=labelPosition[stop.id];return <g key={stop.id}><path d={`M${p.x} ${p.y} l${label.dx*.8} ${label.dy}`} fill="none" stroke="#859582" strokeWidth=".7"/><text x={p.x+label.dx} y={p.y+label.dy} textAnchor={label.anchor} className={`map-place-label ${station===stop.id?'map-label-selected':''}`}>{stop.label}</text></g>})}
          <g transform="translate(207 381)" stroke="#91a58a" strokeWidth="1.5" fill="#aec0a2"><path d="M0 13 10-9 20 13M12 13 25-15 40 13"/></g><g transform="translate(185 273)" fill="#9fb59a"><path d="m0 14 10-20 10 20zM22 14 32-14 42 14z"/><path d="M9 12h3v10H9M31 12h3v10h-3"/></g>
        </svg>
        {stops.map(stop=>{const p=project(stop.lon,stop.lat);return <button key={stop.id} type="button" className={`map-pin ${station===stop.id?'map-pin-active':''} ${stop.kind==='stay'?'map-stay-pin':''}`} style={{left:`${p.x/520*100}%`,top:`${p.y/670*100}%`}} aria-label={`View ${stop.name}`} aria-pressed={station===stop.id} onClick={()=>setStation(stop.id)}>{stop.kind==='airport'?<Plane size={13}/>:stop.kind==='stay'?<MapPin size={14}/>:<span/>}</button>})}
        <div className="map-legend"><span><i/>Illustrated railway journey</span><span><MapPin size={13}/>Your Ella base</span></div>
      </div>:<div className="local-map"><p className="local-map-eyebrow">A little closer to home</p><svg viewBox="0 0 500 500" aria-hidden="true"><path d="M0 100 Q150 0 350 170T510 140M-20 220 Q180 70 500 280M-30 350 Q170 200 500 450M0 460 Q200 300 500 580" className="local-contour"/><path d="M155 500 Q175 350 245 245 T220 0" className="local-road"/><path d="M0 180 Q230 170 370 115T500 100" className="local-rail"/><path d="M245 245 Q340 200 370 115M245 245 Q330 300 405 290" className="local-trail"/></svg><div className="local-town"><MapPin size={19}/><span>ELLA</span><small>Your base</small></div>{nearby.map(stop=><button type="button" key={stop.id} className={`local-place ${place===stop.id?'local-place-active':''}`} style={{left:`${stop.x}%`,top:`${stop.y}%`}} aria-pressed={place===stop.id} onClick={()=>setPlace(stop.id)}>{stop.id==='peak'?<Mountain size={22}/>:stop.id==='bridge'?<TrainFront size={22}/>:<MapPin size={22}/>}<span>{stop.name}</span></button>)}<span className="local-road-label">Road towards the falls</span><div className="map-legend"><span><i/>Railway</span><span><Footprints size={13}/>Walking inspiration</span></div></div>}
      <p className="map-note">Illustrated guide. Routes and local positions are schematic; use directions for navigation.</p>
    </div>
    <div className="journey-detail" aria-live="polite" aria-atomic="true"><div className="journey-photo"><Image quality={90} key={selected.image} src={`/images/destinations/${selected.image}.webp`} alt={selected.photo} fill sizes="(max-width: 800px) 100vw, 45vw" className="object-cover"/><span>{selected.photo}</span></div><div className="journey-detail-copy"><p className="eyebrow">{mode==='journey'?'The journey is part of the stay':nearby.find(stop=>stop.id===place)!.label}</p><h3>{selected.name}</h3><p className="body-copy">{selected.text}</p>{mode==='journey'?<div className="journey-links"><a className="text-link" href="https://seatreservation.railway.gov.lk/mtktwebslr/" target="_blank" rel="noopener noreferrer">Official train reservations <ArrowUpRight size={16}/></a><a href="https://www.eservices.railway.gov.lk/schedule/homeAction.action?lag=en" target="_blank" rel="noopener noreferrer">Check train times <ArrowUpRight size={14}/></a></div>:<a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nearby.find(stop=>stop.id===place)!.query)}`} target="_blank" rel="noopener noreferrer">See location & directions <ArrowUpRight size={16}/></a>}<p className="photo-credit">Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer">{credit.author}</a> · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a></p></div></div>
    </div><div className="journey-stop-picker" role="group" aria-label={mode==='journey'?'Choose a journey stop':'Choose a place around Ella'}>{(mode==='journey'?stops:nearby).map(stop=><button type="button" key={stop.id} aria-pressed={(mode==='journey'?station:place)===stop.id} onClick={()=>mode==='journey'?setStation(stop.id):setPlace(stop.id)}>{mode==='journey'?(stop as Stop).label:stop.name}</button>)}</div>
  </div></section>;
}




