import{useState}from'react';import{useApi,useSeo}from'../hooks.js';import{ServiceCard,Skel,Err}from'../ui.jsx';
const cats=['All','Gel','Acrylic','Extensions','Nail Art','Removal'];
export default function Services(){const{data,loading,error,reload}=useApi('/services'),[c,setC]=useState('All');useSeo('Services | NailsByMia','Gel, acrylic, extensions and custom nail art services in Ikeja, Lagos.');
 const list=(data||[]).filter(s=>c==='All'||s.category===c);
 return<section className="mx-auto max-w-6xl px-5 py-14"><h1 className="text-4xl sm:text-5xl">Find your perfect set.</h1><p className="mt-2 text-mute">Choose from simple everyday styles, elegant classics and custom designs.</p>
 <div className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2">{cats.map(x=><button key={x} onClick={()=>setC(x)} aria-pressed={c===x} className={`shrink-0 rounded-full border px-4 py-2 text-sm ${c===x?'border-rose bg-rose text-white':'border-line bg-white'}`}>{x}</button>)}</div>
 <div className="mt-6">{loading?<Skel/>:error?<Err msg="We couldn't load our services right now. Please refresh and try again." retry={reload}/>:list.length===0?<p className="text-mute">No services in this category yet.</p>:
 <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{list.map(s=><ServiceCard key={s._id} s={s}/>)}</div>}</div></section>}
