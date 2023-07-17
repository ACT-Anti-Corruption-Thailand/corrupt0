"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[588],{76823:function(o,e,s){s.d(e,{Z:function(){return l}});var t=s(44503),n=s(49754),a=s(63255),r=s(88372),i=s.n(r);function l(o){var e=o.data,s=o.value,r=o.setValue,l=o.multiple,c=o.arrowSrc,h=o.className;return(0,t.jsx)(a.R,{value:s,onChange:r,multiple:null!=l&&l,children:(0,t.jsxs)("div",{className:(0,n.Z)("relative",null==h?void 0:h.root),children:[(0,t.jsxs)(a.R.Button,{className:(0,n.Z)("cursor-pointer flex justify-between items-center select-none",null==h?void 0:h.button),children:[(0,t.jsx)("span",{className:"truncate min-w-0",children:l?s.length?s.map(function(o){return"string"==typeof o?o:o.label}).join(", "):"(ไม่มี)":"string"==typeof s?s:s.label}),c&&(0,t.jsx)(i(),{className:"ui-open:rotate-180",src:c,width:8,height:8,alt:""})]}),(0,t.jsx)(a.R.Options,{className:(0,n.Z)("absolute z-10 min-w-full w-max select-none",null==h?void 0:h.listbox),children:e.map(function(o){return(0,t.jsxs)(a.R.Option,{className:(0,n.Z)("select-none cursor-pointer",l&&"flex items-center gap-5",!l&&"ui-selected:cursor-default",null==h?void 0:h.option),value:o,children:[l&&(0,t.jsx)("div",{className:(0,n.Z)("w-[15px] h-[15px] rounded-[2px] border flex items-center justify-center",s.some(function(e){return e===o})&&"bg-black"),"arid-hidden":"true",children:(0,t.jsx)(i(),{className:(0,n.Z)("w-10 h-8 transition-opacity duration-100 opacity-0",s.some(function(e){return e===o})&&"opacity-100"),src:"/icons/check-w.svg",width:10,height:8,alt:""})}),"string"==typeof o?o:o.label]},"string"==typeof o?o:o.data)})})]})})}},29685:function(o,e,s){s.d(e,{Z:function(){return r}});var t=s(44503),n=s(76823),a={button:"w-[110px] md:w-[165px] rounded-5 px-5 py-2 bg-white-10 border border-gray-6 text-white b4",listbox:"rounded-5 overflow-hidden translate-y-5",option:"px-5 py-2 bg-white border-b border-b-gray-5 last:border-b-0 text-black b4 ui-selected:bg-gray-2 ui-active:bg-gray-2"};function r(o){var e=o.data,s=o.value,r=o.setValue;return o.multiple?(0,t.jsx)(n.Z,{className:a,data:e,value:s,setValue:r,arrowSrc:"/icons/caret-w.svg",multiple:!0}):(0,t.jsx)(n.Z,{className:a,data:e,value:s,setValue:r,arrowSrc:"/icons/caret-w.svg"})}},8255:function(o,e,s){var t=s(98965),n=s(44503),a=s(88372),r=s.n(a),i=s(41519);e.Z=function(o){var e=(0,t._)((0,i.G4)(o.amount),2),s=e[0],a=e[1],l=Number(o.amount/o.maxAmount*100).toFixed(0).toString()+"%";return(0,n.jsxs)("div",{className:"flex flex-col bg-white bg-opacity-10 text-gray-4 rounded-5 py-10 px-5 lg:px-20 lg:py-20 my-10 text-18 w-full",children:[(0,n.jsxs)("div",{className:"flex gap-5 items-start",children:[(0,n.jsx)(r(),{src:o.imgPath,width:40,height:40,alt:"person",className:"h-[25px] w-[25px] lg:h-40 lg:w-40 rounded-full"}),(0,n.jsxs)("div",{className:"flex flex-col w-full",children:[(0,n.jsxs)("div",{className:"flex justify-between text-gray-2",children:[(0,n.jsx)("p",{className:"b3",children:o.name}),(0,n.jsx)("p",{className:"b4",children:s})]}),(0,n.jsxs)("div",{className:"flex justify-between text-right b6",children:[(0,n.jsx)("p",{children:o.title}),(0,n.jsx)("p",{children:a})]})]}),(0,n.jsx)(r(),{className:"-rotate-90 ml-4 h-10 w-12 lg:h-[23px] lg:w-[27px]",src:"/icons/arr-g.svg",width:12,height:10,alt:"arrow"})]}),(0,n.jsx)("div",{style:{"--bar":l,backgroundColor:o.color},className:"h-10 lg:h-20 w-[var(--bar)] mt-10"})]})}},32942:function(o,e,s){var t=s(44503);e.Z=function(o){return(0,t.jsx)("div",{style:{backgroundImage:"url(".concat(o.imgPath,")"),backgroundPosition:"center"},className:"my-16 py-10 px-20 rounded-10 relative bg-cover flex flex-col text-white justify-start lg:min-h-[260px] lg:w-full",children:o.children})}},62820:function(o,e,s){var t=s(98965),n=s(44503),a=s(85137),r=s(99347),i=s(31567),l=s(88372),c=s.n(l);e.Z=function(o){var e,s,l,h=(0,t._)(a.useState(""),2),g=h[0],d=h[1],m=""===g?o.data:o.data.filter(function(o){return(null!==(e=null==o?void 0:o.name)&&void 0!==e?e:"").toLowerCase().replace(/\s+/g,"").includes(g.toLowerCase().replace(/\s+/g,""))});return(0,n.jsx)(r.h,{value:o.selected,onChange:o.setSelected,children:(0,n.jsxs)("div",{className:"relative ",children:[(0,n.jsxs)("div",{className:"relative w-[80vw] lg:w-[40vw] my-10 cursor-default overflow-hidden rounded-lg text-left focus:outline-none",children:[(0,n.jsx)(r.h.Input,{placeholder:o.placeholder,className:"w-full border-none placeholder:text-gray-5 placeholder:b3 px-15 py-5 b3 text-black focus:bg-white bg-gray-4 rounded-full",displayValue:function(o){return null!==(s=null==o?void 0:o.name)&&void 0!==s?s:""},onChange:function(o){return d(o.target.value)}}),(0,n.jsx)(r.h.Button,{className:"absolute inset-y-0 right-15 flex items-center",children:(0,n.jsx)(c(),{className:"h-[19px]",src:"/icons/search-k.svg",alt:"search",width:19,height:19})})]}),(0,n.jsx)(i.u,{as:a.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",afterLeave:function(){return d("")},children:(0,n.jsx)(r.h.Options,{className:"absolute mt-10 max-h-[400px] w-full overflow-auto rounded-5 bg-white py-1 ring-opacity-5 focus:outline-none z-[999]",children:0===m.length&&""!==g?(0,n.jsx)("div",{className:"relative cursor-default select-none py-2 px-4 text-black",children:"Nothing found."}):m.map(function(o,e){return(0,n.jsx)(r.h.Option,{className:function(o){var e=o.active;return"relative cursor-default select-none py-2 pl-10 pr-4 ".concat(e?"bg-gray-1 text-black":"text-gray-900")},value:o,children:function(e){var s=e.selected;return e.active,(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("span",{className:"block truncate text-black border-b-1 border-gray-2 py-5 ".concat(s?"font-medium":"font-normal"),children:[(0,n.jsx)("div",{className:"text-24",children:null!==(l=null==o?void 0:o.name)&&void 0!==l?l:""}),(0,n.jsx)("div",{className:"b5 text-gray-4",children:o.title?o.title:""})]})})}},e)})})})]})})}},41519:function(o,e,s){s.d(e,{G4:function(){return n},JZ:function(){return a},cz:function(){return r},ed:function(){return t}});var t=function(o){return Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:2}).format(o)},n=function(o){return o<1e6?[o,"บาท"]:[Math.round(o/1e4)/100,"ล้านบาท"]},a=function(o,e){return o.toLocaleString("th-TH",{minimumFractionDigits:null!=e?e:0})},r=function(o){return Math.round(o/1e4)/100}},8951:function(o){o.exports=JSON.parse('{"สภาผู้แทนราษฎร":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/CbOkxecLAhr7myJps6.png"},"วุฒิสภา":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/48JaSVe38lyzq_lsBN.jpg"},"คณะรัฐมนตรี":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/rO_GHxP8kiKGNFUJvl.png"},"ครูไทยเพื่อประชาชน":{"color":"#025032","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/EYeQ37B_15pvPoy8Nb.png"},"ชาติไทยพัฒนา":{"color":"#FF5BD1","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/6HNZA4lhzjan4O2y75.png"},"ไทยศรีวิไลย์":{"color":"#3680C2","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/NDrjfqanCbA5_i7eX3.png"},"ไทรักธรรม":{"color":"#e43ba2","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ไทรักธรรม.jpg"},"ประชาชาติ":{"color":"#A56F05","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ประชาชาติ.jpg"},"ประชาธรรมไทย":{"color":"#D30009","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ประชาธรรมไทย.jpg"},"ประชาธิปไตยใหม่":{"color":"#F33937","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/1O4YwIwWcfJYX4Re3R.png"},"ประชาธิปัตย์":{"color":"#6DD3FF","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ประชาธิปัตย์.jpg"},"ประชานิยม":{"color":"#F21E29","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/46GUomKAi8cyNh18h_.png"},"ประชาภิวัฒน์":{"color":"#005847","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ประชาภิวัฒน์.jpg"},"เราทำได้":{"color":"#181D54","image":null},"รวมแผ่นดิน":{"color":"#005B35","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/R2INoYNUHzvabl15IM.png"},"พลังท้องถิ่นไท":{"color":"#008D43","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/Pandf75w6z2tIB6aeA.png"},"พลังธรรมใหม่":{"color":"#FFC164","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/พลังธรรมใหม่.jpg"},"พลังประชารัฐ":{"color":"#2276EF","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/Y8aiwU_p-C-aZyw_PN.png"},"พลังปวงชนไทย":{"color":"#5061DE","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/พลังปวงชนไทย.jpg"},"เพื่อชาติ":{"color":"#B1A6BF","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/s1gfssIWmSDrl1fi0U.png"},"เพื่อไทย":{"color":"#F41724","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/D7MJq6fghODrGEnj7t.png"},"ภูมิใจไทย":{"color":"#2C3487","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/G41yIdUsM1kvbntWDA.png"},"เศรษฐกิจใหม่":{"color":"#B096F9","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/เศรษฐกิจใหม่.jpg"},"เสรีรวมไทย":{"color":"#FFEA2E","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/เสรีรวมไทย.jpg"},"อนาคตใหม่":{"color":"#FF711E","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/อนาคตใหม่.jpg"},"ประชาชนปฏิรูป":{"color":"#019595","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ประชาชนปฏิรูป.jpg"},"ก้าวไกล":{"color":"#FF711E","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/C7giJlrNXUeQeEnMc7.png"},"เศรษฐกิจไทย":{"color":"#CA4F4F","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/fgG_n0AGBgcM_3mAxV.png"},"เพื่อชาติไทย":{"color":"#0D8080","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/เพื่อชาติไทย.jpg"},"ชาติพัฒนากล้า":{"color":"#FBB514","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/BCxo6X8Yn-o_sAL9ed.png"},"รักษ์ผืนป่าประเทศไทย":{"color":"#789947","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/รักษ์ผืนป่าประเทศไทย.jpg"},"รวมพลัง":{"color":"#581981","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ckQbj1avV1O1YwNF7j.png"},"รวมไทยสร้างชาติ":{"color":"#1445C3","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/71TBXfLKWiUR__KqSa.png"},"ไทยสร้างไทย":{"color":"#7856EC","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/GQkhI7bT0DS8MS-7BJ.png"},"ไทยภักดี":{"color":"#FFF177","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/VN7bjgg2xbg_de1Zit.png"},"ความหวังใหม่":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/EUYcU6pcnORdDmY93O.png"},"ประชากรไทย":{"color":"#065AFC","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ประชากรไทย.jpg"},"เครือข่ายชาวนาแห่งประเทศไทย":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/เครือข่ายชาวนาแห่งประเทศไทย.jpg"},"เพื่อแผ่นดิน":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/9YBGpOMCLkJANEMTGK.png"},"อนาคตไทย":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/อนาคตไทย.jpg"},"สังคมประชาธิปไตยไทย":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/สังคมประชาธิปไตยไทย.jpg"},"ประชาสามัคคี":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/qY9Z83pPYRu-RzPh0S.png"},"พลังบูรพา":{"color":"#CCD8DD","image":null},"พลังสหกรณ์":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/พลังสหกรณ์.jpg"},"ถิ่นกาขาวชาววิไล":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/GNoLmrkRz_WGWBJdzf.png"},"รักษ์ธรรม":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/kbN3IDoeu2PyJlvMt8.png"},"พลังประชาธิปไตย":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/egxYxlA4p-ZO8HWVpj.png"},"ภราดรภาพ":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ภราดรภาพ.jpg"},"พลังไทยรักชาติ":{"color":"#CCD8DD","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/พลังไทยรักชาติ.jpg"},"ช่วยชาติ":{"color":"#CCD8DD","image":null},"ทางเลือกใหม่":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/hCIS-BIWNOhntrKBDb.png"},"เส้นด้าย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/AjFo_jh4qSeryLcHQZ.png"},"สร้างอนาคตไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/iA7-3J84fhDUvHKJIu.png"},"ไทยธรรม":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/c6r738LpSdUOvTMBdk.png"},"พลังไทรุ่งเรือง":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/lBMfzC0RKK_AoOkSfN.png"},"ไทยพร้อม":{"color":null,"image":null},"เพื่อราษฎร":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/cVN5a8N01wB2tAe99J.png"},"แผ่นดินธรรม":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/OoI0HJt4KZM918_UkZ.png"},"คลองไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/LBrwqMSuSz2OE1Hzvu.png"},"พลังสังคม":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/-fIU_PuOaYPr6Q57JE.png"},"พลังศรัทธา":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/พลังศรัทธา.jpg"},"เป็นธรรม":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/MFsb7ep8_CGtzt6aYQ.png"},"พลังเพื่อไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/2BUgmHT5zu3JPf_ntI.png"},"ประชาไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ประชาไทย.jpg"},"กรีน":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/กรีน.jpg"},"สามัญชน":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/สามัญชน.jpg"},"ภาคีเครือข่ายไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/vL8-KPT6fVNXMhm1Ay.png"},"รวมไทยยูไนเต็ด":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/jR9d3ew0EAzbG3Lrrf.png"},"คนงานไทย":{"color":"#E43B6E","image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/qiormWyelM5hq6RGDn.png"},"สร้างชาติ":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/vexRFW-6cEOtejRH5n.png"},"เพื่ออนาคตไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/fpjORM14k6ksXVYNKu.png"},"เส้นทางใหม่":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/vvagRIKp1RILoAFYde.png"},"ไทยรวมไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/dNn3Romd1IWJFvnZ8l.png"},"กล้า":{"color":"#FBB514","image":null},"ยุทธศาสตร์ชาติ":{"color":null,"image":null},"พลังสังคมใหม่":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/iN-VMOD5Vay0JsdkWa.png"},"มิติใหม่":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/_7Ooh7ZG94FJ04TTML.png"},"ไทยสมาร์ท":{"color":null,"image":null},"เพื่อประชาชน":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/B2ra0a1N-9NT_AdaYa.png"},"พลังสยาม":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/ROAnzEQweAxfYTm-w7.png"},"แนวทางใหม่":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/LSxkDGIOs1u6vWW3_C.png"},"เสมอภาค":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/cq0hUVu-sM3QvvzlNS.png"},"ไทยชนะ":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/sfZR3zJyNAFw2EZMzJ.png"},"เพื่อไทรวมพลัง":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/6b7swIIukXdBPyOl7o.png"},"ไทยสร้างสรรค์":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/rOlfzU9noUw1mqfJBN.png"},"ราษฎร์วิถี":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/RfvlvAc--IJlvt7s7y.png"},"ไทยเป็นหนึ่ง":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/8OFcpcmhvedUFMuEL6.png"},"ท้องที่ไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/Xn3QrhZtUSXXpt9dyc.png"},"เปลี่ยนอนาคต":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/mgCscUGISgj4kOqRiJ.png"},"ใหม่":{"color":null,"image":null},"แรงงานสร้างชาติ":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/CD3gf0s-jFrVU2HJBI.png"},"ไทยก้าวหน้า":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/NCB78MIScad0PuuDX8.png"},"พลัง":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/5nO1yF2UytjGcFW1K8.png"},"สยามพล":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/toZSm8jIctJO48D_dC.png"},"ชาติรุ่งเรือง":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/Tjy86E0bFJxJfNVtN2.png"},"รวมใจไทย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/BIpx3bu7817_yZtp8k.png"},"สัมมาธิปไตย":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/P282VICkREzXTYb9dl.png"},"เปลี่ยน":{"color":null,"image":"https://sheets.wevis.info/download/noco/They-Work-For-Us/Parties/Images/TsATESu9Fpxmxo9Uvp.png"}}')}}]);