import{useState,useEffect}from'react';import{api}from'./api.js';
export function useApi(path){const[s,set]=useState({data:null,loading:true,error:null});
 const load=()=>{set(x=>({...x,loading:true,error:null}));api(path).then(data=>set({data,loading:false,error:null})).catch(e=>set({data:null,loading:false,error:e.message}))};
 useEffect(load,[path]);return{...s,reload:load,setData:data=>set(x=>({...x,data}))}}
export function useSeo(title,desc){useEffect(()=>{document.title=title;let m=document.querySelector('meta[name=description]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=desc},[title])}
