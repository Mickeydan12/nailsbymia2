import{useState}from'react';import{useSeo}from'../hooks.js';import{api}from'../api.js';import{Primary}from'../App.jsx';
const F='mt-1 w-full rounded-xl border border-line bg-white px-4 py-3';
export default function Contact(){const[f,setF]=useState({name:'',email:'',phone:'',subject:'',message:''}),[st,setSt]=useState({}),[busy,setBusy]=useState(false);useSeo('Contact | NailsByMia','Contact NailsByMia in Ikeja, Lagos by phone, WhatsApp, email or message.');
 const set=k=>e=>setF({...f,[k]:e.target.value});
 const submit=async e=>{e.preventDefault();if(busy)return;setBusy(true);setSt({});try{await api('/contact',{method:'POST',body:f});setSt({ok:'Message sent successfully!'});setF({name:'',email:'',phone:'',subject:'',message:''})}catch(x){setSt({err:x.status?x.message:'Something went wrong. Please try again.'})}setBusy(false)};
 return<section className="mx-auto max-w-2xl px-5 py-14"><h1 className="text-4xl sm:text-5xl">Let's talk</h1><p className="mt-2 text-mute">Have a question about a service or booking? Send us a message.</p>
 <p className="mt-4 text-sm"><a className="text-rose" href="tel:+2348034567890">+234 803 456 7890</a> · <a className="text-rose" href="mailto:hello@nailsbymia.com">hello@nailsbymia.com</a> · Ikeja, Lagos</p>
 <form onSubmit={submit} className="mt-8 grid gap-4" noValidate>
 {[['name','Full Name *'],['email','Email *'],['phone','Phone'],['subject','Subject']].map(([k,l])=><label key={k} className="text-sm font-medium">{l}<input className={F} value={f[k]} onChange={set(k)} type={k==='email'?'email':'text'}/></label>)}
 <label className="text-sm font-medium">Message *<textarea rows="5" className={F} value={f.message} onChange={set('message')}/></label>
 {st.ok&&<p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">{st.ok}</p>}{st.err&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{st.err}</p>}
 <button disabled={busy} className={Primary}>{busy?'Sending...':'Send Message'}</button></form></section>}
