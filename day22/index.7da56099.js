function t(t,e,n,r){Object.defineProperty(t,e,{get:n,set:r,enumerable:!0,configurable:!0})}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=e.parcelRequiree764;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in r){var e=r[t];delete r[t];var i={id:t,exports:{}};return n[t]=i,e.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){r[t]=e},e.parcelRequiree764=i),i.register("idVGl",(function(e,n){t(e.exports,"V",(()=>i("hyM6K")));i("hyM6K"),i("ip9Yo"),i("1CMLe"),i("c04jy"),i("72uML")})),i.register("hyM6K",(function(e,n){t(e.exports,"DIR_TO_VEC",(()=>r)),t(e.exports,"DIRS_4",(()=>i)),t(e.exports,"DIRS_3_TOP",(()=>o)),t(e.exports,"asDir",(()=>s)),t(e.exports,"signed",(()=>a)),t(e.exports,"add",(()=>c)),t(e.exports,"sub",(()=>f)),t(e.exports,"fromDir",(()=>h)),t(e.exports,"zero",(()=>u)),t(e.exports,"vec",(()=>p)),t(e.exports,"x",(()=>l)),t(e.exports,"y",(()=>d)),t(e.exports,"isVec",(()=>m)),t(e.exports,"eq",(()=>x)),t(e.exports,"min",(()=>g)),t(e.exports,"max",(()=>y)),t(e.exports,"segment",(()=>v)),t(e.exports,"cLen",(()=>$)),t(e.exports,"ZERO",(()=>b)),t(e.exports,"mLen",(()=>_)),t(e.exports,"inRange",(()=>M));const r={U:[0,1],R:[1,0],D:[0,-1],L:[-1,0],UR:[1,1],UL:[-1,1]},i=[r.U,r.R,r.D,r.L],o=[r.UL,r.U,r.UR],s=t=>{if(t in r)return t;throw new Error(`Invalid direction: ${t}`)},a=([t,e])=>[Math.sign(t),Math.sign(e)],c=([t,e],[n,r])=>[t+n,e+r],f=([t,e],[n,r])=>[t-n,e-r],h=t=>r[t],u=()=>[0,0],p=(t,e)=>[t,e],l=t=>t[0],d=t=>t[1],m=t=>Array.isArray(t)&&2===t.length&&"number"==typeof t[0]&&"number"==typeof t[1],x=(t,e)=>t[0]===e[0]&&t[1]===e[1],g=(t,e)=>[Math.min(t[0],e[0]),Math.min(t[1],e[1])],y=(t,e)=>[Math.max(t[0],e[0]),Math.max(t[1],e[1])];function*v(t,e){const n=f(e,t),r=a(n),i=$(t,e);let o=t;yield o;for(let t=0;t<i;t++)o=c(o,r),yield o}const b=u(),$=(t,e=u())=>Math.max(Math.abs(t[0]-e[0]),Math.abs(t[1]-e[1])),_=(t,e=u())=>Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1]),M=(t,e,n)=>t[0]>=e[0]&&t[0]<=n[0]&&t[1]>=e[1]&&t[1]<=n[1]})),i.register("ip9Yo",(function(e,n){t(e.exports,"vec3",(()=>r));const r=(t,e,n)=>[t,e,n]})),i.register("1CMLe",(function(e,n){t(e.exports,"readLines",(()=>s)),t(e.exports,"readBlocks",(()=>a)),t(e.exports,"add",(()=>c)),t(e.exports,"mul",(()=>f)),t(e.exports,"tuple",(()=>h)),t(e.exports,"typed",(()=>d)),i("idVGl");var r=i("hyM6K"),o=(i("c04jy"),i("ip9Yo"));function s(t){return t.split("\n")}function a(t){return t.split("\n\n")}function c(t,e){return t+e}function f(t,e){return t*e}function h(...t){return t}function u(t){const e=["\n\n","\n"," -> ",", ",","," - ","-"," "];for(const n of e)if(t.includes(n))return n;return null}const p={vec:{check:t=>"vec"===t,parse(t){const e=u(t),[n,i]=t.split(e).map(Number);return r.vec(n,i)}},vec3:{check:t=>"vec3"===t,parse(t){const e=u(t),[n,r,i]=t.split(e).map(Number);return(0,o.vec3)(n,r,i)}},int:{check:t=>"int"===t,parse:t=>parseInt(t,10)},array:{check:t=>t.endsWith("[]"),parse(t,e){const n=u(t);if(!n)return[l(t,e.slice(0,-2))];const r=e.slice(0,-2);return t.split(n).map((t=>l(t,r)))}}};function l(t,e){if(!e)return t;for(const n in p)if(p[n].check(e))return p[n].parse(t,e);return t}function d(t){return e=>l(e,t)}})),i.register("c04jy",(function(e,n){t(e.exports,"range",(()=>o)),t(e.exports,"it",(()=>h));var r=i("1CMLe");function*o(t,e,n=1){void 0===t&&(t=0),void 0===e&&(e=t,t=0),void 0===n&&(n=1);for(let r=t;r<e;r+=n)yield r}function s(t,e,n){let r=n,i=0;for(const n of t)r=e(r,n,i++);return r}function a(t){return Array.from(t)}function c(t){return function*(t,e){const n=t[Symbol.iterator](),r=e[Symbol.iterator]();for(;;){const{value:t,done:e}=n.next(),{value:i,done:o}=r.next();if(e||o)return;yield[t,i]}}(o(1/0),t)}function f(t,e){let n=0;for(const r of t){if(e(r))return n;n++}return-1}i("hyM6K");const h=t=>{const e={[Symbol.iterator]:()=>t[Symbol.iterator](),map:e=>h(function*(t,e){let n=0;for(const r of t)yield e(r,n),n+=1}(t,e)),groupsOf:e=>h(function*(t,e){let n=[];for(const r of t)n.push(r),n.length===e&&(yield n,n=[]);n.length>0&&(yield n)}(t,e)),toArray:()=>a(t),first:()=>function(t){for(const e of t)return e}(t),last:()=>function(t){let e;for(const n of t)e=n;return e}(t),find:e=>function(t,e){for(const n of t)if(e(n))return n}(t,e),skip:e=>h(function*(t,e){for(const n of t)0===e?yield n:e-=1}(t,e)),take:e=>h(function*(t,e){for(const n of t){if(0===e)return;yield n,e-=1}}(t,e)),toSet:()=>new Set(t),reduce:(e,n)=>s(t,e,n),forEach:e=>{for(const n of t)e(n)},filter:e=>h(function*(t,e){for(const n of t)e(n)&&(yield n)}(t,e)),count:e=>function(t,e=(()=>!0)){let n=0;for(const r of t)e(r)&&(n+=1);return n}(t,e),indexed:()=>h(c(t)),windowed:e=>h(function*(t,e){const n=[];for(const r of t)n.push(r),n.length===e&&(yield n,n.shift())}(t,e)),findIndex:e=>f(t,e),indexOf:e=>function(t,e){return f(t,(t=>t===e))}(t,e),flatMap:e=>h(function*(t,e){for(const n of t)yield*e(n)}(t,e)),skipLast:e=>h(function*(t,e=1){if(e<=0)return void(yield*t);const n=Array(e);let r=0;for(const i of t)r>=e&&(yield n[r%e]),n[r%e]=i,r++}(t,e)),takeEvery:(e,n)=>h(function*(t,e,n=0){if(!(e<=0)){n<0&&(n=0);for(const r of t)0===n&&(yield r,n=e),n--}}(t,e,n)),takeWhile:e=>h(function*(t,e){for(const n of t){if(!e(n))return;yield n}}(t,e)),takeUntil:e=>h(function*(t,e){for(const n of t){if(e(n))return;yield n}}(t,e)),every:e=>function(t,e){for(const n of t)if(!e(n))return!1;return!0}(t,e),updateAt:(e,n)=>h(function*(t,e,n){let r=0;for(const i of t)r===e?yield n(i):yield i,r++}(t,e,n)),unshift:(...e)=>h(function*(t,...e){yield*e,yield*t}(t,...e)),skipAfter:e=>h(function*(t,e){for(const n of t)if(yield n,e(n))return}(t,e)),distinct:e=>h(function*(t,e=(t=>t)){const n=new Set;for(const r of t){const t=e(r);n.has(t)||(n.add(t),yield r)}}(t,e)),multiply:()=>s(t,r.mul,1),sum:()=>s(t,r.add,0),min:()=>e.reduce(Math.min,1/0),max:()=>e.reduce(Math.max,-1/0),join:(e=",")=>a(t).join(e)};return e}})),i.register("72uML",(function(t,e){class n{constructor(t=((t,e)=>Number(t>e))){this._heap=[],this._comparator=t}[Symbol.iterator](){return{next:()=>this.size()>1?{value:this.pop(),done:!1}:{done:!0,value:this.pop()}}}get length(){return this.size()}size(){return this._heap.length}isEmpty(){return 0==this.size()}peek(){return this._heap[0]}push(...t){return t.forEach((t=>{this._heap.push(t),this._siftUp()})),this.size()}pop(){const t=this.peek(),e=this.size()-1;return e>0&&this._swap(0,e),this._heap.pop(),this._siftDown(),t}replace(t){const e=this.peek();return this._heap[0]=t,this._siftDown(),e}_greater(t,e){return this._comparator(this._heap[t],this._heap[e])<0}_swap(t,e){[this._heap[t],this._heap[e]]=[this._heap[e],this._heap[t]]}_siftUp(){let t=this.size()-1;for(;t>0&&this._greater(t,$520099a91db9fbc3$var$parent(t));)this._swap(t,$520099a91db9fbc3$var$parent(t)),$520099a91db9fbc3$var$parent(t)}_siftDown(){let t=0;for(;$520099a91db9fbc3$var$left(t)<this.size()&&this._greater($520099a91db9fbc3$var$left(t),t)||$520099a91db9fbc3$var$right(t)<this.size()&&this._greater($520099a91db9fbc3$var$right(t),t);){let e=$520099a91db9fbc3$var$right(t)<this.size()&&this._greater($520099a91db9fbc3$var$right(t),$520099a91db9fbc3$var$left(t))?$520099a91db9fbc3$var$right(t):$520099a91db9fbc3$var$left(t);this._swap(t,e),e}}}})),i.register("jOfNW",(function(e,n){t(e.exports,"Map2d",(()=>o));var r=i("hyM6K");class o{static fromArray(t){const e=new o;return t.forEach(((t,n)=>{t.forEach(((t,i)=>{e.set(r.vec(i,n),t)}))})),e}#t=t=>r.DIRS_4.map((e=>r.add(t,e))).filter((t=>this.hasPos(t)));#e=new Map;#n=1/0;#r=1/0;#i=-1/0;#o=-1/0;#s=!1;get bounds(){return this.#s&&this.#a(),{minX:this.#n,minY:this.#r,maxX:this.#i,maxY:this.#o,botRight:r.vec(this.#i,this.#o),topLeft:r.vec(this.#n,this.#r)}}get height(){return this.#o-this.#r+1}get width(){return this.#i-this.#n+1}constructor(t=[]){for(const[e,n]of t)this.set(e,n)}#a(){this.#e.forEach(((t,e)=>{t.forEach(((t,n)=>{this.#c(n,e)}))})),this.#s=!1}#c(t,e){this.#n=Math.min(this.#n,t),this.#r=Math.min(this.#r,e),this.#i=Math.max(this.#i,t),this.#o=Math.max(this.#o,e)}get([t,e]){return this.#e.get(t)?.get(e)}set([t,e],n){return!1===this.#e.has(t)&&this.#e.set(t,new Map),this.#e.get(t).set(e,n),this.#c(t,e),this}hasPos([t,e]){return!0===this.#e.get(t)?.has(e)}map(t){const e=new o;for(const{pos:n,value:r}of this)e.set(n,t(r,n));return e}bfs(t,e){return function*(t,e,n,i){const o=[];if(r.isVec(n))o.push({distance:0,pos:n,value:t.get(n),parent:null});else for(const e of n)o.push({distance:0,pos:e,value:t.get(e),parent:null});const s=new Set;for(;o.length;){const n=o.shift(),r=n.pos.join();if(!s.has(r)){s.add(r),yield n;for(const r of i(n.pos)){const i={distance:n.distance+1,pos:r,value:t.get(r),parent:n};e(n,i)&&o.push(i)}}}}(this,t,e,this.#t)}setGetNeighbors(t){return this.#t=t,this}[Symbol.iterator](){return function*(t){for(const e of t.keys())for(const n of t.get(e).keys())yield{pos:r.vec(e,n),value:t.get(e).get(n)}}(this.#e)}to2dArray({topLeftPos:t=r.vec(this.#n,this.#r),botRightPos:e=r.vec(this.#i,this.#o),valToString:n}){const[i,o]=t,[s,a]=e,c=[];for(let t=o;t<=a;t++){const e=[];for(let r=i;r<=s;r++){const i=this.get([r,t]);e.push(n(i))}c.push(e)}return c}toString({topLeftPos:t=r.vec(this.#n,this.#r),botRightPos:e=r.vec(this.#i,this.#o),valToString:n=(t=>(t??".").toString())}={}){return this.to2dArray({topLeftPos:t,botRightPos:e,valToString:n}).map((t=>t.join(""))).join("\n")}}})),i.register("7zFg5",(function(e,n){function r(t,e,n,r){const i=r??window.devicePixelRatio??1;return t.canvas.width=e*i,t.canvas.height=n*i,t.canvas.style.width=`${e}px`,t.canvas.style.height=`${n}px`,t.scale(i,i),i}t(e.exports,"scaleCanvasToPixelRatio",(()=>r))}));
//# sourceMappingURL=index.7da56099.js.map
