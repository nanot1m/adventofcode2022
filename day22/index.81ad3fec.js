var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequiree764;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequiree764=o);var r=o("7zFg5"),i=o("idVGl"),s=o("c04jy"),c=o("1CMLe"),a=o("jOfNW"),f=o("hyM6K");const l=e=>{const[t,n]=(0,c.readBlocks)(e),o=(0,c.readLines)(t);let r=1/0;for(const e of o){const t=e.trim(),n=e.length-t.length;0!==n&&(r=Math.min(r,n))}const f=new(0,a.Map2d);for(let e=0;e<o.length;e++)for(let t=0;t<o[e].length;t++)" "!==o[e][t]&&f.set(i.V.vec(t,e),o[e][t]);const l=(0,s.it)(f).filter((e=>"."===e.value)).toArray().sort(((e,t)=>e.pos[1]-t.pos[1]||e.pos[0]-t.pos[0]))[0].pos,u=[];let d="";for(let e of n)"L"===e||"R"===e?(d&&u.push(d,e),d=""):d+=e;return u.push(d),{map:f,start:l,moves:u,sideSize:r}};const u=[(0,f.asDir)("D"),(0,f.asDir)("R"),(0,f.asDir)("U"),(0,f.asDir)("L")];(0,f.asDir)("R"),(0,f.asDir)("D"),(0,f.asDir)("L"),(0,f.asDir)("U");function*d(e,t,n,o,r,s=!1){let c=o,l=1;const d=new(0,a.Map2d);function p(t,o){let c=i.V.add(t,f.DIR_TO_VEC[o]);const a=e.get(c);if("."===a)return t=c,d.set(t,o),{pos:t,ok:!0,dir:o};if("#"===a)return{pos:t,ok:!1,dir:o};const l=n.get(t);if(null==l)throw new Error("no connection at pos "+t.join(",")+" dir "+o);if(null==l[o])throw new Error("Connection at pos "+t.join(",")+" dir "+o+" is null");return"#"===e.get(l[o])?{pos:t,ok:!1,dir:o}:(c=l[o],s&&(o=function(e,t,n){switch(e){case"L":if(i.V.x(t)===n&&i.V.y(t)<n)return"R";if(i.V.x(t)===n)return"U";if(0===i.V.x(t)&&i.V.y(t)<3*n)return"R";if(0===i.V.x(t))return"U";case"U":if(i.V.y(t)===3*n-1)return"L";if(i.V.y(t)===n-1)return"L";if(i.V.y(t)===4*n-1)return"U";case"D":if(0===i.V.y(t)&&i.V.x(t)<2*n)return"R";if(0===i.V.y(t))return"D";if(i.V.y(t)===2*n)return"R";case"R":if(i.V.x(t)===3*n-1)return"L";if(i.V.x(t)===2*n-1&&i.V.y(t)<2*n)return"D";if(i.V.x(t)===2*n-1)return"L";if(i.V.x(t)===n-1)return"D"}return e}(o,t,r)),d.set(t,o),{pos:c,ok:!0,dir:o})}function g(e,t,n,o){const r=p(o,{U:"D",D:"U",L:"R",R:"L"}[n]);if(!r.ok)throw new Error("Plane switch failed. Expected to go back to "+o);if(r.pos.join(",")!==t.join(","))throw new Error(`Plane switch from ${e} at ${t.join(",")} to ${n} at ${o.join(",")} failed. Expected to go back to ${t.join(",")} but got ${r.pos.join(",")}`)}for(const e of t){const t=Number(e);if(isNaN(t)){l+="L"===e?-1:1,l=(l+4)%4,yield{pos:c,dir:u[l],visited:d,move:e};continue}let n=u[l];for(let o=0;o<t;o++){const t=p(c,n);if(!t.ok)break;g(n,c,t.dir,t.pos),c=t.pos,n=t.dir,l=u.indexOf(n),yield{pos:c,dir:n,visited:d,move:e}}}}function p(e){const t=new(0,a.Map2d);for(const n of(0,s.range)(e)){const o=i.V.vec(e+n,0),r=t.get(o)??{},s=i.V.vec(0,3*e+n),c=t.get(s)??{};r.D=s,c.L=o,t.set(o,r),t.set(s,c)}for(const n of(0,s.range)(e)){const o=i.V.vec(2*e+n,0),r=t.get(o)??{},s=i.V.vec(n,4*e-1),c=t.get(s)??{};r.D=s,c.U=o,t.set(o,r),t.set(s,c)}for(const n of(0,s.range)(e)){const o=i.V.vec(3*e-1,n),r=t.get(o)??{},s=i.V.vec(2*e-1,3*e-n-1),c=t.get(s)??{};r.R=s,c.R=o,t.set(o,r),t.set(s,c)}for(const n of(0,s.range)(e)){const o=i.V.vec(2*e+n,e-1),r=t.get(o)??{},s=i.V.vec(2*e-1,e+n),c=t.get(s)??{};r.U=s,c.R=o,t.set(o,r),t.set(s,c)}for(const n of(0,s.range)(e)){const o=i.V.vec(e+n,3*e-1),r=i.V.vec(e-1,3*e+n),s=t.get(o)??{},c=t.get(r)??{};s.U=r,c.R=o,t.set(o,s),t.set(r,c)}for(const n of(0,s.range)(e)){const o=i.V.vec(0,2*e+n),r=i.V.vec(e,e-n-1),s=t.get(o)??{},c=t.get(r)??{};s.L=r,c.L=o,t.set(o,s),t.set(r,c)}for(const n of(0,s.range)(e)){const o=i.V.vec(n,2*e),r=i.V.vec(e,e+n),s=t.get(o)??{},c=t.get(r)??{};s.D=r,c.L=o,t.set(o,s),t.set(r,c)}return t}s=o("c04jy");const g=document.getElementById("canvas");if(!(g instanceof HTMLCanvasElement))throw new Error("no canvas");const v=g.getContext("2d");if(!v)throw new Error("no ctx");const m=(0,r.scaleCanvasToPixelRatio)(v,400,400);g.style.width="200px",g.style.height="200px";const h=document.getElementById("input-form");if(!(h instanceof HTMLFormElement))throw new Error("no form");const w=document.getElementById("speed");if(!(w instanceof HTMLInputElement))throw new Error("no speed input");let V=100;w.value=String(1e3/V),document.querySelector('[for="speed"]').innerText="Steps per second: "+1e3/V,w.addEventListener("input",(function(e){V=1e3/Number(this.value),document.querySelector('[for="speed"]').innerText="Steps per second: "+this.value})),h.addEventListener("submit",(function(e){e.preventDefault();!function(e,t){M&&cancelAnimationFrame(M);t.canvas.scrollIntoView({behavior:"smooth"});const{map:n,moves:o,start:r,sideSize:i}=l(e),c=p(i),a=d(n,o,c,r,i,!0);function f(e,n,o,r){if(t.fillStyle=o,t.fillRect(2*e[0],2*e[1],2,2),!r){D("front",[1,1]),D("top",[1,0]),D("right",[2,0]),D("bottom",[1,2]),D("left",[0,2]),D("back",[0,3]);let t="front";t=e[1]<50?e[0]<100?"top":"right":e[1]<100?"front":e[1]<150?e[0]<50?"left":"bottom":"back";const n=document.querySelector(`[name="rotate-cube-side"][value="${t}"]`);n instanceof HTMLInputElement&&(n.checked=!0,x())}}function u(){for(const e of n)t.fillStyle=R[e.value]??"white",t.fillRect(2*e.pos[0],2*e.pos[1],2,2);f(r,"R")}let g;function v(){const e=a.next();if(e.done)return;const{dir:t,pos:n,move:o}=e.value;g&&(f(g,t,"white",!0),f(g,t,"#1971c2a0",!0)),f(n,t,"#e03131"),g=n,document.getElementById("status").innerText=`Move: ${o}, Dir: ${b[t]}`}t.fillStyle="black",t.fillRect(0,0,t.canvas.width,t.canvas.height),u();let m=0;function h(e){if(0===m)m=e,v();else if(e-m>V){const t=Math.floor((e-m)/V);m=e;for(const e of(0,s.range)(t))v()}M=requestAnimationFrame(h)}h(0)}((new FormData(this).get("input")?.toString()??"").trimEnd(),v)}));const y=document.querySelector(".cube"),E=document.querySelector(".radio-group");let L="";function x(){if(!(E instanceof HTMLElement))throw new Error("no radio group");var e=E.querySelector(":checked");if(e instanceof HTMLInputElement){var t="show-"+e.value;L&&y&&y.classList.remove(L),y?.classList.add(t),L=t}}function D(e,t){const n=document.querySelector(`.cube__face--${e}`);if(!(g instanceof HTMLCanvasElement))throw new Error("no canvas");if(n instanceof HTMLElement){let e,o=n.querySelector("canvas");if(!o){if(o=document.createElement("canvas"),e=o.getContext("2d"),!e)throw new Error("no ctx");e.canvas.width=100*m,e.canvas.height=100*m,n.appendChild(o)}if(e=o.getContext("2d"),!e)throw new Error("no ctx");e.drawImage(g,50*-t[0]*2*m,50*-t[1]*2*m)}}x(),E?.addEventListener("change",x);const R={".":"white","#":"#343a40"},b={D:"↑",U:"↓",L:"←",R:"→"};let M=0;
//# sourceMappingURL=index.81ad3fec.js.map