const BASE=import.meta.env.VITE_API_URL||'http://localhost:5000/api';
export const ORIGIN=BASE.replace(/\/api$/,'');
export async function api(path,{method='GET',body,form}={}){
 const t=localStorage.getItem('nbm_token'),h={};if(t)h.Authorization='Bearer '+t;if(body)h['Content-Type']='application/json';
 const r=await fetch(BASE+path,{method,headers:h,body:form||(body&&JSON.stringify(body))});
 const j=await r.json().catch(()=>({}));
 if(r.status===401&&t){localStorage.removeItem('nbm_token');if(location.pathname.startsWith('/admin')&&!location.pathname.endsWith('login'))location.href='/admin/login'}
 if(!r.ok)throw Object.assign(new Error(j.message||'Request failed'),{status:r.status});return j.data}
export const naira=n=>'₦'+Number(n).toLocaleString('en-NG');
export const WA='2348034567890';
export const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
export const longDate=d=>new Date(d+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
