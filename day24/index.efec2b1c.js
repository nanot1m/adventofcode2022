function e(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},l={},r=n.parcelRequiree764;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in l){var t=l[e];delete l[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){l[e]=t},n.parcelRequiree764=r),r.register("5ojQ0",(function(t,n){var o,l;e(t.exports,"register",(()=>o),(e=>o=e)),e(t.exports,"resolve",(()=>l),(e=>l=e));var r={};o=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)r[t[n]]=e[t[n]]},l=function(e){var t=r[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),r("5ojQ0").register(JSON.parse('{"2xBmn":"index.efec2b1c.js","2dmi2":"grass.d15b078f.png","gGxKH":"wall-v.5e4cbb6f.png","8i50T":"wall-h.1d5b6cad.png","iPk1y":"wall-tl.b6d54d5a.png","a1aok":"wall-tr.757e7329.png","390yF":"wall-bl.86040f9e.png","jrZHa":"wall-br.727813ea.png","iSdbY":"index.64bca685.js"}'));var i=r("7zFg5"),a=r("idVGl"),s=r("1CMLe"),d=r("jOfNW");const c=e=>{const t=new(0,d.Map2d),n=(0,s.readLines)(e);for(let e=1;e<n.length-1;e++)for(let o=1;o<n[e].length-1;o++)t.set(a.V.vec(o-1,e-1),n[e][o]);return t};const g={u:(e,[t,n],o)=>"^"===e.get([t,(0,s.mod)(n+o,e.height)]),d:(e,[t,n],o)=>"v"===e.get([t,(0,s.mod)(n-o,e.height)]),l:(e,[t,n],o)=>"<"===e.get([(0,s.mod)(t+o,e.width),n]),r:(e,[t,n],o)=>">"===e.get([(0,s.mod)(t-o,e.width),n])};var f;d=r("jOfNW");f=new URL("../"+r("5ojQ0").resolve("2dmi2"),import.meta.url).toString();var h;h=new URL("../"+r("5ojQ0").resolve("gGxKH"),import.meta.url).toString();var u;u=new URL("../"+r("5ojQ0").resolve("8i50T"),import.meta.url).toString();var w;w=new URL("../"+r("5ojQ0").resolve("iPk1y"),import.meta.url).toString();var m;m=new URL("../"+r("5ojQ0").resolve("a1aok"),import.meta.url).toString();var p;p=new URL("../"+r("5ojQ0").resolve("390yF"),import.meta.url).toString();var v;v=new URL("../"+r("5ojQ0").resolve("jrZHa"),import.meta.url).toString();a=r("idVGl");const S=document.getElementById("canvas"),R=S.getContext("2d"),b=document.getElementById("input-form");document.getElementById("input").value="#.######\n#>>.<^<#\n#.<..<<#\n#>v.><>#\n#<^v^^>#\n######.#";const y=document.querySelector(".controls");b.addEventListener("submit",(function(e){e.preventDefault();!async function(e){const n=c(e),o=(n.width+2)*H+8,l=(n.height+2)*H+8,r=window.innerWidth,s=Math.max(Math.min(Math.floor(r/o),4),1);console.log("maxScale",s),_=s,(0,i.scaleCanvasToPixelRatio)(R,o,l,_),R.fillStyle=x,R.fillRect(0,0,S.width,S.height),R.translate(4*_,4*_);const b="Loading...";let T=Date.now();for(let e=0;e<b.length;e++)j([e,1],b[e],"white");const A=await async function(){const e=await Promise.all([F(t(f)),F(t(h)),F(t(u)),F(t(w)),F(t(m)),F(t(p)),F(t(v))]);return{grass:e[0],wallV:e[1],wallH:e[2],wallTL:e[3],wallTR:e[4],wallBL:e[5],wallBR:e[6]}}();T=Date.now()-T,T<1e3&&await(B=1e3-T,new Promise((e=>setTimeout(e,B))));var B;R.fillStyle=x,R.fillRect(0,0,S.width,S.height);let M=[0,-1],Q=0,U=!1,O=!1;function P(e,t){let n=new(0,d.Map2d);for(let t=-1;t<=e.width;t++)n.set([t,-1],"#"),n.set([t,e.height],"#");for(let t=0;t<e.height;t++)n.set([-1,t],"#"),n.set([e.width,t],"#");n.set([0,-1],"."),n.set([e.width-1,e.height],"."),n=(0,d.parseMap2d)(n.toString());for(const{pos:o,value:l}of n){const r=[o[0]-1,o[1]-1],i=[];if(e.has(r)&&(g.u(e,r,t)&&i.push("⇡"),g.d(e,r,t)&&i.push("⇣"),g.l(e,r,t)&&i.push("⇠"),g.r(e,r,t)&&i.push("⇢")),i.length>0)i.forEach(((e,t)=>j(o,e,E,0===t)));else if("#"===l){const e="#"===n.get([o[0]-1,o[1]]),t="#"===n.get([o[0]+1,o[1]]),l="#"===n.get([o[0],o[1]-1]),r="#"===n.get([o[0],o[1]+1]);L(o,t&&r?A.wallTL:e&&r||e&&!t?A.wallTR:t&&l||t&&!e?A.wallBL:e&&l?A.wallBR:t||e?A.wallH:A.wallV)}else L(o,A.grass)}console.log({playerPos:M}),j([M[0]+1,M[1]+1],"🧌","green",!1),function(e){j(e,"🧝‍♂️","green",!1)}([n.width-2,n.height-1])}function V(){const e={up:a.V.eq([M[0],M[1]-1],[0,-1])||n.has([M[0],M[1]-1]),down:a.V.eq([M[0],M[1]+1],[n.width-1,n.height])||n.has([M[0],M[1]+1]),left:n.has([M[0]-1,M[1]]),right:n.has([M[0]+1,M[1]]),stay:!0};for(const t of y.children)t.disabled=U||O||!e[t.name]}function k(){R.fillStyle=x,R.fillRect(0,0,S.width,S.height);const e="You lost!";for(let t=0;t<e.length;t++)j([t,1],e[t],"red")}function q(){R.fillStyle=x,R.fillRect(0,0,S.width,S.height);const e="You won!";for(let t=0;t<e.length;t++)j([t,1],e[t],"green")}function D(e){Q++,"up"===e?M[1]--:"down"===e?M[1]++:"left"===e?M[0]--:"right"===e&&M[0]++,P(n,Q),V(),a.V.eq(M,[n.width-1,n.height])?(O=!0,q()):(g.u(n,M,Q)||g.d(n,M,Q)||g.l(n,M,Q)||g.r(n,M,Q))&&(U=!0,k())}P(n,Q),V(),y.onclick=function(e){D(e.target.name)}}((new FormData(this).get("input")?.toString()??"").trim())}));const H=10;let _=4;const x="#1e130a",E="#4dabf7";function j(e,t,n="white",o=!0){R.font=H*_+"px monospace",R.textAlign="center",R.textBaseline="middle";const l=H*_;o&&(R.fillStyle=x,R.fillRect(e[0]*l,e[1]*l,l,l)),R.fillStyle=n,R.fillText(t,e[0]*l+l/2,e[1]*l+l/2)}function L(e,t){R.imageSmoothingEnabled=!1,R.drawImage(t,0,0,H,H,e[0]*H*_,e[1]*H*_,H*_,H*_)}function F(e){return new Promise(((t,n)=>{const o=new Image;o.onload=()=>t(o),o.onerror=n,o.src=e}))}
//# sourceMappingURL=index.efec2b1c.js.map