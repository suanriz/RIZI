import{d as h,u as N,c as v,q as B,p as f,o as C,a as i,y as $,b as t,e as u,t as l,z as r,j as k,_ as D,F as g,f as y,A as V,w,h as d,k as I,x as L,B as T,m as j}from"./index-Buvo8X10.js";import{_ as F}from"./ImgGroup-Btly8suA.js";const M={key:0,class:"contentWrap"},S={class:"productMain"},R={class:"productText","data-aos":"fade-left","data-aos-duration":"800","data-aos-easing":"ease-in-sine"},W={class:"price"},q={type:"circle"},z={class:"btnGroup"},A={class:"productDetails"},E={class:"productRecommend"},P={class:"shopWrap","data-aos":"fade-up","data-aos-duration":"700"},Q={class:"shopItem"},H={key:1,class:"noGood"},J=h({__name:"GoodView",setup(K){const c=B(),s=N(),b=v(()=>s.goodsList.filter(a=>a.id!==Number(c.params.id)).slice(0,4)),o=v(()=>s.goodsDetail);return f(c,a=>{s.handleGetGoods({id:Number(a.params.id)}),s.loading=!1}),f(o,a=>{const e=typeof a=="object"?a.name:"商品不存在";document.title=T(e)}),C(()=>{s.goodsList.length<2&&s.handleGetGoods(),s.handleGetGoods({id:Number(c.params.id)})}),(a,e)=>{var m;const G=F,p=D,x=L,_=V;return typeof o.value=="object"&&((m=o.value)!=null&&m.id)?(d(),i("section",M,[t("div",S,[u(G,{data:o.value},null,8,["data"]),t("div",R,[t("h3",null,l(o.value.name),1),t("div",W,[t("p",null,[e[2]||(e[2]=t("span",null,"NT$",-1)),r(l(o.value.price),1)])]),t("ul",q,[t("li",null," 主調風味 : "+l(o.value.detail.features.flavor),1),t("li",null," 風味描述 : "+l(o.value.detail.features.flavorDetail),1),t("li",null," 烘焙程度 : "+l(o.value.detail.features.roast),1),t("li",null,[r(" 酸度評鑑 : "+l(o.value.detail.features.acidity),1),e[3]||(e[3]=t("sup",{title:`酸度的感受因人而異，我們以五種水果來做最甜到最酸的評準\r
草莓果醬(1分)、葡萄(2分)、蘋果(3分)、橘子(4分)、檸檬(5分)\r
希望透過這樣的評分，讓咖啡豆有酸度的比較值，提供消費者在購買上參考`},"[註]",-1)),e[4]||(e[4]=r("(酸度由弱至強是1~5分) "))])]),t("div",z,[t("button",{type:"submit",onClick:e[0]||(e[0]=n=>k(s).$updateQuickcart("add",o.value))}," 加入購物車 "),t("button",{type:"submit",class:"buttonPrimary",onClick:e[1]||(e[1]=n=>k(s).$updateFavourites("add",o.value))}," 加入收藏清單 ")])])]),u(p,{title:"商品資訊"}),t("ul",A,[(d(!0),i(g,null,y(o.value.detail.info,n=>(d(),i("li",{key:n},l(n),1))),128))]),u(p,{title:"好評推薦"}),t("div",E,[t("div",P,[t("div",Q,[(d(!0),i(g,null,y(b.value,n=>(d(),I(x,{key:n.id,data:n},null,8,["data"]))),128))])])]),u(_,{link:"/store"})])):o.value==="商品不存在"?(d(),i("div",H,[e[6]||(e[6]=r(" 商品不存在 ")),u(_,{link:"/store","no-good-link":""},{default:w(()=>e[5]||(e[5]=[r(" 這裡有多種風味任您挑選 ")])),_:1})])):$("",!0)}}}),X=j(J,[["__scopeId","data-v-01346398"]]);export{X as default};
