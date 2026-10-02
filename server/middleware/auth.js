import jwt from 'jsonwebtoken';
const parse=q=>{const t=(q.headers.authorization||'').replace('Bearer ','');try{return jwt.verify(t,process.env.JWT_SECRET)}catch{return null}};
export const soft=(q,r,n)=>{q.admin=parse(q);n()};
export const admin=(q,r,n)=>{const u=parse(q);if(!u||u.role!=='admin')return r.status(401).json({success:false,message:'Unauthorized'});q.admin=u;n()};
