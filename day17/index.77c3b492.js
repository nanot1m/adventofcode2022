var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequiree764;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){n[e]=t},e.parcelRequiree764=o);var i=o("7zFg5"),c=o("idVGl"),r=o("c04jy"),s=(o("1CMLe"),o("jOfNW"));const a=[{name:"-",pos:c.V.vec(0,0),width:4,height:1,points:[c.V.vec(0,0),c.V.vec(1,0),c.V.vec(2,0),c.V.vec(3,0)]},{name:"+",pos:c.V.vec(0,0),width:3,height:3,points:[c.V.vec(1,0),c.V.vec(0,-1),c.V.vec(1,-1),c.V.vec(2,-1),c.V.vec(1,-2)]},{name:"L",pos:c.V.vec(0,0),width:3,height:3,points:[c.V.vec(2,0),c.V.vec(2,-1),c.V.vec(0,-2),c.V.vec(1,-2),c.V.vec(2,-2)]},{name:"I",pos:c.V.vec(0,0),width:1,height:4,points:[c.V.vec(0,0),c.V.vec(0,-1),c.V.vec(0,-2),c.V.vec(0,-3)]},{name:"O",pos:c.V.vec(0,0),width:2,height:2,points:[c.V.vec(0,0),c.V.vec(1,0),c.V.vec(0,-1),c.V.vec(1,-1)]}];function l(e){return e.next().value}function f(e,t){return{...e,pos:c.V.add(e.pos,t)}}function u(e,t,n){let o=e;switch(t){case">":if(c.V.x(e.pos)+1+e.width>7)return e;o=f(e,c.V.vec(1,0));break;case"<":if(c.V.x(e.pos)-1<0)return e;o=f(e,c.V.vec(-1,0));break;default:throw new Error(`Unknown direction: ${t}`)}return o.points.some((e=>n.has(c.V.add(o.pos,e))))?e:o}function d(e,t){const n=t+2+e.height;return f(e,c.V.vec(2,n))}function v(e){return f(e,c.V.vec(0,-1))}function h(e,t,n){const o=c.V.y(e.pos)-e.height+1;if(o>n)return!1;if(0===o)return!0;const i=f(e,c.V.vec(0,-1));return i.points.some((e=>t.has(c.V.add(i.pos,e))))}function p(e,t,n){for(const n of e.points)t.set(c.V.add(e.pos,n),e.name);return Math.max(n,c.V.y(e.pos)+1)}function*V(e){const t=function*(){for(;;)for(const e of a)yield e}(),n=new(0,s.Map2d);let o=0,i=d(l(t),o),c=0;for(;;){let r=!0;for(let s of e)yield{height:o,placedRocks:c,cycleStart:r,map:n,rock:i},r=!1,i=u(i,s,n),h(i,n,o)?(o=p(i,n,o),i=d(l(t),o),c++):i=v(i)}}c=o("idVGl"),r=o("c04jy");const m=document.getElementById("canvas");if(!(m instanceof HTMLCanvasElement))throw new Error("no canvas");const w=m.getContext("2d");if(!w)throw new Error("no ctx");const g=64,E={"+":"#ff922b","-":"#51cf66",L:"#339af0",O:"#cc5de8",I:"#e03131",".":"white"};(0,i.scaleCanvasToPixelRatio)(w,45,320);const y=document.getElementById("input-form");if(!(y instanceof HTMLFormElement))throw new Error("no form");const x=document.getElementById("pause");if(!(x instanceof HTMLButtonElement))throw new Error("no pause button");const b=document.getElementById("speed");if(!(b instanceof HTMLInputElement))throw new Error("no speed input");const L=y.elements.namedItem("input");L instanceof HTMLTextAreaElement&&(L.value=">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>"),y.addEventListener("submit",(function(e){e.preventDefault();!function(e,t){t.canvas.scrollIntoView({behavior:"smooth"}),cancelAnimationFrame(R),T();const n=V(e.trim());let o=0;function i(){const{value:e}=n.next();if(!e)return;t.fillStyle="#343a40",t.fillRect(0,0,t.canvas.width,t.canvas.height);const{map:i,rock:r,height:s}=e,a=s+5;a-o>g&&(o=a-g,console.log(o));const l=i.to2dArray({valToString:e=>e??".",topLeftPos:c.V.vec(0,o),botRightPos:c.V.vec(6,Math.max(a,g))}),f=1;for(let e=0;e<l.length;e++)for(let n=0;n<l[e].length;n++)t.fillStyle=E[l[e][n]],t.fillRect(5*(n+f),5*e,5,5);r.points.forEach((e=>{const[n,i]=c.V.add(e,r.pos);t.fillStyle=E[r.name],t.fillRect(5*(n+f),5*(i-o),5,5)}))}let s=0;function a(e){if(M)s=0;else if(0===s)s=e,i();else if(e-s>I){const t=Math.floor((e-s)/I);s=e;for(const e of(0,r.range)(t))i()}R=requestAnimationFrame(a)}a(0)}((new FormData(this).get("input")?.toString()??"").trim(),w)})),x.addEventListener("click",(function(e){M?T():(M=!0,x&&(x.textContent="Play"))}));let M=!1;function T(){M=!1,x&&(x.removeAttribute("disabled"),x.textContent="Pause")}let I=500;b.value=String(1e3/I),b.addEventListener("input",(function(e){I=1e3/Number(this.value)}));let R=0;
//# sourceMappingURL=index.77c3b492.js.map
