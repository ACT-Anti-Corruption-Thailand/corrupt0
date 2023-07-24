(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[328],{49754:function(e,t,n){"use strict";t.Z=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=function e(t){var n,r,o="";if("string"==typeof t||"number"==typeof t)o+=t;else if("object"==typeof t){if(Array.isArray(t))for(n=0;n<t.length;n++)t[n]&&(r=e(t[n]))&&(o&&(o+=" "),o+=r);else for(n in t)t[n]&&(o&&(o+=" "),o+=n)}return o}(e))&&(r&&(r+=" "),r+=t);return r}},42600:function(e,t,n){Promise.resolve().then(n.t.bind(n,72154,23)),Promise.resolve().then(n.bind(n,84204))},84204:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var r=n(44503),o=n(49754),u=n(33883);function l(e){var t=e.trigger,n=e.children,l=e.className,i=e.open;return(0,r.jsx)("div",{className:l,children:(0,r.jsx)(u.p,{defaultOpen:void 0!==i&&i,children:function(e){var l=e.open;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.p.Button,{className:"w-full",children:t}),(0,r.jsx)(u.p.Panel,{static:!0,className:(0,o.Z)("grid will-change-[grid-template-rows] transition-all overflow-hidden grid-rows-[0fr]",l&&"grid-rows-[1fr]"),"aria-hidden":!l,children:(0,r.jsx)("div",{className:(0,o.Z)("min-h-0 transition-all",!l&&"!m-0"),children:n})})]})}})})}},33883:function(e,t,n){"use strict";n.d(t,{p:function(){return I}});var r,o,u,l=n(85137),i=n(30442),s=n(29675),a=n(99329),c=n(29551),f=n(48428),d=n(47543),p=n(17683),m=n(65592),h=n(41101),g=n(76735);let v=null!=(u=l.startTransition)?u:function(e){e()};var y=((r=y||{})[r.Open=0]="Open",r[r.Closed=1]="Closed",r),b=((o=b||{})[o.ToggleDisclosure=0]="ToggleDisclosure",o[o.CloseDisclosure=1]="CloseDisclosure",o[o.SetButtonId=2]="SetButtonId",o[o.SetPanelId=3]="SetPanelId",o[o.LinkPanel=4]="LinkPanel",o[o.UnlinkPanel=5]="UnlinkPanel",o);let E={0:e=>({...e,disclosureState:(0,i.E)(e.disclosureState,{0:1,1:0})}),1:e=>1===e.disclosureState?e:{...e,disclosureState:1},4:e=>!0===e.linkedPanel?e:{...e,linkedPanel:!0},5:e=>!1===e.linkedPanel?e:{...e,linkedPanel:!1},2:(e,t)=>e.buttonId===t.buttonId?e:{...e,buttonId:t.buttonId},3:(e,t)=>e.panelId===t.panelId?e:{...e,panelId:t.panelId}},S=(0,l.createContext)(null);function P(e){let t=(0,l.useContext)(S);if(null===t){let t=Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,P),t}return t}S.displayName="DisclosureContext";let w=(0,l.createContext)(null);w.displayName="DisclosureAPIContext";let O=(0,l.createContext)(null);function N(e,t){return(0,i.E)(t.type,E,e,t)}O.displayName="DisclosurePanelContext";let k=l.Fragment,C=s.AN.RenderStrategy|s.AN.Static,I=Object.assign((0,s.yV)(function(e,t){let{defaultOpen:n=!1,...r}=e,o=(0,l.useRef)(null),u=(0,a.T)(t,(0,a.h)(e=>{o.current=e},void 0===e.as||e.as===l.Fragment)),c=(0,l.useRef)(null),f=(0,l.useRef)(null),d=(0,l.useReducer)(N,{disclosureState:n?0:1,linkedPanel:!1,buttonRef:f,panelRef:c,buttonId:null,panelId:null}),[{disclosureState:m,buttonId:v},y]=d,b=(0,g.z)(e=>{y({type:1});let t=(0,h.r)(o);if(!t||!v)return;let n=e?e instanceof HTMLElement?e:e.current instanceof HTMLElement?e.current:t.getElementById(v):t.getElementById(v);null==n||n.focus()}),E=(0,l.useMemo)(()=>({close:b}),[b]),P=(0,l.useMemo)(()=>({open:0===m,close:b}),[m,b]);return l.createElement(S.Provider,{value:d},l.createElement(w.Provider,{value:E},l.createElement(p.up,{value:(0,i.E)(m,{0:p.ZM.Open,1:p.ZM.Closed})},(0,s.sY)({ourProps:{ref:u},theirProps:r,slot:P,defaultTag:k,name:"Disclosure"}))))}),{Button:(0,s.yV)(function(e,t){let n=(0,c.M)(),{id:r=`headlessui-disclosure-button-${n}`,...o}=e,[u,i]=P("Disclosure.Button"),p=(0,l.useContext)(O),h=null!==p&&p===u.panelId,v=(0,l.useRef)(null),y=(0,a.T)(v,t,h?null:u.buttonRef);(0,l.useEffect)(()=>{if(!h)return i({type:2,buttonId:r}),()=>{i({type:2,buttonId:null})}},[r,i,h]);let b=(0,g.z)(e=>{var t;if(h){if(1===u.disclosureState)return;switch(e.key){case f.R.Space:case f.R.Enter:e.preventDefault(),e.stopPropagation(),i({type:0}),null==(t=u.buttonRef.current)||t.focus()}}else switch(e.key){case f.R.Space:case f.R.Enter:e.preventDefault(),e.stopPropagation(),i({type:0})}}),E=(0,g.z)(e=>{e.key===f.R.Space&&e.preventDefault()}),S=(0,g.z)(t=>{var n;(0,d.P)(t.currentTarget)||e.disabled||(h?(i({type:0}),null==(n=u.buttonRef.current)||n.focus()):i({type:0}))}),w=(0,l.useMemo)(()=>({open:0===u.disclosureState}),[u]),N=(0,m.f)(e,v),k=h?{ref:y,type:N,onKeyDown:b,onClick:S}:{ref:y,id:r,type:N,"aria-expanded":e.disabled?void 0:0===u.disclosureState,"aria-controls":u.linkedPanel?u.panelId:void 0,onKeyDown:b,onKeyUp:E,onClick:S};return(0,s.sY)({ourProps:k,theirProps:o,slot:w,defaultTag:"button",name:"Disclosure.Button"})}),Panel:(0,s.yV)(function(e,t){let n=(0,c.M)(),{id:r=`headlessui-disclosure-panel-${n}`,...o}=e,[u,i]=P("Disclosure.Panel"),{close:f}=function e(t){let n=(0,l.useContext)(w);if(null===n){let n=Error(`<${t} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,e),n}return n}("Disclosure.Panel"),d=(0,a.T)(t,u.panelRef,e=>{v(()=>i({type:e?4:5}))});(0,l.useEffect)(()=>(i({type:3,panelId:r}),()=>{i({type:3,panelId:null})}),[r,i]);let m=(0,p.oJ)(),h=null!==m?(m&p.ZM.Open)===p.ZM.Open:0===u.disclosureState,g=(0,l.useMemo)(()=>({open:0===u.disclosureState,close:f}),[u,f]);return l.createElement(O.Provider,{value:u.panelId},(0,s.sY)({ourProps:{ref:d,id:r},theirProps:o,slot:g,defaultTag:"div",features:C,visible:h,name:"Disclosure.Panel"}))})})},48428:function(e,t,n){"use strict";n.d(t,{R:function(){return o}});var r,o=((r=o||{}).Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r)},76735:function(e,t,n){"use strict";n.d(t,{z:function(){return u}});var r=n(85137),o=n(96534);let u=function(e){let t=(0,o.E)(e);return r.useCallback((...e)=>t.current(...e),[t])}},29551:function(e,t,n){"use strict";n.d(t,{M:function(){return s}});var r,o=n(85137),u=n(7709),l=n(96173),i=n(85291);let s=null!=(r=o.useId)?r:function(){let e=(0,l.H)(),[t,n]=o.useState(e?()=>i.O.nextId():null);return(0,u.e)(()=>{null===t&&n(i.O.nextId())},[t]),null!=t?""+t:void 0}},7709:function(e,t,n){"use strict";n.d(t,{e:function(){return u}});var r=n(85137),o=n(85291);let u=(e,t)=>{o.O.isServer?(0,r.useEffect)(e,t):(0,r.useLayoutEffect)(e,t)}},96534:function(e,t,n){"use strict";n.d(t,{E:function(){return u}});var r=n(85137),o=n(7709);function u(e){let t=(0,r.useRef)(e);return(0,o.e)(()=>{t.current=e},[e]),t}},65592:function(e,t,n){"use strict";n.d(t,{f:function(){return l}});var r=n(85137),o=n(7709);function u(e){var t;if(e.type)return e.type;let n=null!=(t=e.as)?t:"button";if("string"==typeof n&&"button"===n.toLowerCase())return"button"}function l(e,t){let[n,l]=(0,r.useState)(()=>u(e));return(0,o.e)(()=>{l(u(e))},[e.type,e.as]),(0,o.e)(()=>{n||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&l("button")},[n,t]),n}},96173:function(e,t,n){"use strict";n.d(t,{H:function(){return u}});var r=n(85137),o=n(85291);function u(){let[e,t]=(0,r.useState)(o.O.isHandoffComplete);return e&&!1===o.O.isHandoffComplete&&t(!1),(0,r.useEffect)(()=>{!0!==e&&t(!0)},[e]),(0,r.useEffect)(()=>o.O.handoff(),[]),e}},99329:function(e,t,n){"use strict";n.d(t,{T:function(){return i},h:function(){return l}});var r=n(85137),o=n(76735);let u=Symbol();function l(e,t=!0){return Object.assign(e,{[u]:t})}function i(...e){let t=(0,r.useRef)(e);(0,r.useEffect)(()=>{t.current=e},[e]);let n=(0,o.z)(e=>{for(let n of t.current)null!=n&&("function"==typeof n?n(e):n.current=e)});return e.every(e=>null==e||(null==e?void 0:e[u]))?void 0:n}},17683:function(e,t,n){"use strict";n.d(t,{ZM:function(){return l},oJ:function(){return i},up:function(){return s}});var r,o=n(85137);let u=(0,o.createContext)(null);u.displayName="OpenClosedContext";var l=((r=l||{})[r.Open=1]="Open",r[r.Closed=2]="Closed",r[r.Closing=4]="Closing",r[r.Opening=8]="Opening",r);function i(){return(0,o.useContext)(u)}function s({value:e,children:t}){return o.createElement(u.Provider,{value:e},t)}},47543:function(e,t,n){"use strict";function r(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(null==t?void 0:t.getAttribute("disabled"))==="";return!(r&&function(e){if(!e)return!1;let t=e.previousElementSibling;for(;null!==t;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}(n))&&r}n.d(t,{P:function(){return r}})},33431:function(e,t,n){"use strict";function r(...e){return e.filter(Boolean).join(" ")}n.d(t,{A:function(){return r}})},85291:function(e,t,n){"use strict";n.d(t,{O:function(){return l}});var r=Object.defineProperty,o=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,u=(e,t,n)=>(o(e,"symbol"!=typeof t?t+"":t,n),n);let l=new class{constructor(){u(this,"current",this.detect()),u(this,"handoffState","pending"),u(this,"currentId",0)}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"undefined"==typeof window||"undefined"==typeof document?"server":"client"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}}},30442:function(e,t,n){"use strict";function r(e,t,...n){if(e in t){let r=t[e];return"function"==typeof r?r(...n):r}let o=Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,r),o}n.d(t,{E:function(){return r}})},41101:function(e,t,n){"use strict";n.d(t,{r:function(){return o}});var r=n(85291);function o(e){return r.O.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}},29675:function(e,t,n){"use strict";n.d(t,{AN:function(){return s},l4:function(){return a},oA:function(){return m},sY:function(){return c},yV:function(){return p}});var r,o,u=n(85137),l=n(33431),i=n(30442),s=((r=s||{})[r.None=0]="None",r[r.RenderStrategy=1]="RenderStrategy",r[r.Static=2]="Static",r),a=((o=a||{})[o.Unmount=0]="Unmount",o[o.Hidden=1]="Hidden",o);function c({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:o,visible:u=!0,name:l}){let s=d(t,e);if(u)return f(s,n,r,l);let a=null!=o?o:0;if(2&a){let{static:e=!1,...t}=s;if(e)return f(t,n,r,l)}if(1&a){let{unmount:e=!0,...t}=s;return(0,i.E)(e?0:1,{0:()=>null,1:()=>f({...t,hidden:!0,style:{display:"none"}},n,r,l)})}return f(s,n,r,l)}function f(e,t={},n,r){let{as:o=n,children:i,refName:s="ref",...a}=h(e,["unmount","static"]),c=void 0!==e.ref?{[s]:e.ref}:{},f="function"==typeof i?i(t):i;"className"in a&&a.className&&"function"==typeof a.className&&(a.className=a.className(t));let p={};if(t){let e=!1,n=[];for(let[r,o]of Object.entries(t))"boolean"==typeof o&&(e=!0),!0===o&&n.push(r);e&&(p["data-headlessui-state"]=n.join(" "))}if(o===u.Fragment&&Object.keys(m(a)).length>0){if(!(0,u.isValidElement)(f)||Array.isArray(f)&&f.length>1)throw Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(a).map(e=>`  - ${e}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(e=>`  - ${e}`).join(`
`)].join(`
`));let e=f.props,t="function"==typeof(null==e?void 0:e.className)?(...t)=>(0,l.A)(null==e?void 0:e.className(...t),a.className):(0,l.A)(null==e?void 0:e.className,a.className),n=t?{className:t}:{};return(0,u.cloneElement)(f,Object.assign({},d(f.props,m(h(a,["ref"]))),p,c,function(...e){return{ref:e.every(e=>null==e)?void 0:t=>{for(let n of e)null!=n&&("function"==typeof n?n(t):n.current=t)}}}(f.ref,c.ref),n))}return(0,u.createElement)(o,Object.assign({},h(a,["ref"]),o!==u.Fragment&&c,o!==u.Fragment&&p),f)}function d(...e){if(0===e.length)return{};if(1===e.length)return e[0];let t={},n={};for(let r of e)for(let e in r)e.startsWith("on")&&"function"==typeof r[e]?(null!=n[e]||(n[e]=[]),n[e].push(r[e])):t[e]=r[e];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(e=>[e,void 0])));for(let e in n)Object.assign(t,{[e](t,...r){for(let o of n[e]){if((t instanceof Event||(null==t?void 0:t.nativeEvent)instanceof Event)&&t.defaultPrevented)return;o(t,...r)}}});return t}function p(e){var t;return Object.assign((0,u.forwardRef)(e),{displayName:null!=(t=e.displayName)?t:e.name})}function m(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}function h(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}}},function(e){e.O(0,[62,929,215,744],function(){return e(e.s=42600)}),_N_E=e.O()}]);