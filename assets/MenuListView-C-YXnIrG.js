import{_ as M}from"./Pagination-CmNJsJVR.js";import{d as V,u as q,c as p,r as m,p as x,o as B,a as u,b as f,f as c,e as d,k as C,F as S,g as T,q as D,s as G,_ as I,v as L,j as R,x as w,m as z}from"./index-Bm1-A_83.js";import{_ as E}from"./Tab-Coua-7-e.js";import"./index-ByXuEI9u.js";const N={class:"contentWrap"},W={class:"shoppingWrap"},F={class:"shopWrap","data-aos":"fade-left","data-aos-duration":"800","data-aos-easing":"ease-in-sine"},P={class:"shopItem"},U=V({__name:"MenuListView",setup(j){const a=q(),n=D(),g=G(),_=p(()=>a.menuList),i=m(null),s=m({current:1,pageSize:8}),h=p(()=>v(_.value,s.value)),v=(t,e)=>{const o=(e.current-1)*e.pageSize,r=o+e.pageSize;return t.slice(o,r)},k=t=>{var e;return(e=i.value)==null?void 0:e.handleClick(t)},y=t=>{t!==0?(a.handleGetMenu({type:t}),s.value.current=1):a.handleGetMenu()};return x(n,()=>{a.loading=!1}),B(()=>{if(n.query&&n.query.type){k(~~n.query.type),g.replace({query:{}}),a.loading=!1;return}a.handleGetMenu(),a.loading=!1}),(t,e)=>{const o=I,r=w,b=M;return u(),f("section",N,[c(o,{title:"詳細菜單"}),d("div",W,[c(E,{ref_key:"tabRef",ref:i,"tab-data":C(L),onHandleTabClick:y},null,8,["tab-data"]),d("div",F,[d("div",P,[(u(!0),f(S,null,T(h.value,l=>(u(),R(r,{key:l.name,data:l},null,8,["data"]))),128))]),c(b,{modelValue:s.value,"onUpdate:modelValue":e[0]||(e[0]=l=>s.value=l),total:_.value.length},null,8,["modelValue","total"])])])])}}}),K=z(U,[["__scopeId","data-v-1908411e"]]);export{K as default};
