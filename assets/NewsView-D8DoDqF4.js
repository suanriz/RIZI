import{d as W,u as I,c as p,r as m,o as B,a as r,b as a,e as c,_ as E,w as M,F as v,f,g as O,h as P,i as l,j as g,N as U,k as F,l as G,t as w,m as L}from"./index-r9ni__vS.js";import{_ as $}from"./Pagination-cRPZffJL.js";import{T as j,_ as A}from"./index-DIyOepCy.js";import"./index-D4hIcz5I.js";const K={class:"contentWrap"},Y={class:"filterWrap"},q={class:"newsWrap"},H=["onClick"],J={class:"newsImgWrap"},Q=["alt"],R={class:"newsTxtWrap"},X=W({__name:"NewsView",setup(Z){const b="https://suanriz.github.io/rizi/",s=I(),u=p(()=>s.news),_=m({current:1,pageSize:4}),k=p(()=>y(u.value,_.value)),V=p(()=>s.newsParams),h=m(0),o=m({isOpen:!1,list:[],data:{id:0,title:"",introduction:"",link:"",img:"",type:0}}),y=(n,t)=>{const i=(t.current-1)*t.pageSize,d=i+t.pageSize;return n.slice(i,d)},N=n=>{const t={...V.value,type:n};s.handleGetNews(t)},z=n=>{o.value.isOpen=!0,o.value.list=u.value,o.value.data=n};return B(()=>{s.handleGetNews()}),(n,t)=>{const i=E,d=A,D=j,x=$,S=O,T=P("lazy");return l(),r(v,null,[a("section",K,[c(i,{title:"最新消息"}),a("div",Y,[c(D,{"active-key":h.value,"onUpdate:activeKey":t[0]||(t[0]=e=>h.value=e),onChange:N},{default:M(()=>[(l(!0),r(v,null,f(g(U),e=>(l(),F(d,{key:e.value,tab:e.label,"show-size-changer":""},null,8,["tab"]))),128))]),_:1},8,["active-key"])]),a("div",q,[(l(!0),r(v,null,f(k.value,e=>(l(),r("div",{key:e.title,class:"news",onClick:C=>z(e)},[a("div",J,[G(a("img",{alt:e.title,onLoad:t[1]||(t[1]=C=>g(s).loading=!1)},null,40,Q),[[T,g(b)+e.img]])]),a("div",R,[a("h3",null,w(e.title),1),a("p",null,w(e.introduction),1)])],8,H))),128))]),c(x,{modelValue:_.value,"onUpdate:modelValue":t[2]||(t[2]=e=>_.value=e),total:u.value.length},null,8,["modelValue","total"])]),c(S,{modelValue:o.value,"onUpdate:modelValue":t[3]||(t[3]=e=>o.value=e)},null,8,["modelValue"])],64)}}}),se=L(X,[["__scopeId","data-v-aca1eb65"]]);export{se as default};
