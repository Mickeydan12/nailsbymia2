import{useState,useEffect}from'react';import{Link}from'react-router-dom';import{motion,AnimatePresence}from'framer-motion';import{ChevronLeft,ChevronRight,X}from'lucide-react';
import{useApi,useSeo}from'../hooks.js';import{Err,Img,Skel}from'../ui.jsx';import{Ghost}from'../App.jsx';
const cats=['All','French','Chrome','Acrylic','Simple','Custom'];
function Lightbox({items,i,setI}){const open=i!==null,it=items[i];
 useEffect(()=>{if(!open)return;const n=items.length,k=e=>{if(e.key==='Escape')setI(null);if(e.key==='ArrowRight')setI((i+1)%n);if(e.key==='ArrowLeft')setI((i-1+n)%n)};addEventListener('keydown',k);document.body.style.overflow='hidden';return()=>{removeEventListener('keydown',k);document.body.style.overflow=''}},[i]);
 return<AnimatePresence>{open&&it&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label={it.title} className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={()=>setI(null)}>
 <div className="relative w-full max-w-lg" onClick={e=>e.stopPropagation()}><Img src={it.image} alt={`${it.title} nail design`} className="aspect-square w-full rounded-2xl object-cover"/>
  <p className="mt-3 text-center text-white"><b>{it.title}</b> <span className="text-white/70">· {it.category}</span></p>
  <button autoFocus aria-label="Close" onClick={()=>setI(null)} className="absolute right-2 top-2 rounded-full bg-white p-2"><X size={18}/></button>
  <button aria-label="Previous" onClick={()=>setI((i-1+items.length)%items.length)} className="absolute left-2 top-1/2 rounded-full bg-white p-2"><ChevronLeft/></button>
  <button aria-label="Next" onClick={()=>setI((i+1)%items.length)} className="absolute right-2 top-1/2 rounded-full bg-white p-2"><ChevronRight/></button></div></motion.div>}</AnimatePresence>}
export function GalleryBlock({limit}){const{data,loading,error,reload}=useApi('/gallery'),[c,setC]=useState('All'),[i,setI]=useState(null);
 const all=(data||[]).filter(g=>c==='All'||g.category===c),items=limit?all.slice(0,limit):all;
 return<div><div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2">{cats.map(x=><button key={x} onClick={()=>setC(x)} aria-pressed={c===x} className={`shrink-0 rounded-full border px-4 py-2 text-sm ${c===x?'border-rose bg-rose text-white':'border-line bg-white'}`}>{x}</button>)}</div>
 <div className="mt-6">{loading?<Skel n={4}/>:error?<Err msg="Our gallery couldn't be loaded right now." retry={reload}/>:items.length===0?<p className="text-mute">No designs found.</p>:
 <div className="columns-2 gap-4 md:columns-3">{items.map((g,n)=><button key={g._id} onClick={()=>setI(n)} className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-white text-left" aria-label={`View ${g.title}`}>
 <Img src={g.image} alt={`${g.title} nail design`} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${n%3===0?'aspect-[3/4]':'aspect-square'}`}/><span className="block p-3 text-sm"><b>{g.title}</b><span className="block text-xs text-mute">{g.category}</span></span></button>)}</div>}</div>
 <Lightbox items={items} i={i} setI={setI}/></div>}
export default function Gallery(){useSeo('Gallery | NailsByMia','Browse French, chrome, acrylic and custom nail designs by NailsByMia in Ikeja, Lagos.');
 return<section className="mx-auto max-w-6xl px-5 py-14"><h1 className="text-4xl sm:text-5xl">A little inspiration</h1><p className="mb-8 mt-2 text-mute">Your next set might be hiding here.</p><GalleryBlock/><div className="mt-10 text-center"><Link to="/book" className={Ghost}>Book your set</Link></div></section>}
