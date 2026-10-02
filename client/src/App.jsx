import{useState,useEffect}from'react';import{Routes,Route,Link,NavLink,Navigate,useLocation}from'react-router-dom';
import{Menu,X,MessageCircle,ArrowUp}from'lucide-react';import{wa}from'./api.js';
import Home from'./pages/Home.jsx';import Services from'./pages/Services.jsx';import Book from'./pages/Book.jsx';import Contact from'./pages/Contact.jsx';import{AdminLogin}from'./pages/Admin.jsx';import{Shell}from'./pages/AdminManagers.jsx';import Gallery from'./pages/Gallery.jsx';import About from'./pages/About.jsx';import ServiceDetail from'./pages/ServiceDetail.jsx';import{Toaster}from'./ui.jsx';
const nav=[['/','Home'],['/services','Services'],['/gallery','Gallery'],['/about','About'],['/contact','Contact']];
export const btn='inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none';
export const Primary=`${btn} bg-rose text-white hover:bg-ink`;export const Ghost=`${btn} border border-line bg-white hover:border-rose`;
function Layout({children}){const[open,setOpen]=useState(false),[sc,setSc]=useState(false),[top,setTop]=useState(false),loc=useLocation();
 useEffect(()=>{setOpen(false);window.scrollTo(0,0)},[loc.pathname]);
 useEffect(()=>{const f=()=>{setSc(scrollY>20);setTop(scrollY>600)},k=e=>e.key==='Escape'&&setOpen(false);addEventListener('scroll',f);addEventListener('keydown',k);return()=>{removeEventListener('scroll',f);removeEventListener('keydown',k)}},[]);
 return<>
 <header className={`sticky top-0 z-40 transition ${sc?'bg-cream/95 shadow-sm border-b border-line backdrop-blur':'bg-cream'}`}>
  <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
   <Link to="/" className="leading-none"><span className="font-serif text-2xl">NailsByMia</span><span className="block text-[10px] tracking-[.3em] text-rose">NAIL STUDIO</span></Link>
   <nav className="hidden items-center gap-8 text-sm md:flex">{nav.map(([to,l])=><NavLink key={to} to={to} className={({isActive})=>isActive?'text-rose':'text-mute hover:text-ink'}>{l}</NavLink>)}<Link to="/book" className={Primary}>Book Appointment</Link></nav>
   <button className="md:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
  {open&&<nav className="grid gap-1 border-t border-line bg-cream px-5 pb-5 md:hidden">{nav.map(([to,l])=><Link key={to} to={to} className="py-3">{l}</Link>)}<Link to="/book" className={Primary}>Book Appointment</Link></nav>}
 </header>
 <main className="min-h-[70vh]">{children}</main>
 <footer className="mt-24 bg-ink pb-16 text-white/80 md:pb-0"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 text-sm">
  <div><p className="font-serif text-xl text-white">NailsByMia</p><p className="mt-2">Beautiful nails, made for you.</p></div>
  <div className="grid gap-2"><b className="text-white">Explore</b>{nav.map(([to,l])=><Link key={to} to={to}>{l}</Link>)}</div>
  <div className="grid gap-2"><b className="text-white">Contact</b><a href="tel:+2348034567890">+234 803 456 7890</a><a href="mailto:hello@nailsbymia.com">hello@nailsbymia.com</a><span>Ikeja, Lagos</span></div>
  <div className="grid gap-2"><b className="text-white">Hours</b><span>Mon–Fri 9:00 AM–6:00 PM (Fri to 7)</span><span>Sat 10:00 AM–7:00 PM</span><span>Sun Closed</span><a href="https://instagram.com/nailsbymia" target="_blank" rel="noopener noreferrer">Instagram @nailsbymia</a></div></div>
  <p className="border-t border-white/10 py-5 text-center text-xs">© 2026 NailsByMia. All rights reserved.</p></footer>
 {loc.pathname!=='/book'&&<Link to="/book" className={Primary+' fixed inset-x-5 bottom-4 z-30 md:hidden'}>Book Appointment</Link>}{top&&<button aria-label="Back to top" onClick={()=>scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-20 left-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-line bg-white shadow md:bottom-5"><ArrowUp size={18}/></button>}<a href={wa("Hi NailsByMia! I'd like to ask about an appointment.")} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" title="Chat with us" className="fixed bottom-20 right-5 md:bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg"><MessageCircle/></a></>}
export default function App(){return<><Toaster/><Routes>
 <Route path="/admin/login" element={<AdminLogin/>}/><Route path="/admin/*" element={<Shell/>}/>
 <Route path="/admin" element={<Navigate to="/admin/dashboard"/>}/>
 {[['/',Home],['/services',Services],['/services/:id',ServiceDetail],['/gallery',Gallery],['/about',About],['/book',Book],['/contact',Contact]].map(([p,C])=><Route key={p} path={p} element={<Layout><C/></Layout>}/>)}
 <Route path="*" element={<Layout><div className="py-32 text-center"><h1 className="text-5xl">404</h1><p className="mt-3 text-mute">This page doesn't exist.</p><Link to="/" className={Primary+' mt-6'}>Back Home</Link></div></Layout>}/></Routes></>}
