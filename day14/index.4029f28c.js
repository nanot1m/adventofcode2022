var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},t={},o=n.parcelRequiree764;null==o&&((o=function(n){if(n in e)return e[n].exports;if(n in t){var o=t[n];delete t[n];var i={id:n,exports:{}};return e[n]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(n,e){t[n]=e},n.parcelRequiree764=o);var i=o("idVGl"),r=o("c04jy"),a=o("1CMLe"),s=o("jOfNW");const c=i.V.vec(500,0);function l(n){const e=(0,a.readLines)(n.trimEnd()).map((0,a.typed)("vec[]")),t=(0,r.it)(e).flatMap((n=>(0,r.it)(n).windowed(2).flatMap((([n,e])=>i.V.segment(n,e))))).map((n=>(0,a.tuple)(n,"#")));return new(0,s.Map2d)(t).set(c,"+")}function*f(n,e=n.bounds.maxY){const t=i.V.vec(0,1),o=i.V.vec(-1,1),r=i.V.vec(1,1);function a(a){let s=a;for(;;){if(i.V.y(s)>=e)return null;const a=i.V.add(s,t);if(!1===n.hasPos(a)){s=a;continue}const c=i.V.add(s,o);if(!1===n.hasPos(c)){s=c;continue}const l=i.V.add(s,r);if(!1!==n.hasPos(l))return s;s=l}}for(;;){const e=a(c);if(null===e||i.V.eq(e,c))return;n.set(e,"o"),yield e}}i=o("idVGl");const d=document.getElementById("canvas");if(!(d instanceof HTMLCanvasElement))throw new Error("no canvas");const u=d.getContext("2d");if(!u)throw new Error("no ctx");let m=0;function h(n,e,t=!1){cancelAnimationFrame(m);const o=l(n);if(t){const n=o.height+1,e=Math.min(o.bounds.minX,500-n),t=Math.max(o.bounds.maxX,500+n),r=i.V.segment(i.V.vec(e,n),i.V.vec(t,n));for(const n of r)o.set(n,"~")}const{width:r,height:a,bounds:s}=o,c=Math.min(10,Math.max(2,200/r));e.canvas.width=r*c,e.canvas.height=a*c,e.canvas.scrollIntoView({behavior:"smooth"});const d={"+":"orange",o:"orange","#":"gray",".":"darkblue","~":"brown"},u=f(o);o.to2dArray({valToString:n=>n??"."}).forEach(((n,t)=>{n.forEach(((n,o)=>{e.fillStyle=d[n],e.fillRect(o*c,t*c,c,c)}))}));const h=()=>{const n=u.next().value;n&&(!function([n,t],o){e.fillStyle=o,e.fillRect((n-s.minX)*c,(t-s.minY)*c,c,c)}(n,d.o),m=requestAnimationFrame(h))};h()}const v=document.getElementById("input-form");if(!(v instanceof HTMLFormElement))throw new Error("no form");v.addEventListener("submit",(function(n){n.preventDefault();const e=new FormData(this);h((e.get("input")?.toString()??"").trim(),u,"on"===e.get("part2"))}));
//# sourceMappingURL=index.4029f28c.js.map