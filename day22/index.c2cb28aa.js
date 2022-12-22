// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"c5yyW":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "de07cd46c2cb28aa";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"7g93n":[function(require,module,exports) {
// @ts-check
var _common = require("../common");
var _modules = require("../../../js/modules");
var _itertools = require("../../../js/modules/itertools");
var _22 = require("../../../js/solutions/22");
const canvas = document.getElementById("canvas");
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("no canvas");
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("no ctx");
const WIDTH = 200;
const HEIGHT = 200;
const SIZE = 3;
(0, _common.scaleCanvasToPixelRatio)(ctx, WIDTH * SIZE, HEIGHT * SIZE);
const inputForm = document.getElementById("input-form");
if (!(inputForm instanceof HTMLFormElement)) throw new Error("no form");
const nextButton = document.getElementById("next");
inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const input = formData.get("input")?.toString() ?? "";
    draw(input.trimEnd(), ctx);
});
const colors = {
    ".": "white",
    "#": "orange"
};
const dirToChar = {
    D: "↑",
    U: "↓",
    L: "←",
    R: "→"
};
let rafHandle = 0;
/**
 * @param {string} input
 * @param {CanvasRenderingContext2D} ctx
 */ function draw(input, ctx) {
    ctx.canvas.scrollIntoView({
        behavior: "smooth"
    });
    const { map , moves , start , sideSize  } = (0, _22.parseInput)(input);
    const connections = (0, _22.getConnectionsOnCube)(sideSize);
    const iter = (0, _22.traverseMap)(map, moves, connections, start, true);
    if (!nextButton) throw new Error("no next button");
    nextButton.onclick = ()=>{
        const result = iter.next();
        if (result.done) return;
        const { dir , pos , move  } = result.value;
        console.log({
            pos
        });
        drawPos(pos, dir);
        // @ts-ignore
        document.getElementById("status").innerText = `Move: ${move}, Dir: ${dirToChar[dir]}`;
    };
    nextButton.removeAttribute("disabled");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH * SIZE, HEIGHT * SIZE);
    function drawPos(pos, dir) {
        ctx.fillStyle = "red";
        ctx.fillRect(pos[0] * SIZE, pos[1] * SIZE, SIZE, SIZE);
    }
    function drawInitState() {
        for (const p of map){
            ctx.fillStyle = colors[p.value] ?? "white";
            ctx.fillRect(p.pos[0] * SIZE, p.pos[1] * SIZE, SIZE, SIZE);
        }
        drawPos(start, "R");
    }
    drawInitState();
    function drawLoop() {
        const result = iter.next();
        if (result.done) return;
        const { dir , pos , move  } = result.value;
        drawPos(pos, dir);
        // @ts-ignore
        document.getElementById("status").innerText = `Move: ${move}, Dir: ${dirToChar[dir]}`;
        rafHandle = requestAnimationFrame(drawLoop);
    }
    drawLoop();
}

},{"../common":"8wzUn","../../../js/modules":"eVlez","../../../js/modules/itertools":"aDL7D","../../../js/solutions/22":"gj9xW"}],"gj9xW":[function(require,module,exports) {
// @ts-check
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useExample", ()=>useExample);
parcelHelpers.export(exports, "exampleInput", ()=>exampleInput);
parcelHelpers.export(exports, "parseInput", ()=>parseInput);
/**
 *
 * @param {Map2d<string>} map
 * @param {string[]} moves
 * @param {Map2d<Record<V.Dir, V.Vec2>>} connections
 * @param {V.Vec2} start
 */ parcelHelpers.export(exports, "traverseMap", ()=>traverseMap);
/**
 * @param {InputType} input
 */ parcelHelpers.export(exports, "part1", ()=>part1);
/**
 * @param {number} sideSize
 */ parcelHelpers.export(exports, "getConnectionsOnCube", ()=>getConnectionsOnCube);
/**
 * @param {InputType} input
 */ parcelHelpers.export(exports, "part2", ()=>part2);
var _indexJs = require("../modules/index.js");
var _itertoolsJs = require("../modules/itertools.js");
var _libJs = require("../modules/lib.js");
var _map2DJs = require("../modules/map2d.js");
var _vecJs = require("../modules/vec.js");
/** @type {import('../modules/types.js').SolutionModuleValid<typeof import('./22.js')>} */ const __MODULE_VALID__ = true;
const useExample = false;
const exampleInput = `\
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;
const parseInput = (/** @type {string} */ input)=>{
    const [mapStr, movesStr] = (0, _libJs.readBlocks)(input);
    const lines = (0, _libJs.readLines)(mapStr);
    let sideSize = Infinity;
    for (const line of lines){
        const trimmed = line.trim();
        const width = line.length - trimmed.length;
        if (width === 0) continue;
        sideSize = Math.min(sideSize, width);
    }
    /** @type {Map2d<string>} */ const map = new (0, _map2DJs.Map2d)();
    for(let y = 0; y < lines.length; y++){
        for(let x = 0; x < lines[y].length; x++)if (lines[y][x] !== " ") map.set((0, _indexJs.V).vec(x, y), lines[y][x]);
    }
    const start = (0, _itertoolsJs.it)(map).filter((x)=>x.value === ".").toArray().sort((a, b)=>a.pos[1] - b.pos[1] || a.pos[0] - b.pos[0])[0].pos;
    /** @type {string[]} */ const moves = [];
    let cur = "";
    for (let c of movesStr)if (c === "L" || c === "R") {
        if (cur) moves.push(cur, c);
        cur = "";
    } else cur += c;
    moves.push(cur);
    return {
        map,
        start,
        moves,
        sideSize
    };
};
/**
 *
 * @param {Map2d<string>} map
 */ function getConnectionsOnPlane(map) {
    /** @type {Map2d<Record<V.Dir, V.Vec2>>} */ const connections = new (0, _map2DJs.Map2d)();
    for (const { pos  } of map){
        const connection = /** @type {Record<V.Dir, V.Vec2>} */ {};
        const up = map.get((0, _indexJs.V).add(pos, (0, _vecJs.DIR_TO_VEC).U));
        if (up == null) {
            const nextPos = (0, _itertoolsJs.it)(map).filter((x)=>(0, _indexJs.V).x(x.pos) === (0, _indexJs.V).x(pos)).toArray().sort((a, b)=>(0, _indexJs.V).y(a.pos) - (0, _indexJs.V).y(b.pos))[0];
            connection.U = nextPos.pos;
        }
        const down = map.get((0, _indexJs.V).add(pos, (0, _vecJs.DIR_TO_VEC).D));
        if (down == null) {
            const nextPos1 = (0, _itertoolsJs.it)(map).filter((x)=>(0, _indexJs.V).x(x.pos) === (0, _indexJs.V).x(pos)).toArray().sort((a, b)=>(0, _indexJs.V).y(b.pos) - (0, _indexJs.V).y(a.pos))[0];
            connection.D = nextPos1.pos;
        }
        const left = map.get((0, _indexJs.V).add(pos, (0, _vecJs.DIR_TO_VEC).L));
        if (left == null) {
            const nextPos2 = (0, _itertoolsJs.it)(map).filter((x)=>(0, _indexJs.V).y(x.pos) === (0, _indexJs.V).y(pos)).toArray().sort((a, b)=>(0, _indexJs.V).x(b.pos) - (0, _indexJs.V).x(a.pos))[0];
            connection.L = nextPos2.pos;
        }
        const right = map.get((0, _indexJs.V).add(pos, (0, _vecJs.DIR_TO_VEC).R));
        if (right == null) {
            const nextPos3 = (0, _itertoolsJs.it)(map).filter((x)=>(0, _indexJs.V).y(x.pos) === (0, _indexJs.V).y(pos)).toArray().sort((a, b)=>(0, _indexJs.V).x(a.pos) - (0, _indexJs.V).x(b.pos))[0];
            connection.R = nextPos3.pos;
        }
        connections.set(pos, connection);
    }
    return connections;
}
const DIRS = [
    (0, _vecJs.asDir)("D"),
    (0, _vecJs.asDir)("R"),
    (0, _vecJs.asDir)("U"),
    (0, _vecJs.asDir)("L")
];
const scores = {
    [(0, _vecJs.asDir)("R")]: 0,
    [(0, _vecJs.asDir)("D")]: 1,
    [(0, _vecJs.asDir)("L")]: 2,
    [(0, _vecJs.asDir)("U")]: 3
};
function* traverseMap(map, moves, connections, start, onCube = false) {
    let pos = start;
    let dirIdx = 1;
    const visited = new (0, _map2DJs.Map2d)();
    /**
   * @param {V.Vec2} pos
   * @param {V.Dir} dir
   */ function stepFromPosInDir(pos, dir) {
        let nextPos = (0, _indexJs.V).add(pos, (0, _vecJs.DIR_TO_VEC)[dir]);
        const value = map.get(nextPos);
        if (value === ".") {
            pos = nextPos;
            visited.set(pos, dir);
            return {
                pos,
                ok: true,
                dir
            };
        }
        if (value === "#") return {
            pos,
            ok: false,
            dir
        };
        const connection = connections.get(pos);
        if (connection == null) throw new Error("no connection at pos " + pos.join(",") + " dir " + dir);
        if (connection[dir] == null) throw new Error("Connection at pos " + pos.join(",") + " dir " + dir + " is null");
        if (map.get(connection[dir]) === "#") return {
            pos,
            ok: false,
            dir
        };
        nextPos = connection[dir];
        if (onCube) {
            if (dir === "L" && (0, _indexJs.V).x(pos) === 50 && (0, _indexJs.V).y(pos) < 50) dir = "R" // from face 1 left to face 5, continue to move right
            ;
            else if (dir === "L" && (0, _indexJs.V).x(pos) === 50) dir = "U" // from face 3 left to face 5, continue to move up
            ;
            else if (dir === "L" && (0, _indexJs.V).x(pos) === 0 && (0, _indexJs.V).y(pos) < 150) dir = "R" // from face 5 left to face 1, continue to move right
            ;
            else if (dir === "L" && (0, _indexJs.V).x(pos) === 0) dir = "U" // from face 6 left to face 1, continue to move up
            ;
            else if (dir === "U" && (0, _indexJs.V).y(pos) === 149) dir = "L" // from face 4 up to face 6, continue to move left
            ;
            else if (dir === "U" && (0, _indexJs.V).y(pos) === 49) dir = "L" // from face 2 up to face 3, continue to move left
            ;
            else if (dir === "U" && (0, _indexJs.V).y(pos) === 199) dir = "U" // from face 6 up to face 2, continue to move up
            ;
            else if (dir === "D" && (0, _indexJs.V).y(pos) === 0 && (0, _indexJs.V).x(pos) < 100) dir = "R" // from face 1 down to face 6, continue to move right
            ;
            else if (dir === "D" && (0, _indexJs.V).y(pos) === 0) dir = "D" // from face 2 down to face 6, continue to move down
            ;
            else if (dir === "D" && (0, _indexJs.V).y(pos) === 100) dir = "R" // from face 5 down to face 3, continue to move right
            ;
            else if (dir === "R" && (0, _indexJs.V).x(pos) === 149) dir = "L" // from face 2 right to face 4, continue to move left
            ;
            else if (dir === "R" && (0, _indexJs.V).x(pos) === 99 && (0, _indexJs.V).y(pos) < 100) dir = "D" // from face 3 right to face 2, continue to move down
            ;
            else if (dir === "R" && (0, _indexJs.V).x(pos) === 99) dir = "L" // from face 4 right to face 2, continue to move left
            ;
            else if (dir === "R" && (0, _indexJs.V).x(pos) === 49) dir = "D" // from face 6 right to face 4, continue to move down
            ;
        }
        visited.set(pos, dir);
        return {
            pos: nextPos,
            ok: true,
            dir
        };
    }
    /**
   *
   * @param {V.Dir} prevDir
   * @param {V.Vec2} prevPos
   * @param {V.Dir} nextDir
   * @param {V.Vec2} nextPos
   */ function assertPlaneSwitch(prevDir, prevPos, nextDir, nextPos) {
        /** @type {Partial<Record<V.Dir, V.Dir>>} */ const counterDirs = {
            U: "D",
            D: "U",
            L: "R",
            R: "L"
        };
        const result = stepFromPosInDir(nextPos, counterDirs[nextDir]);
        if (!result.ok) throw new Error("Plane switch failed. Expected to go back to " + nextPos);
        if (result.pos.join(",") !== prevPos.join(",")) throw new Error(`Plane switch from ${prevDir} at ${prevPos.join(",")} to ${nextDir} at ${nextPos.join(",")} failed. Expected to go back to ${prevPos.join(",")} but got ${result.pos.join(",")}`);
    }
    for (const move of moves){
        const num = Number(move);
        if (isNaN(num)) {
            dirIdx += move === "L" ? -1 : 1;
            dirIdx = (dirIdx + 4) % 4;
            yield {
                pos,
                dir: DIRS[dirIdx],
                visited,
                move
            };
            continue;
        }
        let dir = DIRS[dirIdx];
        for(let i = 0; i < num; i++){
            const result = stepFromPosInDir(pos, dir);
            if (!result.ok) break;
            assertPlaneSwitch(dir, pos, result.dir, result.pos);
            pos = result.pos;
            dir = result.dir;
            dirIdx = DIRS.indexOf(dir);
            yield {
                pos,
                dir,
                visited,
                move
            };
        }
    }
}
function part1({ map , moves , start  }) {
    const connections = getConnectionsOnPlane(map);
    let { pos , dir  } = (0, _itertoolsJs.it)(traverseMap(map, moves, connections, start)).last();
    pos = (0, _indexJs.V).add(pos, (0, _indexJs.V).vec(1, 1));
    return (0, _indexJs.V).y(pos) * 1000 + (0, _indexJs.V).x(pos) * 4 + scores[dir];
}
function getConnectionsOnCube(sideSize) {
    /** @type {Map2d<Record<V.Dir, V.Vec2>>} */ const connections = new (0, _map2DJs.Map2d)();
    // face 1 top
    // face 6 left
    for (const d of (0, _itertoolsJs.range)(sideSize)){
        const pos1 = (0, _indexJs.V).vec(sideSize + d, 0);
        const connection1 = connections.get(pos1) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        const pos6 = (0, _indexJs.V).vec(0, sideSize * 3 + d);
        const connection6 = connections.get(pos6) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        connection1.D = pos6;
        connection6.L = pos1;
        connections.set(pos1, connection1);
        connections.set(pos6, connection6);
    }
    // face 2 top
    // face 6 bottom
    for (const d1 of (0, _itertoolsJs.range)(sideSize)){
        const pos2 = (0, _indexJs.V).vec(sideSize * 2 + d1, 0);
        const connection2 = connections.get(pos2) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        const pos61 = (0, _indexJs.V).vec(d1, sideSize * 4 - 1);
        const connection61 = connections.get(pos61) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        connection2.D = pos61;
        connection61.U = pos2;
        connections.set(pos2, connection2);
        connections.set(pos61, connection61);
    }
    // face 2 right
    // face 4 right
    for (const d2 of (0, _itertoolsJs.range)(sideSize)){
        const pos21 = (0, _indexJs.V).vec(sideSize * 3 - 1, d2);
        const connection21 = connections.get(pos21) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        const pos4 = (0, _indexJs.V).vec(sideSize * 2 - 1, sideSize * 3 - d2 - 1);
        const connection4 = connections.get(pos4) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        connection21.R = pos4;
        connection4.R = pos21;
        connections.set(pos21, connection21);
        connections.set(pos4, connection4);
    }
    // face 2 bottom
    // face 3 right
    for (const d3 of (0, _itertoolsJs.range)(sideSize)){
        const pos22 = (0, _indexJs.V).vec(sideSize * 2 + d3, sideSize - 1);
        const connection22 = connections.get(pos22) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        const pos3 = (0, _indexJs.V).vec(sideSize * 2 - 1, sideSize + d3);
        const connection3 = connections.get(pos3) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        connection22.U = pos3;
        connection3.R = pos22;
        connections.set(pos22, connection22);
        connections.set(pos3, connection3);
    }
    // face 4 bottom
    // face 6 right
    for (const d4 of (0, _itertoolsJs.range)(sideSize)){
        const pos41 = (0, _indexJs.V).vec(sideSize + d4, sideSize * 3 - 1);
        const pos62 = (0, _indexJs.V).vec(sideSize - 1, sideSize * 3 + d4);
        const connection41 = connections.get(pos41) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        const connection62 = connections.get(pos62) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        connection41.U = pos62;
        connection62.R = pos41;
        connections.set(pos41, connection41);
        connections.set(pos62, connection62);
    }
    // face 5 left
    // face 1 left
    for (const d5 of (0, _itertoolsJs.range)(sideSize)){
        const pos5 = (0, _indexJs.V).vec(0, sideSize * 2 + d5);
        const pos11 = (0, _indexJs.V).vec(sideSize, sideSize - d5 - 1);
        const connection5 = connections.get(pos5) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        const connection11 = connections.get(pos11) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        connection5.L = pos11;
        connection11.L = pos5;
        connections.set(pos5, connection5);
        connections.set(pos11, connection11);
    }
    // face 5 top
    // face 3 left
    for (const d6 of (0, _itertoolsJs.range)(sideSize)){
        const pos51 = (0, _indexJs.V).vec(d6, sideSize * 2);
        const pos31 = (0, _indexJs.V).vec(sideSize, sideSize + d6);
        const connection51 = connections.get(pos51) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        const connection31 = connections.get(pos31) ?? /** @type {Record<V.Dir, V.Vec2>} */ {};
        connection51.D = pos31;
        connection31.L = pos51;
        connections.set(pos51, connection51);
        connections.set(pos31, connection31);
    }
    return connections;
}
function part2({ map , moves , start , sideSize  }) {
    const connections = getConnectionsOnCube(sideSize);
    let { pos , dir  } = (0, _itertoolsJs.it)(traverseMap(map, moves, connections, start, true)).last();
    pos = (0, _indexJs.V).add(pos, (0, _indexJs.V).vec(1, 1));
    return (0, _indexJs.V).y(pos) * 1000 + (0, _indexJs.V).x(pos) * 4 + scores[dir];
}

},{"../modules/index.js":"eVlez","../modules/itertools.js":"aDL7D","../modules/lib.js":"7Ap0m","../modules/map2d.js":"kAYVe","../modules/vec.js":"2oi5s","@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}]},["c5yyW","7g93n"], "7g93n", "parcelRequiree764")

//# sourceMappingURL=index.c2cb28aa.js.map
