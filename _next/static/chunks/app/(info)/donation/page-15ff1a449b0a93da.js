(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[364],{90972:function(e,t,n){Promise.resolve().then(n.bind(n,72772))},72772:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var r=n(15337),a=n(98965),l=n(66187),i=n(44503),o=n(85137),s=n(32942),c=n(88372),u=n.n(c),d=n(8255),p=n(62820),x=n(41519),f=n(8951),m=function(e){var t,n,r=Number(e.amount/e.maxAmount*100).toFixed(0).toString()+"%";return(0,i.jsx)("div",{style:{"--progress":r,backgroundColor:null!==(n=null===(t=e.assets.find(function(t){return t.party===e.party}))||void 0===t?void 0:t.color)&&void 0!==n?n:"#fff"},className:"h-10 lg:h-20 w-[var(--progress)]"})},v=function(e){var t=(0,a._)((0,x.G4)(e.data.reduce(function(e,t){return e+t.amount},0)),2),n=t[0],r=t[1];return(0,i.jsxs)("div",{className:"flex flex-col bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 lg:px-20 lg:py-20 my-10 b6 w-full",children:[(0,i.jsxs)("div",{className:"flex gap-5 items-start",children:[(0,i.jsx)(u(),{src:e.imgPath,width:40,height:40,alt:"person",className:"h-[25px] lg:h-40"}),(0,i.jsxs)("div",{className:"flex flex-col w-full",children:[(0,i.jsxs)("div",{className:"flex justify-between text-gray-2",children:[(0,i.jsx)("p",{className:"b3",children:e.name}),(0,i.jsx)("p",{className:"b4",children:n})]}),(0,i.jsxs)("div",{className:"flex justify-between text-right b6",children:[(0,i.jsx)("p",{children:e.title}),(0,i.jsx)("p",{children:r})]})]}),(0,i.jsx)(u(),{className:"-rotate-90 ml-4 h-10 w-12 lg:h-[23px] lg:w-[27px]",src:"/icons/arr-g.svg",width:12,height:10,alt:"arrow"})]}),(0,i.jsx)("div",{className:"mt-10 flex",children:e.data.sort(function(e,t){return t.amount-e.amount}).sort(function(e,t){return e.party.localeCompare(t.party)}).map(function(t,n){return(0,i.jsx)(m,{party:t.party,amount:t.amount,maxAmount:e.maxAmount,assets:e.assets},n)})})]})},h=n(91523),g=n(29685),b=n(82),y=JSON.parse('{"2552":[{"total":166029027}],"2553":[{"total":84123110.97999999}],"2554":[{"total":1426064269}],"2555":[{"total":66720402.85000001}],"2556":[{"total":149989457.51999998}],"2557":[{"total":122481089.11999999}],"2558":[{"total":5165000}],"2559":[{"total":5443000}],"2560":[{"total":9250500}],"2561":[{"total":148410000}],"2562":[{"total":822519149.6400002}],"2563":[{"total":31456461.159999996}],"ทุกปี":[{"total":3037651467.269999}]}'),j=n(27657),w=n(63133),N=n.n(w),R=function(e){return e.replace(/บริษัท จำกัด \(มหาชน\)(.+)/g,"บริษัท $1 จำกัด (มหาชน)").replace(/บริษัท จำกัด(.+)/g,"บริษัท $1 จำกัด").replace("(มหาชน) จำกัด","จำกัด (มหาชน)").replace("หจก.","ห้างหุ้นส่วนจำกัด ").replace(/ห้างหุ้นส่วนจำกัด(.)/g,"ห้างหุ้นส่วนจำกัด $1")},S=function(e){return e.replace("ห้างหุ้นส่วนจำกัด","หจก").replace(/\s+|\/|\\/g,"-")},O=Object.keys(b).reverse(),T=["ทุกกลุ่มตำแหน่ง"].concat((0,l._)(new Set(j.map(function(e){return e.title}))));function k(){var e,t,n,l,c,x,m=(0,a._)(o.useState(10),2),w=m[0],k=m[1],L=(0,a._)(o.useState(10),2),I=L[0],C=L[1],D=(0,a._)(o.useState(null),2),P=D[0],E=D[1],Z=(0,a._)(o.useState(O[0]),2),F=Z[0],z=Z[1],M=(0,a._)(o.useState(null),2),A=M[0],_=M[1],V=(0,a._)(o.useState(O[0]),2),B=V[0],G=V[1],Q=(0,a._)(o.useState(T[0]),2),$=Q[0],U=Q[1],H=b[F].map(function(e,t){var n,r,a,l;return(null===(n=f[e.party])||void 0===n?void 0:n.color)&&(null===(r=f[e.party])||void 0===r?void 0:r.color)!="#CCD8DD"?{party:e.party,color:null===(a=f[e.party])||void 0===a?void 0:a.color,image:null===(l=f[e.party])||void 0===l?void 0:l.image}:null}).filter(function(e){return null!=e}).filter(function(e,t){return t<10});return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("section",{className:"flex flex-col items-center",children:[(0,i.jsx)(s.Z,{imgPath:"/images/asset_donation.png",className:"w-full",children:(0,i.jsxs)("div",{className:"flex flex-col justify-center my-auto py-30 lg:mx-[15vw] lg:p-[70px]",children:[(0,i.jsx)(u(),{className:"self-center mb-10 h-[45px] lg:h-100",src:"./icons/donate.svg",width:100,height:100,alt:"financial"}),(0,i.jsx)("p",{className:"font-black text-center h1",children:"ดูข้อมูลเงินบริจากพรรคการเมือง"})]})}),(0,i.jsxs)("p",{className:"text-gray-5 b3 lg:b6 mt-20",children:["อัปเดตข้อมูลเมื่อวันที่ ",new Date().toLocaleDateString("th")]}),(0,i.jsxs)("div",{className:"flex justify-center items-center gap-10 bg-gray-6 w-screen py-10 my-10 lg:py-15 lg:my-30 h3",children:[(0,i.jsx)(u(),{src:"./icons/borrow.svg",width:60,height:60,alt:"borrow",className:"h-30 w-30 lg:h-60 lg:w-60"}),"พรรคที่ได้รับเงินบริจาค"]}),(0,i.jsxs)("div",{className:"flex flex-row items-center gap-10 my-10 lg:my-30",children:[(0,i.jsx)("p",{className:"text-gray-4 b4 lg:b3",children:"ในปี"}),(0,i.jsx)(g.Z,{data:O,value:F,setValue:z}),(0,i.jsx)(h.Z,{name:"party-donation-sort"})]}),(0,i.jsx)(p.Z,{placeholder:"ค้นหาด้วยชื่อพรรคการเมือง",data:b[F].map(function(e){return(0,r._)({name:e.party},e)}),selected:P,setSelected:E}),(0,i.jsx)("div",{className:"flex flex-col items-center text-center b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]",children:P?(0,i.jsx)(N(),{href:"/info/พรรค"+P.name,className:"block no-underline w-full",children:(0,i.jsx)(d.Z,{name:P.name,title:"",color:null!==(n=null===(e=f[P.name])||void 0===e?void 0:e.color)&&void 0!==n?n:"#fff",amount:P.amount,maxAmount:y[F][0].total,imgPath:null!==(l=null===(t=f[P.name])||void 0===t?void 0:t.image)&&void 0!==l?l:"/icons/person.svg"})}):b[F].filter(function(e,t){return t<w}).map(function(e,t){var n,r;return(0,i.jsx)(N(),{href:"/info/พรรค"+e.party,className:"block no-underline w-full",children:(0,i.jsx)(d.Z,{name:e.party,title:"",color:null!==(c=null===(n=f[e.party])||void 0===n?void 0:n.color)&&void 0!==c?c:"#fff",amount:e.amount,maxAmount:y[F][0].total,imgPath:null!==(x=null===(r=f[e.party])||void 0===r?void 0:r.image)&&void 0!==x?x:"/icons/person.svg"})},e.party)})}),(0,i.jsx)("button",{className:"b4 text-gray-4 pb-20",onClick:function(){k(function(e){return e+10})},children:"+ ดูเพิ่มอีก 10 พรรค"}),(0,i.jsxs)("div",{className:"flex justify-center items-center gap-10 bg-gray-6 w-screen py-10 my-10 lg:py-15 lg:my-30 h3",children:[(0,i.jsx)(u(),{src:"./icons/donate.svg",width:60,height:60,alt:"borrow",className:"h-30 w-30 lg:h-60 lg:w-60"}),"ผู้บริจาคเงิน"]}),(0,i.jsx)("p",{className:"b6 text-gray-4",children:"หมายเหตุ: แสดงเฉพาะยอดบริจากที่เกิน 5,000 บาท"}),(0,i.jsxs)("div",{className:"flex flex-row items-center gap-10 my-10 lg:my-30",children:[(0,i.jsx)("p",{className:"text-gray-4 b4 lg:b3",children:"แสดง"}),(0,i.jsx)(g.Z,{data:T,value:$,setValue:U}),(0,i.jsx)("p",{className:"text-gray-4 b4 lg:b3",children:"ในปี"}),(0,i.jsx)(g.Z,{data:O,value:B,setValue:G}),(0,i.jsx)(h.Z,{name:"individual-donation-sort"})]}),(0,i.jsxs)("div",{className:"flex flex-col px-10 py-10 my-10 lg:my-30 border-1 rounded-5 border-gray-6 items-start w-[85vw] max-w-[800px]",children:[(0,i.jsx)("p",{className:"b4 text-gray-3",children:"สี = พรรค"}),(0,i.jsxs)("div",{className:"flex gap-10 flex-wrap",children:[H.map(function(e,t){return(0,i.jsxs)("div",{className:"flex justify-center items-center gap-5",children:[(0,i.jsx)("div",{style:{backgroundColor:e.color},className:"w-8 h-8"},t),(0,i.jsx)("p",{className:"text-gray-3 b4",children:e.party})]},t)}),(0,i.jsxs)("div",{className:"flex justify-center items-center gap-5",children:[(0,i.jsx)("div",{style:{backgroundColor:"#fff"},className:"w-8 h-8"}),(0,i.jsx)("p",{className:"text-gray-3 b4",children:"พรรคอื่น ๆ"})]})]})]}),(0,i.jsx)(p.Z,{placeholder:"ค้นหาด้วยชื่อบุคคล/นิติบุคคล",data:j,selected:A,setSelected:_}),(0,i.jsx)("div",{className:"flex flex-col items-center text-center b4 pb-10 lg:pb-30 w-[90vw] min-w-[300px] max-w-[850px]",children:A?(0,i.jsx)(N(),{href:"/info/"+("นิติบุคคล"===A.title?S(R(A.name)):S(A.name)),className:"block no-underline w-full",children:(0,i.jsx)(v,{name:A.name,title:A.title,data:A.donation,maxAmount:j[0].total,imgPath:"/icons/person.svg",assets:H})}):j.filter(function(e){return"ทุกกลุ่มตำแหน่ง"===$||e.title===$}).filter(function(e,t){return t<I}).map(function(e,t){return(0,i.jsx)(N(),{href:"/info/"+("นิติบุคคล"===e.title?S(R(e.name)):S(e.name)),className:"block no-underline w-full",children:(0,i.jsx)(v,{name:e.name,title:e.title,data:e.donation,maxAmount:j[0].total,imgPath:"/icons/person.svg",assets:H})},t)})}),(0,i.jsx)("button",{className:"b4 text-gray-4 pb-20",onClick:function(){C(function(e){return e+10})},children:"+ ดูเพิ่มเติมอีก 10 คน"})]})})}},76823:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(44503),a=n(49754),l=n(61614),i=n(88372),o=n.n(i);function s(e){var t=e.data,n=e.value,i=e.setValue,s=e.multiple,c=e.arrowSrc,u=e.className;return(0,r.jsx)(l.R,{value:n,onChange:i,multiple:null!=s&&s,children:(0,r.jsxs)("div",{className:(0,a.Z)("relative",null==u?void 0:u.root),children:[(0,r.jsxs)(l.R.Button,{className:(0,a.Z)("cursor-pointer flex justify-between items-center select-none",null==u?void 0:u.button),children:[(0,r.jsx)("span",{className:"truncate min-w-0",children:s?n.length?n.map(function(e){return"string"==typeof e?e:e.label}).join(", "):"(ไม่มี)":"string"==typeof n?n:n.label}),c&&(0,r.jsx)(o(),{className:"ui-open:rotate-180",src:c,width:8,height:8,alt:""})]}),(0,r.jsx)(l.R.Options,{className:(0,a.Z)("absolute z-10 min-w-full w-max select-none",null==u?void 0:u.listbox),children:t.map(function(e){return(0,r.jsxs)(l.R.Option,{className:(0,a.Z)("select-none cursor-pointer",s&&"flex items-center gap-5",!s&&"ui-selected:cursor-default",null==u?void 0:u.option),value:e,children:[s&&(0,r.jsx)("div",{className:(0,a.Z)("w-[15px] h-[15px] rounded-[2px] border flex items-center justify-center",n.some(function(t){return t===e})&&"bg-black"),"arid-hidden":"true",children:(0,r.jsx)(o(),{className:(0,a.Z)("w-10 h-8 transition-opacity duration-100 opacity-0",n.some(function(t){return t===e})&&"opacity-100"),src:"/icons/check-w.svg",width:10,height:8,alt:""})}),"string"==typeof e?e:e.label]},"string"==typeof e?e:e.data)})})]})})}},91523:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(44503),a=n(88372),l=n.n(a);function i(e){return(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsxs)("label",{children:[(0,r.jsx)("input",{name:e.name,className:"peer hidden",type:"radio",defaultChecked:!0}),(0,r.jsx)("div",{className:"border-1 lg:border-2 border-white border-opacity-50 peer-checked:border-opacity-100 peer-checked:opacity-100 opacity-50 w-[25px] h-[25px] lg:w-[40px] lg:h-[35px] rounded-l-5 flex justify-center items-center",children:(0,r.jsx)(l(),{src:"/icons/ascending.svg",width:20,height:15,alt:"ascending",className:"w-12 h-[9px] lg:w-20 lg:h-15"})})]}),(0,r.jsxs)("label",{children:[(0,r.jsx)("input",{name:e.name,className:"peer hidden",type:"radio"}),(0,r.jsx)("div",{className:"border-1 lg:border-2 border-white border-opacity-50 peer-checked:border-opacity-100 peer-checked:opacity-100 opacity-50 w-[25px] h-[25px] lg:w-[40px] lg:h-[35px] rounded-r-5 flex justify-center items-center",children:(0,r.jsx)(l(),{src:"/icons/descending.svg",width:20,height:15,alt:"descending",className:"w-12 h-[9px] lg:w-20 lg:h-15"})})]})]})}},29685:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(44503),a=n(76823),l={button:"w-[110px] md:w-[165px] rounded-5 px-5 py-2 bg-white-10 border border-gray-6 text-white b4",listbox:"rounded-5 overflow-hidden translate-y-5",option:"px-5 py-2 bg-white border-b border-b-gray-5 last:border-b-0 text-black b4 ui-selected:bg-gray-2 ui-active:bg-gray-2"};function i(e){var t=e.data,n=e.value,i=e.setValue;return e.multiple?(0,r.jsx)(a.Z,{className:l,data:t,value:n,setValue:i,arrowSrc:"/icons/caret-w.svg",multiple:!0}):(0,r.jsx)(a.Z,{className:l,data:t,value:n,setValue:i,arrowSrc:"/icons/caret-w.svg"})}},8255:function(e,t,n){"use strict";var r=n(98965),a=n(44503),l=n(88372),i=n.n(l),o=n(41519);t.Z=function(e){var t=(0,r._)((0,o.G4)(e.amount),2),n=t[0],l=t[1],s=Number(e.amount/e.maxAmount*100).toFixed(0).toString()+"%";return(0,a.jsxs)("div",{className:"flex flex-col bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 lg:px-20 lg:py-20 my-10 b6 w-full",children:[(0,a.jsxs)("div",{className:"flex gap-5 items-start",children:[(0,a.jsx)(i(),{src:e.imgPath,width:40,height:40,alt:"person",className:"h-[25px] w-[25px] lg:h-40 lg:w-40 rounded-full"}),(0,a.jsxs)("div",{className:"flex flex-col w-full",children:[(0,a.jsxs)("div",{className:"flex justify-between text-gray-2",children:[(0,a.jsx)("p",{className:"b3",children:e.name}),(0,a.jsx)("p",{className:"b4",children:(0,o.JZ)(n)})]}),(0,a.jsxs)("div",{className:"flex justify-between text-right b6",children:[(0,a.jsx)("p",{children:e.title}),(0,a.jsx)("p",{children:l})]})]}),(0,a.jsx)(i(),{className:"-rotate-90 ml-4 h-10 w-12 lg:h-[23px] lg:w-[27px]",src:"/icons/arr-g.svg",width:12,height:10,alt:"arrow"})]}),(0,a.jsx)("div",{style:{"--bar":s,backgroundColor:e.color},className:"h-10 lg:h-20 w-[var(--bar)] mt-10"})]})}},32942:function(e,t,n){"use strict";var r=n(44503),a=n(49754),l=n(63133),i=n.n(l);t.Z=function(e){return e.href?(0,r.jsx)(i(),{href:e.href,className:(0,a.Z)("flex flex-col py-10 px-20 rounded-10 bg-cover bg-center text-white text-left md:px-30 md:py-20 md:min-h-[260px]",e.className),style:{backgroundImage:"url(".concat(e.imgPath,")")},children:e.children}):(0,r.jsx)("div",{className:(0,a.Z)("flex flex-col py-10 px-20 rounded-10 bg-cover bg-center text-white text-left md:px-30 md:py-20 md:min-h-[260px]",e.className),style:{backgroundImage:"url(".concat(e.imgPath,")")},children:e.children})}},62820:function(e,t,n){"use strict";var r=n(98965),a=n(44503),l=n(85137),i=n(65480),o=n(88372),s=n.n(o),c=n(63133),u=n.n(c),d=n(49754),p=function(e){var t=e.person,n=e.children;return t.link?(0,a.jsx)(u(),{href:t.link,target:"_blank",children:n}):n};t.Z=function(e){var t,n,o=(0,r._)((0,l.useState)(""),2),c=o[0],u=o[1],x=(0,l.useMemo)(function(){return""===c?(e.setSelected(null),[]):e.data.filter(function(e){return e.name.includes(c)})},[e,c]);return(0,a.jsx)(i.h,{value:e.selected,onChange:e.setSelected,children:(0,a.jsxs)("div",{className:"relative ",children:[(0,a.jsxs)("div",{className:"relative w-[80vw] lg:w-[40vw] my-10 cursor-default overflow-hidden rounded-lg text-left focus:outline-none",children:[(0,a.jsx)(i.h.Input,{placeholder:e.placeholder,className:"w-full border-none placeholder:text-gray-5 placeholder:b3 px-15 py-5 b3 text-black focus:bg-white bg-gray-4 rounded-full",displayValue:function(e){return null!==(t=null==e?void 0:e.name)&&void 0!==t?t:""},onChange:function(e){var t;return u(null!==(n=null===(t=e.target.value)||void 0===t?void 0:t.trim())&&void 0!==n?n:"")}}),(0,a.jsx)(i.h.Button,{className:"absolute inset-y-0 right-15 flex items-center",children:(0,a.jsx)(s(),{className:"h-[19px]",src:"/icons/search-k.svg",alt:"search",width:19,height:19})})]}),(0,a.jsx)(i.h.Options,{className:"text-black absolute max-h-[400px] w-full overflow-auto rounded-5 bg-white py-1 ring-opacity-5 focus:outline-none z-[999] select-none",children:""===c?(0,a.jsx)("div",{className:"cursor-default py-5 px-10 b3",children:"กรุณากรอกคำค้นหา"}):0===x.length?(0,a.jsxs)("div",{className:"cursor-default py-5 px-10 b3",children:['ไม่พบชื่อ "',c,'"']}):(0,a.jsxs)(a.Fragment,{children:[x.slice(0,10).map(function(e){return(0,a.jsx)(i.h.Option,{className:function(e){var t=e.active;return(0,d.Z)("cursor-pointer select-none",t?"bg-gray-1":"text-gray-900")},value:e,children:(0,a.jsx)(p,{person:e,children:(0,a.jsxs)("div",{className:"border-b-1 border-gray-2 py-5 mx-10",children:[(0,a.jsx)("div",{className:"b3",dangerouslySetInnerHTML:{__html:e.name.replace(RegExp(c,"g"),function(e){return'<span class="font-bold">'.concat(e,"</span>")})}}),(0,a.jsx)("div",{className:"b5 text-gray-4",children:null==e?void 0:e.title})]})})},e.name)}),x.length>10&&(0,a.jsxs)("div",{className:"b3 py-5 px-10 cursor-default",children:["... อีก ",(x.length-10).toLocaleString("th-TH")," คน"]})]})})]})})}},41519:function(e,t,n){"use strict";n.d(t,{G4:function(){return a},JZ:function(){return l},cz:function(){return i},ed:function(){return r}});var r=function(e){return Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:2}).format(e)},a=function(e){return e<1e6?[e,"บาท"]:[Math.round(e/1e4)/100,"ล้านบาท"]},l=function(e,t){return e.toLocaleString("th-TH",{minimumFractionDigits:null!=t?t:0})},i=function(e){return Math.round(e/1e4)/100}},61614:function(e,t,n){"use strict";n.d(t,{R:function(){return Q}});var r,a,l,i,o=n(85137),s=n(84569),c=n(29551),u=n(7709),d=n(62596),p=n(99329),x=n(29675),f=n(30442),m=n(20876),v=n(48428),h=n(43883),g=n(47543),b=n(43137),y=n(17683),j=n(65592),w=n(7609),N=n(82627),R=n(95594),S=n(41101),O=n(76735),T=n(76522),k=n(96534),L=n(34184),I=n(98179),C=((r=C||{})[r.Open=0]="Open",r[r.Closed=1]="Closed",r),D=((a=D||{})[a.Single=0]="Single",a[a.Multi=1]="Multi",a),P=((l=P||{})[l.Pointer=0]="Pointer",l[l.Other=1]="Other",l),E=((i=E||{})[i.OpenListbox=0]="OpenListbox",i[i.CloseListbox=1]="CloseListbox",i[i.GoToOption=2]="GoToOption",i[i.Search=3]="Search",i[i.ClearSearch=4]="ClearSearch",i[i.RegisterOption=5]="RegisterOption",i[i.UnregisterOption=6]="UnregisterOption",i[i.RegisterLabel=7]="RegisterLabel",i);function Z(e,t=e=>e){let n=null!==e.activeOptionIndex?e.options[e.activeOptionIndex]:null,r=(0,b.z2)(t(e.options.slice()),e=>e.dataRef.current.domRef.current),a=n?r.indexOf(n):null;return -1===a&&(a=null),{options:r,activeOptionIndex:a}}let F={1:e=>e.dataRef.current.disabled||1===e.listboxState?e:{...e,activeOptionIndex:null,listboxState:1},0(e){if(e.dataRef.current.disabled||0===e.listboxState)return e;let t=e.activeOptionIndex,{isSelected:n}=e.dataRef.current,r=e.options.findIndex(e=>n(e.dataRef.current.value));return -1!==r&&(t=r),{...e,listboxState:0,activeOptionIndex:t}},2(e,t){var n;if(e.dataRef.current.disabled||1===e.listboxState)return e;let r=Z(e),a=(0,h.d)(t,{resolveItems:()=>r.options,resolveActiveIndex:()=>r.activeOptionIndex,resolveId:e=>e.id,resolveDisabled:e=>e.dataRef.current.disabled});return{...e,...r,searchQuery:"",activeOptionIndex:a,activationTrigger:null!=(n=t.trigger)?n:1}},3:(e,t)=>{if(e.dataRef.current.disabled||1===e.listboxState)return e;let n=""!==e.searchQuery?0:1,r=e.searchQuery+t.value.toLowerCase(),a=(null!==e.activeOptionIndex?e.options.slice(e.activeOptionIndex+n).concat(e.options.slice(0,e.activeOptionIndex+n)):e.options).find(e=>{var t;return!e.dataRef.current.disabled&&(null==(t=e.dataRef.current.textValue)?void 0:t.startsWith(r))}),l=a?e.options.indexOf(a):-1;return -1===l||l===e.activeOptionIndex?{...e,searchQuery:r}:{...e,searchQuery:r,activeOptionIndex:l,activationTrigger:1}},4:e=>e.dataRef.current.disabled||1===e.listboxState||""===e.searchQuery?e:{...e,searchQuery:""},5:(e,t)=>{let n={id:t.id,dataRef:t.dataRef},r=Z(e,e=>[...e,n]);return null===e.activeOptionIndex&&e.dataRef.current.isSelected(t.dataRef.current.value)&&(r.activeOptionIndex=r.options.indexOf(n)),{...e,...r}},6:(e,t)=>{let n=Z(e,e=>{let n=e.findIndex(e=>e.id===t.id);return -1!==n&&e.splice(n,1),e});return{...e,...n,activationTrigger:1}},7:(e,t)=>({...e,labelId:t.id})},z=(0,o.createContext)(null);function M(e){let t=(0,o.useContext)(z);if(null===t){let t=Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,M),t}return t}z.displayName="ListboxActionsContext";let A=(0,o.createContext)(null);function _(e){let t=(0,o.useContext)(A);if(null===t){let t=Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,_),t}return t}function V(e,t){return(0,f.E)(t.type,F,e,t)}A.displayName="ListboxDataContext";let B=o.Fragment,G=x.AN.RenderStrategy|x.AN.Static,Q=Object.assign((0,x.yV)(function(e,t){let{value:n,defaultValue:r,form:a,name:l,onChange:i,by:c=(e,t)=>e===t,disabled:d=!1,horizontal:m=!1,multiple:v=!1,...g}=e,j=m?"horizontal":"vertical",S=(0,p.T)(t),[k=v?[]:void 0,L]=(0,T.q)(n,i,r),[I,C]=(0,o.useReducer)(V,{dataRef:(0,o.createRef)(),listboxState:1,options:[],searchQuery:"",labelId:null,activeOptionIndex:null,activationTrigger:1}),D=(0,o.useRef)({static:!1,hold:!1}),P=(0,o.useRef)(null),E=(0,o.useRef)(null),Z=(0,o.useRef)(null),F=(0,O.z)("string"==typeof c?(e,t)=>(null==e?void 0:e[c])===(null==t?void 0:t[c]):c),M=(0,o.useCallback)(e=>(0,f.E)(_.mode,{1:()=>k.some(t=>F(t,e)),0:()=>F(k,e)}),[k]),_=(0,o.useMemo)(()=>({...I,value:k,disabled:d,mode:v?1:0,orientation:j,compare:F,isSelected:M,optionsPropsRef:D,labelRef:P,buttonRef:E,optionsRef:Z}),[k,d,v,I]);(0,u.e)(()=>{I.dataRef.current=_},[_]),(0,w.O)([_.buttonRef,_.optionsRef],(e,t)=>{var n;C({type:1}),(0,b.sP)(t,b.tJ.Loose)||(e.preventDefault(),null==(n=_.buttonRef.current)||n.focus())},0===_.listboxState);let G=(0,o.useMemo)(()=>({open:0===_.listboxState,disabled:d,value:k}),[_,d,k]),Q=(0,O.z)(e=>{let t=_.options.find(t=>t.id===e);t&&K(t.dataRef.current.value)}),$=(0,O.z)(()=>{if(null!==_.activeOptionIndex){let{dataRef:e,id:t}=_.options[_.activeOptionIndex];K(e.current.value),C({type:2,focus:h.T.Specific,id:t})}}),U=(0,O.z)(()=>C({type:0})),H=(0,O.z)(()=>C({type:1})),J=(0,O.z)((e,t,n)=>e===h.T.Specific?C({type:2,focus:h.T.Specific,id:t,trigger:n}):C({type:2,focus:e,trigger:n})),Y=(0,O.z)((e,t)=>(C({type:5,id:e,dataRef:t}),()=>C({type:6,id:e}))),q=(0,O.z)(e=>(C({type:7,id:e}),()=>C({type:7,id:null}))),K=(0,O.z)(e=>(0,f.E)(_.mode,{0:()=>null==L?void 0:L(e),1(){let t=_.value.slice(),n=t.findIndex(t=>F(t,e));return -1===n?t.push(e):t.splice(n,1),null==L?void 0:L(t)}})),W=(0,O.z)(e=>C({type:3,value:e})),X=(0,O.z)(()=>C({type:4})),ee=(0,o.useMemo)(()=>({onChange:K,registerOption:Y,registerLabel:q,goToOption:J,closeListbox:H,openListbox:U,selectActiveOption:$,selectOption:Q,search:W,clearSearch:X}),[]),et=(0,o.useRef)(null),en=(0,s.G)();return(0,o.useEffect)(()=>{et.current&&void 0!==r&&en.addEventListener(et.current,"reset",()=>{K(r)})},[et,K]),o.createElement(z.Provider,{value:ee},o.createElement(A.Provider,{value:_},o.createElement(y.up,{value:(0,f.E)(_.listboxState,{0:y.ZM.Open,1:y.ZM.Closed})},null!=l&&null!=k&&(0,R.t)({[l]:k}).map(([e,t],n)=>o.createElement(N._,{features:N.A.Hidden,ref:0===n?e=>{var t;et.current=null!=(t=null==e?void 0:e.closest("form"))?t:null}:void 0,...(0,x.oA)({key:e,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:a,name:e,value:t})})),(0,x.sY)({ourProps:{ref:S},theirProps:g,slot:G,defaultTag:B,name:"Listbox"}))))}),{Button:(0,x.yV)(function(e,t){var n;let r=(0,c.M)(),{id:a=`headlessui-listbox-button-${r}`,...l}=e,i=_("Listbox.Button"),u=M("Listbox.Button"),f=(0,p.T)(i.buttonRef,t),m=(0,s.G)(),b=(0,O.z)(e=>{switch(e.key){case v.R.Space:case v.R.Enter:case v.R.ArrowDown:e.preventDefault(),u.openListbox(),m.nextFrame(()=>{i.value||u.goToOption(h.T.First)});break;case v.R.ArrowUp:e.preventDefault(),u.openListbox(),m.nextFrame(()=>{i.value||u.goToOption(h.T.Last)})}}),y=(0,O.z)(e=>{e.key===v.R.Space&&e.preventDefault()}),w=(0,O.z)(e=>{if((0,g.P)(e.currentTarget))return e.preventDefault();0===i.listboxState?(u.closeListbox(),m.nextFrame(()=>{var e;return null==(e=i.buttonRef.current)?void 0:e.focus({preventScroll:!0})})):(e.preventDefault(),u.openListbox())}),N=(0,d.v)(()=>{if(i.labelId)return[i.labelId,a].join(" ")},[i.labelId,a]),R=(0,o.useMemo)(()=>({open:0===i.listboxState,disabled:i.disabled,value:i.value}),[i]),S={ref:f,id:a,type:(0,j.f)(e,i.buttonRef),"aria-haspopup":"listbox","aria-controls":null==(n=i.optionsRef.current)?void 0:n.id,"aria-expanded":i.disabled?void 0:0===i.listboxState,"aria-labelledby":N,disabled:i.disabled,onKeyDown:b,onKeyUp:y,onClick:w};return(0,x.sY)({ourProps:S,theirProps:l,slot:R,defaultTag:"button",name:"Listbox.Button"})}),Label:(0,x.yV)(function(e,t){let n=(0,c.M)(),{id:r=`headlessui-listbox-label-${n}`,...a}=e,l=_("Listbox.Label"),i=M("Listbox.Label"),s=(0,p.T)(l.labelRef,t);(0,u.e)(()=>i.registerLabel(r),[r]);let d=(0,O.z)(()=>{var e;return null==(e=l.buttonRef.current)?void 0:e.focus({preventScroll:!0})}),f=(0,o.useMemo)(()=>({open:0===l.listboxState,disabled:l.disabled}),[l]);return(0,x.sY)({ourProps:{ref:s,id:r,onClick:d},theirProps:a,slot:f,defaultTag:"label",name:"Listbox.Label"})}),Options:(0,x.yV)(function(e,t){var n;let r=(0,c.M)(),{id:a=`headlessui-listbox-options-${r}`,...l}=e,i=_("Listbox.Options"),u=M("Listbox.Options"),g=(0,p.T)(i.optionsRef,t),b=(0,s.G)(),j=(0,s.G)(),w=(0,y.oJ)(),N=null!==w?(w&y.ZM.Open)===y.ZM.Open:0===i.listboxState;(0,o.useEffect)(()=>{var e;let t=i.optionsRef.current;t&&0===i.listboxState&&t!==(null==(e=(0,S.r)(t))?void 0:e.activeElement)&&t.focus({preventScroll:!0})},[i.listboxState,i.optionsRef]);let R=(0,O.z)(e=>{switch(j.dispose(),e.key){case v.R.Space:if(""!==i.searchQuery)return e.preventDefault(),e.stopPropagation(),u.search(e.key);case v.R.Enter:if(e.preventDefault(),e.stopPropagation(),null!==i.activeOptionIndex){let{dataRef:e}=i.options[i.activeOptionIndex];u.onChange(e.current.value)}0===i.mode&&(u.closeListbox(),(0,m.k)().nextFrame(()=>{var e;return null==(e=i.buttonRef.current)?void 0:e.focus({preventScroll:!0})}));break;case(0,f.E)(i.orientation,{vertical:v.R.ArrowDown,horizontal:v.R.ArrowRight}):return e.preventDefault(),e.stopPropagation(),u.goToOption(h.T.Next);case(0,f.E)(i.orientation,{vertical:v.R.ArrowUp,horizontal:v.R.ArrowLeft}):return e.preventDefault(),e.stopPropagation(),u.goToOption(h.T.Previous);case v.R.Home:case v.R.PageUp:return e.preventDefault(),e.stopPropagation(),u.goToOption(h.T.First);case v.R.End:case v.R.PageDown:return e.preventDefault(),e.stopPropagation(),u.goToOption(h.T.Last);case v.R.Escape:return e.preventDefault(),e.stopPropagation(),u.closeListbox(),b.nextFrame(()=>{var e;return null==(e=i.buttonRef.current)?void 0:e.focus({preventScroll:!0})});case v.R.Tab:e.preventDefault(),e.stopPropagation();break;default:1===e.key.length&&(u.search(e.key),j.setTimeout(()=>u.clearSearch(),350))}}),T=(0,d.v)(()=>{var e,t,n;return null!=(n=null==(e=i.labelRef.current)?void 0:e.id)?n:null==(t=i.buttonRef.current)?void 0:t.id},[i.labelRef.current,i.buttonRef.current]),k=(0,o.useMemo)(()=>({open:0===i.listboxState}),[i]),L={"aria-activedescendant":null===i.activeOptionIndex||null==(n=i.options[i.activeOptionIndex])?void 0:n.id,"aria-multiselectable":1===i.mode||void 0,"aria-labelledby":T,"aria-orientation":i.orientation,id:a,onKeyDown:R,role:"listbox",tabIndex:0,ref:g};return(0,x.sY)({ourProps:L,theirProps:l,slot:k,defaultTag:"ul",features:G,visible:N,name:"Listbox.Options"})}),Option:(0,x.yV)(function(e,t){let n=(0,c.M)(),{id:r=`headlessui-listbox-option-${n}`,disabled:a=!1,value:l,...i}=e,s=_("Listbox.Option"),d=M("Listbox.Option"),f=null!==s.activeOptionIndex&&s.options[s.activeOptionIndex].id===r,v=s.isSelected(l),g=(0,o.useRef)(null),b=(0,I.x)(g),y=(0,k.E)({disabled:a,value:l,domRef:g,get textValue(){return b()}}),j=(0,p.T)(t,g);(0,u.e)(()=>{if(0!==s.listboxState||!f||0===s.activationTrigger)return;let e=(0,m.k)();return e.requestAnimationFrame(()=>{var e,t;null==(t=null==(e=g.current)?void 0:e.scrollIntoView)||t.call(e,{block:"nearest"})}),e.dispose},[g,f,s.listboxState,s.activationTrigger,s.activeOptionIndex]),(0,u.e)(()=>d.registerOption(r,y),[y,r]);let w=(0,O.z)(e=>{if(a)return e.preventDefault();d.onChange(l),0===s.mode&&(d.closeListbox(),(0,m.k)().nextFrame(()=>{var e;return null==(e=s.buttonRef.current)?void 0:e.focus({preventScroll:!0})}))}),N=(0,O.z)(()=>{if(a)return d.goToOption(h.T.Nothing);d.goToOption(h.T.Specific,r)}),R=(0,L.g)(),S=(0,O.z)(e=>R.update(e)),T=(0,O.z)(e=>{R.wasMoved(e)&&(a||f||d.goToOption(h.T.Specific,r,0))}),C=(0,O.z)(e=>{R.wasMoved(e)&&(a||f&&d.goToOption(h.T.Nothing))}),D=(0,o.useMemo)(()=>({active:f,selected:v,disabled:a}),[f,v,a]);return(0,x.sY)({ourProps:{id:r,ref:j,role:"option",tabIndex:!0===a?void 0:-1,"aria-disabled":!0===a||void 0,"aria-selected":v,disabled:void 0,onClick:w,onFocus:N,onPointerEnter:S,onMouseEnter:S,onPointerMove:T,onMouseMove:T,onPointerLeave:C,onMouseLeave:C},theirProps:i,slot:D,defaultTag:"li",name:"Listbox.Option"})})})},98179:function(e,t,n){"use strict";n.d(t,{x:function(){return o}});var r=n(85137);let a=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function l(e){var t,n;let r=null!=(t=e.innerText)?t:"",l=e.cloneNode(!0);if(!(l instanceof HTMLElement))return r;let i=!1;for(let e of l.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))e.remove(),i=!0;let o=i?null!=(n=l.innerText)?n:"":r;return a.test(o)&&(o=o.replace(a,"")),o}var i=n(76735);function o(e){let t=(0,r.useRef)(""),n=(0,r.useRef)("");return(0,i.z)(()=>{let r=e.current;if(!r)return"";let a=r.innerText;if(t.current===a)return n.current;let i=(function(e){let t=e.getAttribute("aria-label");if("string"==typeof t)return t.trim();let n=e.getAttribute("aria-labelledby");if(n){let e=n.split(" ").map(e=>{let t=document.getElementById(e);if(t){let e=t.getAttribute("aria-label");return"string"==typeof e?e.trim():l(t).trim()}return null}).filter(Boolean);if(e.length>0)return e.join(", ")}return l(e).trim()})(r).trim().toLowerCase();return t.current=a,n.current=i,i})}}},function(e){e.O(0,[62,329,518,681,929,215,744],function(){return e(e.s=90972)}),_N_E=e.O()}]);