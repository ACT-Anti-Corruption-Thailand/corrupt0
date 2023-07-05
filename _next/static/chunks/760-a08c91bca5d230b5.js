(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[760],{40793:function(e,t,n){e.exports=n(9883)},48428:function(e,t,n){"use strict";n.d(t,{R:function(){return u}});var r,u=((r=u||{}).Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r)},31567:function(e,t,n){"use strict";n.d(t,{u:function(){return R}});var r,u=n(55715),i=n(29675),o=n(17683),l=n(30442),s=n(46650),a=n(7709),c=n(96534),f=n(96173),d=n(99329),m=n(20876);function v(e,...t){e&&t.length>0&&e.classList.add(...t)}function p(e,...t){e&&t.length>0&&e.classList.remove(...t)}var h=n(84569),g=n(76735),E=n(83454);function b(e=""){return e.split(" ").filter(e=>e.trim().length>1)}let y=(0,u.createContext)(null);y.displayName="TransitionContext";var w=((r=w||{}).Visible="visible",r.Hidden="hidden",r);let T=(0,u.createContext)(null);function N(e){return"children"in e?N(e.children):e.current.filter(({el:e})=>null!==e.current).filter(({state:e})=>"visible"===e).length>0}function F(e,t){let n=(0,c.E)(e),r=(0,u.useRef)([]),o=(0,s.t)(),a=(0,h.G)(),f=(0,g.z)((e,t=i.l4.Hidden)=>{let u=r.current.findIndex(({el:t})=>t===e);-1!==u&&((0,l.E)(t,{[i.l4.Unmount](){r.current.splice(u,1)},[i.l4.Hidden](){r.current[u].state="hidden"}}),a.microTask(()=>{var e;!N(r)&&o.current&&(null==(e=n.current)||e.call(n))}))}),d=(0,g.z)(e=>{let t=r.current.find(({el:t})=>t===e);return t?"visible"!==t.state&&(t.state="visible"):r.current.push({el:e,state:"visible"}),()=>f(e,i.l4.Unmount)}),m=(0,u.useRef)([]),v=(0,u.useRef)(Promise.resolve()),p=(0,u.useRef)({enter:[],leave:[],idle:[]}),E=(0,g.z)((e,n,r)=>{m.current.splice(0),t&&(t.chains.current[n]=t.chains.current[n].filter(([t])=>t!==e)),null==t||t.chains.current[n].push([e,new Promise(e=>{m.current.push(e)})]),null==t||t.chains.current[n].push([e,new Promise(e=>{Promise.all(p.current[n].map(([e,t])=>t)).then(()=>e())})]),"enter"===n?v.current=v.current.then(()=>null==t?void 0:t.wait.current).then(()=>r(n)):r(n)}),b=(0,g.z)((e,t,n)=>{Promise.all(p.current[t].splice(0).map(([e,t])=>t)).then(()=>{var e;null==(e=m.current.shift())||e()}).then(()=>n(t))});return(0,u.useMemo)(()=>({children:r,register:d,unregister:f,onStart:E,onStop:b,wait:v,chains:p}),[d,f,r,E,b,p,v])}function S(){}T.displayName="NestingContext";let O=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function A(e){var t;let n={};for(let r of O)n[r]=null!=(t=e[r])?t:S;return n}let P=i.AN.RenderStrategy,x=(0,i.yV)(function(e,t){let{show:n,appear:r=!1,unmount:l,...s}=e,c=(0,u.useRef)(null),m=(0,d.T)(c,t);(0,f.H)();let v=(0,o.oJ)();if(void 0===n&&null!==v&&(n=(v&o.ZM.Open)===o.ZM.Open),![!0,!1].includes(n))throw Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[p,h]=(0,u.useState)(n?"visible":"hidden"),E=F(()=>{h("hidden")}),[b,w]=(0,u.useState)(!0),S=(0,u.useRef)([n]);(0,a.e)(()=>{!1!==b&&S.current[S.current.length-1]!==n&&(S.current.push(n),w(!1))},[S,n]);let O=(0,u.useMemo)(()=>({show:n,appear:r,initial:b}),[n,r,b]);(0,u.useEffect)(()=>{if(n)h("visible");else if(N(E)){let e=c.current;if(!e)return;let t=e.getBoundingClientRect();0===t.x&&0===t.y&&0===t.width&&0===t.height&&h("hidden")}else h("hidden")},[n,E]);let A={unmount:l},x=(0,g.z)(()=>{var t;b&&w(!1),null==(t=e.beforeEnter)||t.call(e)}),C=(0,g.z)(()=>{var t;b&&w(!1),null==(t=e.beforeLeave)||t.call(e)});return u.createElement(T.Provider,{value:E},u.createElement(y.Provider,{value:O},(0,i.sY)({ourProps:{...A,as:u.Fragment,children:u.createElement(L,{ref:m,...A,...s,beforeEnter:x,beforeLeave:C})},theirProps:{},defaultTag:u.Fragment,features:P,visible:"visible"===p,name:"Transition"})))}),L=(0,i.yV)(function(e,t){var n;let r,{beforeEnter:w,afterEnter:S,beforeLeave:O,afterLeave:x,enter:L,enterFrom:C,enterTo:R,entered:M,leave:k,leaveFrom:I,leaveTo:j,...H}=e,D=(0,u.useRef)(null),U=(0,d.T)(D,t),z=H.unmount?i.l4.Unmount:i.l4.Hidden,{show:_,appear:q,initial:V}=function(){let e=(0,u.useContext)(y);if(null===e)throw Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}(),[Z,G]=(0,u.useState)(_?"visible":"hidden"),Y=function(){let e=(0,u.useContext)(T);if(null===e)throw Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}(),{register:$,unregister:B}=Y,J=(0,u.useRef)(null);(0,u.useEffect)(()=>$(D),[$,D]),(0,u.useEffect)(()=>{if(z===i.l4.Hidden&&D.current){if(_&&"visible"!==Z){G("visible");return}return(0,l.E)(Z,{hidden:()=>B(D),visible:()=>$(D)})}},[Z,D,$,B,_,z]);let K=(0,c.E)({enter:b(L),enterFrom:b(C),enterTo:b(R),entered:b(M),leave:b(k),leaveFrom:b(I),leaveTo:b(j)}),W=(n={beforeEnter:w,afterEnter:S,beforeLeave:O,afterLeave:x},r=(0,u.useRef)(A(n)),(0,u.useEffect)(()=>{r.current=A(n)},[n]),r),X=(0,f.H)();(0,u.useEffect)(()=>{if(X&&"visible"===Z&&null===D.current)throw Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[D,Z,X]);let Q=V&&!q,ee=!X||Q||J.current===_?"idle":_?"enter":"leave",et=function(e=0){let[t,n]=(0,u.useState)(e),r=(0,s.t)(),i=(0,u.useCallback)(e=>{r.current&&n(t=>t|e)},[t,r]),o=(0,u.useCallback)(e=>!!(t&e),[t]);return{flags:t,addFlag:i,hasFlag:o,removeFlag:(0,u.useCallback)(e=>{r.current&&n(t=>t&~e)},[n,r]),toggleFlag:(0,u.useCallback)(e=>{r.current&&n(t=>t^e)},[n])}}(0),en=(0,g.z)(e=>(0,l.E)(e,{enter:()=>{et.addFlag(o.ZM.Opening),W.current.beforeEnter()},leave:()=>{et.addFlag(o.ZM.Closing),W.current.beforeLeave()},idle:()=>{}})),er=(0,g.z)(e=>(0,l.E)(e,{enter:()=>{et.removeFlag(o.ZM.Opening),W.current.afterEnter()},leave:()=>{et.removeFlag(o.ZM.Closing),W.current.afterLeave()},idle:()=>{}})),eu=F(()=>{G("hidden"),B(D)},Y);(function({container:e,direction:t,classes:n,onStart:r,onStop:u}){let i=(0,s.t)(),o=(0,h.G)(),f=(0,c.E)(t);(0,a.e)(()=>{let t=(0,m.k)();o.add(t.dispose);let s=e.current;if(s&&"idle"!==f.current&&i.current){var a,c,d;let e,i,o,h,g,E,b;return t.dispose(),r.current(f.current),t.add((a=n.current,c="enter"===f.current,d=()=>{t.dispose(),u.current(f.current)},i=c?"enter":"leave",o=(0,m.k)(),h=void 0!==d?(e={called:!1},(...t)=>{if(!e.called)return e.called=!0,d(...t)}):()=>{},"enter"===i&&(s.removeAttribute("hidden"),s.style.display=""),g=(0,l.E)(i,{enter:()=>a.enter,leave:()=>a.leave}),E=(0,l.E)(i,{enter:()=>a.enterTo,leave:()=>a.leaveTo}),b=(0,l.E)(i,{enter:()=>a.enterFrom,leave:()=>a.leaveFrom}),p(s,...a.enter,...a.enterTo,...a.enterFrom,...a.leave,...a.leaveFrom,...a.leaveTo,...a.entered),v(s,...g,...b),o.nextFrame(()=>{p(s,...b),v(s,...E),function(e,t){let n=(0,m.k)();if(!e)return n.dispose;let{transitionDuration:r,transitionDelay:u}=getComputedStyle(e),[i,o]=[r,u].map(e=>{let[t=0]=e.split(",").filter(Boolean).map(e=>e.includes("ms")?parseFloat(e):1e3*parseFloat(e)).sort((e,t)=>t-e);return t}),l=i+o;if(0!==l){n.group(n=>{n.setTimeout(()=>{t(),n.dispose()},l),n.addEventListener(e,"transitionrun",e=>{e.target===e.currentTarget&&n.dispose()})});let r=n.addEventListener(e,"transitionend",e=>{e.target===e.currentTarget&&(t(),r())})}else t();n.add(()=>t()),n.dispose}(s,()=>(p(s,...g),v(s,...a.entered),h()))}),o.dispose)),t.dispose}},[t])})({container:D,classes:K,direction:ee,onStart:(0,c.E)(e=>{eu.onStart(D,e,en)}),onStop:(0,c.E)(e=>{eu.onStop(D,e,er),"leave"!==e||N(eu)||(G("hidden"),B(D))})}),(0,u.useEffect)(()=>{Q&&(z===i.l4.Hidden?J.current=null:J.current=_)},[_,Q,Z]);let ei=H;return q&&_&&V&&(ei={...ei,className:(0,E.A)(H.className,...K.current.enter,...K.current.enterFrom)}),u.createElement(T.Provider,{value:eu},u.createElement(o.up,{value:(0,l.E)(Z,{visible:o.ZM.Open,hidden:o.ZM.Closed})|et.flags},(0,i.sY)({ourProps:{ref:U},theirProps:ei,defaultTag:"div",features:P,visible:"visible"===Z,name:"Transition.Child"})))}),C=(0,i.yV)(function(e,t){let n=null!==(0,u.useContext)(y),r=null!==(0,o.oJ)();return u.createElement(u.Fragment,null,!n&&r?u.createElement(x,{ref:t,...e}):u.createElement(L,{ref:t,...e}))}),R=Object.assign(x,{Child:C,Root:x})},62596:function(e,t,n){"use strict";n.d(t,{v:function(){return o}});var r=n(55715),u=n(7709),i=n(96534);function o(e,t){let[n,o]=(0,r.useState)(e),l=(0,i.E)(e);return(0,u.e)(()=>o(l.current),[l,o,...t]),n}},76522:function(e,t,n){"use strict";n.d(t,{q:function(){return i}});var r=n(55715),u=n(76735);function i(e,t,n){let[i,o]=(0,r.useState)(n),l=void 0!==e,s=(0,r.useRef)(l),a=(0,r.useRef)(!1),c=(0,r.useRef)(!1);return!l||s.current||a.current?l||!s.current||c.current||(c.current=!0,s.current=l,console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")):(a.current=!0,s.current=l,console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")),[l?e:i,(0,u.z)(e=>(l||o(e),null==t?void 0:t(e)))]}},84569:function(e,t,n){"use strict";n.d(t,{G:function(){return i}});var r=n(55715),u=n(20876);function i(){let[e]=(0,r.useState)(u.k);return(0,r.useEffect)(()=>()=>e.dispose(),[e]),e}},76735:function(e,t,n){"use strict";n.d(t,{z:function(){return i}});var r=n(55715),u=n(96534);let i=function(e){let t=(0,u.E)(e);return r.useCallback((...e)=>t.current(...e),[t])}},29551:function(e,t,n){"use strict";n.d(t,{M:function(){return s}});var r,u=n(55715),i=n(7709),o=n(96173),l=n(85291);let s=null!=(r=u.useId)?r:function(){let e=(0,o.H)(),[t,n]=u.useState(e?()=>l.O.nextId():null);return(0,i.e)(()=>{null===t&&n(l.O.nextId())},[t]),null!=t?""+t:void 0}},46650:function(e,t,n){"use strict";n.d(t,{t:function(){return i}});var r=n(55715),u=n(7709);function i(){let e=(0,r.useRef)(!1);return(0,u.e)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}},7709:function(e,t,n){"use strict";n.d(t,{e:function(){return i}});var r=n(55715),u=n(85291);let i=(e,t)=>{u.O.isServer?(0,r.useEffect)(e,t):(0,r.useLayoutEffect)(e,t)}},96534:function(e,t,n){"use strict";n.d(t,{E:function(){return i}});var r=n(55715),u=n(7709);function i(e){let t=(0,r.useRef)(e);return(0,u.e)(()=>{t.current=e},[e]),t}},7609:function(e,t,n){"use strict";n.d(t,{O:function(){return s}});var r=n(55715),u=n(43137),i=n(96534);function o(e,t,n){let u=(0,i.E)(t);(0,r.useEffect)(()=>{function t(e){u.current(e)}return document.addEventListener(e,t,n),()=>document.removeEventListener(e,t,n)},[e,n])}var l=n(60176);function s(e,t,n=!0){let i=(0,r.useRef)(!1);function s(n,r){if(!i.current||n.defaultPrevented)return;let o=r(n);if(null!==o&&o.getRootNode().contains(o)){for(let t of function e(t){return"function"==typeof t?e(t()):Array.isArray(t)||t instanceof Set?t:[t]}(e)){if(null===t)continue;let e=t instanceof HTMLElement?t:t.current;if(null!=e&&e.contains(o)||n.composed&&n.composedPath().includes(e))return}return(0,u.sP)(o,u.tJ.Loose)||-1===o.tabIndex||n.preventDefault(),t(n,o)}}(0,r.useEffect)(()=>{requestAnimationFrame(()=>{i.current=n})},[n]);let a=(0,r.useRef)(null);o("mousedown",e=>{var t,n;i.current&&(a.current=(null==(n=null==(t=e.composedPath)?void 0:t.call(e))?void 0:n[0])||e.target)},!0),o("click",e=>{a.current&&(s(e,()=>a.current),a.current=null)},!0),(0,l.s)("blur",e=>s(e,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}},65592:function(e,t,n){"use strict";n.d(t,{f:function(){return o}});var r=n(55715),u=n(7709);function i(e){var t;if(e.type)return e.type;let n=null!=(t=e.as)?t:"button";if("string"==typeof n&&"button"===n.toLowerCase())return"button"}function o(e,t){let[n,o]=(0,r.useState)(()=>i(e));return(0,u.e)(()=>{o(i(e))},[e.type,e.as]),(0,u.e)(()=>{n||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&o("button")},[n,t]),n}},96173:function(e,t,n){"use strict";n.d(t,{H:function(){return i}});var r=n(55715),u=n(85291);function i(){let[e,t]=(0,r.useState)(u.O.isHandoffComplete);return e&&!1===u.O.isHandoffComplete&&t(!1),(0,r.useEffect)(()=>{!0!==e&&t(!0)},[e]),(0,r.useEffect)(()=>u.O.handoff(),[]),e}},99329:function(e,t,n){"use strict";n.d(t,{T:function(){return l},h:function(){return o}});var r=n(55715),u=n(76735);let i=Symbol();function o(e,t=!0){return Object.assign(e,{[i]:t})}function l(...e){let t=(0,r.useRef)(e);(0,r.useEffect)(()=>{t.current=e},[e]);let n=(0,u.z)(e=>{for(let n of t.current)null!=n&&("function"==typeof n?n(e):n.current=e)});return e.every(e=>null==e||(null==e?void 0:e[i]))?void 0:n}},34184:function(e,t,n){"use strict";n.d(t,{g:function(){return i}});var r=n(55715);function u(e){return[e.screenX,e.screenY]}function i(){let e=(0,r.useRef)([-1,-1]);return{wasMoved(t){let n=u(t);return(e.current[0]!==n[0]||e.current[1]!==n[1])&&(e.current=n,!0)},update(t){e.current=u(t)}}}},71747:function(e,t,n){"use strict";n.d(t,{q:function(){return i}});var r=n(55715),u=n(76735);function i(e,t){let n=(0,r.useRef)([]),i=(0,u.z)(e);(0,r.useEffect)(()=>{let e=[...n.current];for(let[r,u]of t.entries())if(n.current[r]!==u){let r=i(t,e);return n.current=t,r}},[i,...t])}},60176:function(e,t,n){"use strict";n.d(t,{s:function(){return i}});var r=n(55715),u=n(96534);function i(e,t,n){let i=(0,u.E)(t);(0,r.useEffect)(()=>{function t(e){i.current(e)}return window.addEventListener(e,t,n),()=>window.removeEventListener(e,t,n)},[e,n])}},82627:function(e,t,n){"use strict";n.d(t,{A:function(){return i},_:function(){return o}});var r,u=n(29675),i=((r=i||{})[r.None=1]="None",r[r.Focusable=2]="Focusable",r[r.Hidden=4]="Hidden",r);let o=(0,u.yV)(function(e,t){let{features:n=1,...r}=e,i={ref:t,"aria-hidden":(2&n)==2||void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(4&n)==4&&(2&n)!=2&&{display:"none"}}};return(0,u.sY)({ourProps:i,theirProps:r,slot:{},defaultTag:"div",name:"Hidden"})})},17683:function(e,t,n){"use strict";n.d(t,{ZM:function(){return o},oJ:function(){return l},up:function(){return s}});var r,u=n(55715);let i=(0,u.createContext)(null);i.displayName="OpenClosedContext";var o=((r=o||{})[r.Open=1]="Open",r[r.Closed=2]="Closed",r[r.Closing=4]="Closing",r[r.Opening=8]="Opening",r);function l(){return(0,u.useContext)(i)}function s({value:e,children:t}){return u.createElement(i.Provider,{value:e},t)}},47543:function(e,t,n){"use strict";function r(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(null==t?void 0:t.getAttribute("disabled"))==="";return!(r&&function(e){if(!e)return!1;let t=e.previousElementSibling;for(;null!==t;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}(n))&&r}n.d(t,{P:function(){return r}})},43883:function(e,t,n){"use strict";n.d(t,{T:function(){return u},d:function(){return i}});var r,u=((r=u||{})[r.First=0]="First",r[r.Previous=1]="Previous",r[r.Next=2]="Next",r[r.Last=3]="Last",r[r.Specific=4]="Specific",r[r.Nothing=5]="Nothing",r);function i(e,t){let n=t.resolveItems();if(n.length<=0)return null;let r=t.resolveActiveIndex(),u=null!=r?r:-1,i=(()=>{switch(e.focus){case 0:return n.findIndex(e=>!t.resolveDisabled(e));case 1:{let e=n.slice().reverse().findIndex((e,n,r)=>(-1===u||!(r.length-n-1>=u))&&!t.resolveDisabled(e));return -1===e?e:n.length-1-e}case 2:return n.findIndex((e,n)=>!(n<=u)&&!t.resolveDisabled(e));case 3:{let e=n.slice().reverse().findIndex(e=>!t.resolveDisabled(e));return -1===e?e:n.length-1-e}case 4:return n.findIndex(n=>t.resolveId(n)===e.id);case 5:return null;default:!function(e){throw Error("Unexpected object: "+e)}(e)}})();return -1===i?r:i}},83454:function(e,t,n){"use strict";function r(...e){return e.filter(Boolean).join(" ")}n.d(t,{A:function(){return r}})},20876:function(e,t,n){"use strict";n.d(t,{k:function(){return function e(){let t=[],n={addEventListener:(e,t,r,u)=>(e.addEventListener(t,r,u),n.add(()=>e.removeEventListener(t,r,u))),requestAnimationFrame(...e){let t=requestAnimationFrame(...e);return n.add(()=>cancelAnimationFrame(t))},nextFrame:(...e)=>n.requestAnimationFrame(()=>n.requestAnimationFrame(...e)),setTimeout(...e){let t=setTimeout(...e);return n.add(()=>clearTimeout(t))},microTask(...e){let t={current:!0};return(0,r.Y)(()=>{t.current&&e[0]()}),n.add(()=>{t.current=!1})},style(e,t,n){let r=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:n}),this.add(()=>{Object.assign(e.style,{[t]:r})})},group(t){let n=e();return t(n),this.add(()=>n.dispose())},add:e=>(t.push(e),()=>{let n=t.indexOf(e);if(n>=0)for(let e of t.splice(n,1))e()}),dispose(){for(let e of t.splice(0))e()}};return n}}});var r=n(79603)},85291:function(e,t,n){"use strict";n.d(t,{O:function(){return o}});var r=Object.defineProperty,u=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,i=(e,t,n)=>(u(e,"symbol"!=typeof t?t+"":t,n),n);let o=new class{constructor(){i(this,"current",this.detect()),i(this,"handoffState","pending"),i(this,"currentId",0)}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"undefined"==typeof window||"undefined"==typeof document?"server":"client"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}}},43137:function(e,t,n){"use strict";n.d(t,{C5:function(){return E},GO:function(){return v},TO:function(){return f},fE:function(){return d},jA:function(){return y},sP:function(){return h},tJ:function(){return p},z2:function(){return b}});var r,u,i,o,l,s=n(30442),a=n(41101);let c=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var f=((r=f||{})[r.First=1]="First",r[r.Previous=2]="Previous",r[r.Next=4]="Next",r[r.Last=8]="Last",r[r.WrapAround=16]="WrapAround",r[r.NoScroll=32]="NoScroll",r),d=((u=d||{})[u.Error=0]="Error",u[u.Overflow=1]="Overflow",u[u.Success=2]="Success",u[u.Underflow=3]="Underflow",u),m=((i=m||{})[i.Previous=-1]="Previous",i[i.Next=1]="Next",i);function v(e=document.body){return null==e?[]:Array.from(e.querySelectorAll(c)).sort((e,t)=>Math.sign((e.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER)))}var p=((o=p||{})[o.Strict=0]="Strict",o[o.Loose=1]="Loose",o);function h(e,t=0){var n;return e!==(null==(n=(0,a.r)(e))?void 0:n.body)&&(0,s.E)(t,{0:()=>e.matches(c),1(){let t=e;for(;null!==t;){if(t.matches(c))return!0;t=t.parentElement}return!1}})}var g=((l=g||{})[l.Keyboard=0]="Keyboard",l[l.Mouse=1]="Mouse",l);function E(e){null==e||e.focus({preventScroll:!0})}function b(e,t=e=>e){return e.slice().sort((e,n)=>{let r=t(e),u=t(n);if(null===r||null===u)return 0;let i=r.compareDocumentPosition(u);return i&Node.DOCUMENT_POSITION_FOLLOWING?-1:i&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function y(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:u=[]}={}){var i,o,l;let s=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,a=Array.isArray(e)?n?b(e):e:v(e);u.length>0&&a.length>1&&(a=a.filter(e=>!u.includes(e))),r=null!=r?r:s.activeElement;let c=(()=>{if(5&t)return 1;if(10&t)return -1;throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),f=(()=>{if(1&t)return 0;if(2&t)return Math.max(0,a.indexOf(r))-1;if(4&t)return Math.max(0,a.indexOf(r))+1;if(8&t)return a.length-1;throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),d=32&t?{preventScroll:!0}:{},m=0,p=a.length,h;do{if(m>=p||m+p<=0)return 0;let e=f+m;if(16&t)e=(e+p)%p;else{if(e<0)return 3;if(e>=p)return 1}null==(h=a[e])||h.focus(d),m+=c}while(h!==s.activeElement);return 6&t&&null!=(l=null==(o=null==(i=h)?void 0:i.matches)?void 0:o.call(i,"textarea,input"))&&l&&h.select(),2}"undefined"!=typeof window&&"undefined"!=typeof document&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{1===e.detail?delete document.documentElement.dataset.headlessuiFocusVisible:0===e.detail&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0))},95594:function(e,t,n){"use strict";function r(e,t){return e?e+"["+t+"]":t}function u(e){var t;let n=null!=(t=null==e?void 0:e.form)?t:e.closest("form");if(n){for(let e of n.elements)if("INPUT"===e.tagName&&"submit"===e.type||"BUTTON"===e.tagName&&"submit"===e.type||"INPUT"===e.nodeName&&"image"===e.type){e.click();return}}}n.d(t,{g:function(){return u},t:function(){return function e(t={},n=null,u=[]){for(let[i,o]of Object.entries(t))!function t(n,u,i){if(Array.isArray(i))for(let[e,o]of i.entries())t(n,r(u,e.toString()),o);else i instanceof Date?n.push([u,i.toISOString()]):"boolean"==typeof i?n.push([u,i?"1":"0"]):"string"==typeof i?n.push([u,i]):"number"==typeof i?n.push([u,`${i}`]):null==i?n.push([u,""]):e(i,u,n)}(u,r(n,i),o);return u}}})},30442:function(e,t,n){"use strict";function r(e,t,...n){if(e in t){let r=t[e];return"function"==typeof r?r(...n):r}let u=Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,r),u}n.d(t,{E:function(){return r}})},79603:function(e,t,n){"use strict";function r(e){"function"==typeof queueMicrotask?queueMicrotask(e):Promise.resolve().then(e).catch(e=>setTimeout(()=>{throw e}))}n.d(t,{Y:function(){return r}})},41101:function(e,t,n){"use strict";n.d(t,{r:function(){return u}});var r=n(85291);function u(e){return r.O.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}},4356:function(e,t,n){"use strict";function r(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function u(){return r()||/Android/gi.test(window.navigator.userAgent)}n.d(t,{gn:function(){return r},tq:function(){return u}})},29675:function(e,t,n){"use strict";n.d(t,{AN:function(){return s},l4:function(){return a},oA:function(){return v},sY:function(){return c},yV:function(){return m}});var r,u,i=n(55715),o=n(83454),l=n(30442),s=((r=s||{})[r.None=0]="None",r[r.RenderStrategy=1]="RenderStrategy",r[r.Static=2]="Static",r),a=((u=a||{})[u.Unmount=0]="Unmount",u[u.Hidden=1]="Hidden",u);function c({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:u,visible:i=!0,name:o}){let s=d(t,e);if(i)return f(s,n,r,o);let a=null!=u?u:0;if(2&a){let{static:e=!1,...t}=s;if(e)return f(t,n,r,o)}if(1&a){let{unmount:e=!0,...t}=s;return(0,l.E)(e?0:1,{0:()=>null,1:()=>f({...t,hidden:!0,style:{display:"none"}},n,r,o)})}return f(s,n,r,o)}function f(e,t={},n,r){let{as:u=n,children:l,refName:s="ref",...a}=p(e,["unmount","static"]),c=void 0!==e.ref?{[s]:e.ref}:{},f="function"==typeof l?l(t):l;"className"in a&&a.className&&"function"==typeof a.className&&(a.className=a.className(t));let m={};if(t){let e=!1,n=[];for(let[r,u]of Object.entries(t))"boolean"==typeof u&&(e=!0),!0===u&&n.push(r);e&&(m["data-headlessui-state"]=n.join(" "))}if(u===i.Fragment&&Object.keys(v(a)).length>0){if(!(0,i.isValidElement)(f)||Array.isArray(f)&&f.length>1)throw Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(a).map(e=>`  - ${e}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(e=>`  - ${e}`).join(`
`)].join(`
`));let e=f.props,t="function"==typeof(null==e?void 0:e.className)?(...t)=>(0,o.A)(null==e?void 0:e.className(...t),a.className):(0,o.A)(null==e?void 0:e.className,a.className),n=t?{className:t}:{};return(0,i.cloneElement)(f,Object.assign({},d(f.props,v(p(a,["ref"]))),m,c,function(...e){return{ref:e.every(e=>null==e)?void 0:t=>{for(let n of e)null!=n&&("function"==typeof n?n(t):n.current=t)}}}(f.ref,c.ref),n))}return(0,i.createElement)(u,Object.assign({},p(a,["ref"]),u!==i.Fragment&&c,u!==i.Fragment&&m),f)}function d(...e){if(0===e.length)return{};if(1===e.length)return e[0];let t={},n={};for(let r of e)for(let e in r)e.startsWith("on")&&"function"==typeof r[e]?(null!=n[e]||(n[e]=[]),n[e].push(r[e])):t[e]=r[e];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(e=>[e,void 0])));for(let e in n)Object.assign(t,{[e](t,...r){for(let u of n[e]){if((t instanceof Event||(null==t?void 0:t.nativeEvent)instanceof Event)&&t.defaultPrevented)return;u(t,...r)}}});return t}function m(e){var t;return Object.assign((0,i.forwardRef)(e),{displayName:null!=(t=e.displayName)?t:e.name})}function v(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}function p(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}}}]);