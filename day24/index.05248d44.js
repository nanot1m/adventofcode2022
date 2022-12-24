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
})({"4HJcs":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "8bd72fc705248d44";
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

},{}],"eVlez":[function(require,module,exports) {
// @ts-check
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PriorityQueue", ()=>(0, _priorityQueueJs.PriorityQueue));
parcelHelpers.export(exports, "V", ()=>_vecJs);
parcelHelpers.export(exports, "V3", ()=>_vec3Js);
parcelHelpers.export(exports, "Lib", ()=>_libJs);
parcelHelpers.export(exports, "Itertools", ()=>_itertoolsJs);
var _vecJs = require("./vec.js");
var _vec3Js = require("./vec3.js");
var _libJs = require("./lib.js");
var _itertoolsJs = require("./itertools.js");
var _priorityQueueJs = require("./priority-queue.js");

},{"./vec.js":"2oi5s","./vec3.js":"iYeMz","./lib.js":"7Ap0m","./itertools.js":"aDL7D","./priority-queue.js":"girLu","@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"2oi5s":[function(require,module,exports) {
// @ts-check
/**
 * @typedef {[x: number, y: number]} Vec2
 */ /**
 * @typedef {"U" | "R"| "D" | "L" | "UR" | "UL"} Dir
 */ /**
 * @param {number} x
 * @param {number} y
 * @returns {Vec2}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "vec", ()=>vec);
parcelHelpers.export(exports, "DIR_TO_VEC", ()=>DIR_TO_VEC);
parcelHelpers.export(exports, "DIRS_4", ()=>DIRS_4);
parcelHelpers.export(exports, "DIRS_3_TOP", ()=>DIRS_3_TOP);
parcelHelpers.export(exports, "DIRS_8", ()=>DIRS_8);
parcelHelpers.export(exports, "asDir", ()=>asDir);
parcelHelpers.export(exports, "signed", ()=>signed);
parcelHelpers.export(exports, "add", ()=>add);
parcelHelpers.export(exports, "sub", ()=>sub);
parcelHelpers.export(exports, "fromDir", ()=>fromDir);
parcelHelpers.export(exports, "zero", ()=>zero);
parcelHelpers.export(exports, "x", ()=>x);
parcelHelpers.export(exports, "y", ()=>y);
parcelHelpers.export(exports, "isVec", ()=>isVec);
parcelHelpers.export(exports, "eq", ()=>eq);
parcelHelpers.export(exports, "min", ()=>min);
parcelHelpers.export(exports, "max", ()=>max);
/**
 * @param {Vec2} start
 * @param {Vec2} end
 */ parcelHelpers.export(exports, "segment", ()=>segment);
parcelHelpers.export(exports, "ZERO", ()=>ZERO);
parcelHelpers.export(exports, "cLen", ()=>cLen);
parcelHelpers.export(exports, "mLen", ()=>mLen);
parcelHelpers.export(exports, "inRange", ()=>inRange);
const vec = (x, y)=>[
        x,
        y
    ];
const DIR_TO_VEC = {
    U: [
        0,
        1
    ],
    R: [
        1,
        0
    ],
    D: [
        0,
        -1
    ],
    L: [
        -1,
        0
    ],
    UR: [
        1,
        1
    ],
    UL: [
        -1,
        1
    ]
};
const DIRS_4 = [
    DIR_TO_VEC.U,
    DIR_TO_VEC.R,
    DIR_TO_VEC.D,
    DIR_TO_VEC.L
];
const DIRS_3_TOP = [
    DIR_TO_VEC.UL,
    DIR_TO_VEC.U,
    DIR_TO_VEC.UR
];
const DIRS_8 = [
    vec(-1, -1),
    vec(0, -1),
    vec(1, -1),
    vec(-1, 0),
    vec(1, 0),
    vec(-1, 1),
    vec(0, 1),
    vec(1, 1)
];
const asDir = (dir)=>{
    if (dir in DIR_TO_VEC) return /** @type {Dir} */ dir;
    throw new Error(`Invalid direction: ${dir}`);
};
const signed = ([x, y])=>[
        Math.sign(x),
        Math.sign(y)
    ];
const add = ([x1, y1], [x2, y2])=>[
        x1 + x2,
        y1 + y2
    ];
const sub = ([x1, y1], [x2, y2])=>[
        x1 - x2,
        y1 - y2
    ];
const fromDir = (dir)=>DIR_TO_VEC[dir];
const zero = ()=>[
        0,
        0
    ];
const x = (vec)=>vec[0];
const y = (vec)=>vec[1];
const isVec = (arg)=>Array.isArray(arg) && arg.length === 2 && typeof arg[0] === "number" && typeof arg[1] === "number";
const eq = (vecA, vecB)=>vecA[0] === vecB[0] && vecA[1] === vecB[1];
const min = (vecA, vecB)=>[
        Math.min(vecA[0], vecB[0]),
        Math.min(vecA[1], vecB[1])
    ];
const max = (vecA, vecB)=>[
        Math.max(vecA[0], vecB[0]),
        Math.max(vecA[1], vecB[1])
    ];
function* segment(start, end) {
    const delta = sub(end, start);
    const dir = signed(delta);
    const steps = cLen(start, end);
    let pos = start;
    yield pos;
    for(let i = 0; i < steps; i++){
        pos = add(pos, dir);
        yield pos;
    }
}
const ZERO = zero();
const cLen = (vecA, vecB = zero())=>Math.max(Math.abs(vecA[0] - vecB[0]), Math.abs(vecA[1] - vecB[1]));
const mLen = (vecA, vecB = zero())=>Math.abs(vecA[0] - vecB[0]) + Math.abs(vecA[1] - vecB[1]);
const inRange = (vec, min, max)=>vec[0] >= min[0] && vec[0] <= max[0] && vec[1] >= min[1] && vec[1] <= max[1];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"5gDop":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"iYeMz":[function(require,module,exports) {
// @ts-check
/**
 * @typedef {[x: number, y: number, z: number]} Vec3
 */ /**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {Vec3}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "vec3", ()=>vec3);
parcelHelpers.export(exports, "x", ()=>x);
parcelHelpers.export(exports, "y", ()=>y);
parcelHelpers.export(exports, "z", ()=>z);
parcelHelpers.export(exports, "zero3", ()=>zero3);
parcelHelpers.export(exports, "add", ()=>add);
parcelHelpers.export(exports, "rot", ()=>rot);
parcelHelpers.export(exports, "min", ()=>min);
parcelHelpers.export(exports, "max", ()=>max);
parcelHelpers.export(exports, "mLen", ()=>mLen);
const vec3 = (x, y, z)=>[
        x,
        y,
        z
    ];
const x = (vec)=>vec[0];
const y = (vec)=>vec[1];
const z = (vec)=>vec[2];
const zero3 = ()=>[
        0,
        0,
        0
    ];
const add = (vecA, vecB)=>[
        vecA[0] + vecB[0],
        vecA[1] + vecB[1],
        vecA[2] + vecB[2]
    ];
const rot = (vec, rot)=>{
    const [x, y, z] = vec;
    const [xRot, yRot, zRot] = rot;
    return [
        x * xRot[0] + y * xRot[1] + z * xRot[2],
        x * yRot[0] + y * yRot[1] + z * yRot[2],
        x * zRot[0] + y * zRot[1] + z * zRot[2]
    ];
};
const min = (vecA, vecB)=>[
        Math.min(vecA[0], vecB[0]),
        Math.min(vecA[1], vecB[1]),
        Math.min(vecA[2], vecB[2])
    ];
const max = (vecA, vecB)=>[
        Math.max(vecA[0], vecB[0]),
        Math.max(vecA[1], vecB[1]),
        Math.max(vecA[2], vecB[2])
    ];
const mLen = (vecA, vecB = zero3())=>Math.abs(vecA[0] - vecB[0]) + Math.abs(vecA[1] - vecB[1]) + Math.abs(vecA[2] - vecB[2]);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"7Ap0m":[function(require,module,exports) {
// @ts-check
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @param {T} x
 * @returns {T}
 * @template T
 */ parcelHelpers.export(exports, "id", ()=>id);
/**
 * @param {T[]} xs
 * @param {(arg: T) => string | number} fn
 *
 * @template T
 */ parcelHelpers.export(exports, "minBy", ()=>minBy);
/**
 * @param {T[]} xs
 * @param {(arg: T) => string | number} fn
 *
 * @template T
 */ parcelHelpers.export(exports, "maxBy", ()=>maxBy);
/**
 * @param {number[]} xs
 */ parcelHelpers.export(exports, "min", ()=>min);
/**
 * @param {number[]} xs
 */ parcelHelpers.export(exports, "max", ()=>max);
/**
 *
 * @param {T[]} xs
 * @param {T[][]} yss
 * @returns {T[][]}
 *
 * @template T
 */ parcelHelpers.export(exports, "zip", ()=>zip);
/**
 * @param {string} input
 */ parcelHelpers.export(exports, "readLines", ()=>readLines);
/**
 * @param {string} input
 */ parcelHelpers.export(exports, "readBlocks", ()=>readBlocks);
/**
 * @param {string} input
 * @returns
 */ parcelHelpers.export(exports, "readIntLines", ()=>readIntLines);
/**
 * @param {string} input
 * @param {string} [separator]
 */ parcelHelpers.export(exports, "readIntArr", ()=>readIntArr);
/**
 *
 * @param {T} value
 * @template T
 */ parcelHelpers.export(exports, "functor", ()=>functor);
/**
 * @param {T[]} xs
 * @param {number} n
 * @template T
 */ parcelHelpers.export(exports, "cycle", ()=>cycle);
/**
 * @param {T[]} xs
 * @param {number} n
 * @template T
 */ parcelHelpers.export(exports, "at", ()=>at);
/**
 * @param {number} a
 * @param {number} b
 * @returns
 */ parcelHelpers.export(exports, "add", ()=>add);
/**
 * @param {number} a
 * @param {number} b
 * @returns
 */ parcelHelpers.export(exports, "mul", ()=>mul);
/**
 *
 * @param {number[][]} m1
 * @param {number[][]} m2
 */ parcelHelpers.export(exports, "mulMatrix", ()=>mulMatrix);
/**
 *  @param {number[][]} mat1
 * @param  {...number[][]} mats
 */ parcelHelpers.export(exports, "mulMatrices", ()=>mulMatrices);
/**
 * @param {number} a
 * @param {number} b
 * @returns
 */ parcelHelpers.export(exports, "compareAsc", ()=>compareAsc);
/**
 * @param {number} a
 * @param {number} b
 * @returns
 */ parcelHelpers.export(exports, "compareDesc", ()=>compareDesc);
/**
 *
 * @param {T[]} xs
 * @param {number} i
 * @param {(arg: T) => T} fn
 *
 * @template T
 */ parcelHelpers.export(exports, "update", ()=>update);
/**
 * @param {number} x
 */ parcelHelpers.export(exports, "inc", ()=>inc);
/**
 * @param {T} xs
 * @param {number} n
 * @returns {[T, T]}
 *
 * @template {{slice(start: number, end?: number): T}} T
 */ parcelHelpers.export(exports, "splitAt", ()=>splitAt);
/**
 *
 * @param {T[][]} arr
 * @param {boolean} clockwise
 * @returns {T[][]}
 *
 * @template T
 */ parcelHelpers.export(exports, "rotate2d", ()=>rotate2d);
/**
 *
 * @param {string[]} strings
 * @param {boolean} clockwise
 */ parcelHelpers.export(exports, "rotateStrings2d", ()=>rotateStrings2d);
/**
 *
 * @param {string} str
 * @param {boolean} [clockwise]
 *
 * @returns {string}
 */ parcelHelpers.export(exports, "rotateString2d", ()=>rotateString2d);
/**
 *
 * @param  {T} args
 * @returns {T}
 *
 * @template {unknown[]} T
 */ parcelHelpers.export(exports, "tuple", ()=>tuple);
parcelHelpers.export(exports, "rotate", ()=>rotate);
/**
 * @param {string} strVal
 */ parcelHelpers.export(exports, "tryGetSeparator", ()=>tryGetSeparator);
/**
 * @param {T} type
 * @returns {(strVal: string) => import("./types.js").TemplateValueReturnType<T>}
 *
 * @template {string} T
 */ parcelHelpers.export(exports, "typed", ()=>typed);
/**
 * @param {TemplateStringsArray} strings
 * @param  {T} keys
 *
 * @template {string[]} T
 */ parcelHelpers.export(exports, "tpl", ()=>tpl);
var _indexJs = require("./index.js");
var _itertoolsJs = require("./itertools.js");
var _vec3Js = require("./vec3.js");
function id(x) {
    return x;
}
function minBy(xs, fn) {
    return xs.reduce((a, b)=>fn(a) < fn(b) ? a : b);
}
function maxBy(xs, fn) {
    return xs.reduce((a, b)=>fn(a) > fn(b) ? a : b);
}
function min(xs) {
    return minBy(xs, id);
}
function max(xs) {
    return maxBy(xs, id);
}
function zip(xs, ...yss) {
    const minLength = minBy(yss, (ys)=>ys.length).length;
    return xs.slice(0, minLength).map((val, i)=>yss.reduce((a, arr)=>{
            a.push(arr[i]);
            return a;
        }, [
            val
        ]));
}
function readLines(input) {
    return input.split("\n");
}
function readBlocks(input) {
    return input.split("\n\n");
}
function readIntLines(input) {
    return readLines(input).map(Number);
}
function readIntArr(input, separator = ",") {
    return input.split(separator).map(Number);
}
function functor(value) {
    return {
        /**
     *
     * @param {(arg: T) => R} fn
     * @template R
     */ map (fn) {
            return functor(fn(value));
        },
        get () {
            return value;
        }
    };
}
function cycle(xs, n) {
    return xs.slice(n).concat(xs.slice(0, n));
}
function at(xs, n) {
    if (n < 0) n = xs.length + n;
    return xs[n];
}
function add(a, b) {
    return a + b;
}
function mul(a, b) {
    return a * b;
}
function mulMatrix(m1, m2) {
    /** @type {number[][]} */ const result = [];
    for(let i = 0; i < m1.length; i++){
        result[i] = [];
        for(let j = 0; j < m2[0].length; j++){
            let sum = 0;
            for(let k = 0; k < m1[0].length; k++)sum += m1[i][k] * m2[k][j];
            result[i][j] = sum;
        }
    }
    return result;
}
function mulMatrices(mat1, ...mats) {
    return mats.reduce(mulMatrix, mat1);
}
function compareAsc(a, b) {
    return a - b;
}
function compareDesc(a, b) {
    return b - a;
}
function update(xs, i, fn) {
    return xs.slice(0, i).concat(fn(xs[i])).concat(xs.slice(i + 1));
}
function inc(x) {
    return x + 1;
}
function splitAt(xs, n) {
    return [
        xs.slice(0, n),
        xs.slice(n)
    ];
}
function rotate2d(arr, clockwise = true) {
    const height = arr.length;
    const width = (0, _itertoolsJs.it)(arr).map((line)=>line.length).max();
    const rotated = Array.from({
        length: width
    }, ()=>Array.from({
            length: height
        }));
    for(let y = 0; y < height; y++)for(let x = 0; x < width; x++){
        const value = arr[y]?.[x];
        const [i, j] = clockwise ? [
            x,
            height - y - 1
        ] : [
            width - x - 1,
            y
        ];
        rotated[i][j] = value;
    }
    return rotated;
}
function rotateStrings2d(strings, clockwise = true) {
    const rotated = rotate2d(strings.map((str)=>str.split("")), clockwise);
    return rotated.map((line)=>line.map((x)=>x ?? " ").join("").trimEnd());
}
function rotateString2d(str, clockwise = true) {
    return rotateStrings2d(str.split("\n"), clockwise).join("\n");
}
function tuple(...args) {
    return args;
}
const rotate = (/** @type {string | string[] | T[][]} */ rotatable, clockwise = true)=>{
    if (typeof rotatable === "string") return rotateString2d(rotatable, clockwise);
    if (typeof rotatable[0] === "string") return rotateStrings2d(/** @type {string[]} */ rotatable, clockwise);
    return rotate2d(/** @type {T[][]} */ rotatable, clockwise);
};
function tryGetSeparator(strVal) {
    const separators = [
        "\n\n",
        "\n",
        " -> ",
        ", ",
        ",",
        " - ",
        "-",
        " "
    ];
    for (const separator of separators){
        if (strVal.includes(separator)) return separator;
    }
    return null;
}
/** @type {Record<string, {check: (key: string) => boolean, parse: (strVal: string, key: string) => any}>} */ const converters = {
    vec: {
        check (/** @type {string} */ key) {
            return key === "vec";
        },
        parse (/** @type {string} */ strVal) {
            const separator = tryGetSeparator(strVal);
            const [x, y] = strVal.split(separator).map(Number);
            return (0, _indexJs.V).vec(x, y);
        }
    },
    vec3: {
        check (/** @type {string} */ key) {
            return key === "vec3";
        },
        parse (/** @type {string} */ strVal) {
            const separator = tryGetSeparator(strVal);
            const [x, y, z] = strVal.split(separator).map(Number);
            return (0, _vec3Js.vec3)(x, y, z);
        }
    },
    int: {
        check (/** @type {string} */ key) {
            return key === "int";
        },
        parse (/** @type {string} */ strVal) {
            return parseInt(strVal, 10);
        }
    },
    array: {
        check (/** @type {string} */ key) {
            return key.endsWith("[]");
        },
        parse (/** @type {string} */ strVal, /** @type {string} */ key) {
            const separator = tryGetSeparator(strVal);
            if (!separator) return [
                strToType(strVal, key.slice(0, -2))
            ];
            const childType = key.slice(0, -2);
            return strVal.split(separator).map((x)=>strToType(x, childType));
        }
    }
};
/**
 * @param {string} strVal
 * @param {string} type
 *
 * @returns {unknown}
 */ function strToType(strVal, type) {
    if (!type) return strVal;
    for(const key in converters){
        if (converters[key].check(type)) return converters[key].parse(strVal, type);
    }
    return strVal;
}
function typed(type) {
    return (strVal)=>/** @type {import("./types.js").TemplateValueReturnType<T>} */ strToType(strVal, type);
}
function tpl(strings, ...keys) {
    /**
   * @param {string} input
   * @returns {{[P in T[number] as import("./types.js").TemplateKey<P>]: import("./types.js").TemplateValue<P> }}
   */ function parse(input) {
        /** @type {Record<string, any>} */ const model = {};
        let lastIndex = 0;
        for(let i = 0; i < keys.length; i++){
            const start = strings[i].length + lastIndex;
            const end = strings[i + 1] ? input.indexOf(strings[i + 1], start) : input.length;
            const strVal = input.slice(start, end);
            const [key, type] = keys[i].split("|");
            model[key] = strToType(strVal, type);
            lastIndex = end;
        }
        return /** @type {any} */ model;
    }
    /**
   * @param {(arg: ReturnType<typeof parse>) => R} fn
   * @template R
   */ parse.map = (fn)=>(/** @type {string} */ input)=>fn(parse(input));
    return parse;
}

},{"./index.js":"eVlez","./itertools.js":"aDL7D","./vec3.js":"iYeMz","@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"aDL7D":[function(require,module,exports) {
// @ts-check
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @param {number} [start]
 * @param {number} [end]
 * @param {number} [step]
 */ parcelHelpers.export(exports, "range", ()=>range);
/**
 * @param {Iterable<T>} iterable
 * @param {number} n
 *
 * @template T
 */ parcelHelpers.export(exports, "skip", ()=>skip);
/**
 * @param {Iterable<T>} iterable
 * @param {number} n
 *
 * @template T
 */ parcelHelpers.export(exports, "take", ()=>take);
/**
 * @param {Iterable<T>} iterable
 *
 * @template T
 */ parcelHelpers.export(exports, "first", ()=>first);
/**
 * @param {Iterable<T>} iterable
 *
 * @template T
 */ parcelHelpers.export(exports, "last", ()=>last);
/**
 * @param {Iterable<T>} iterable
 * @param {(arg0: R, arg1: T, index: number) => R} reducer
 * @param {R} initial
 *
 * @template T
 * @template R
 */ parcelHelpers.export(exports, "reduce", ()=>reduce);
/**
 *
 * @param {T} x
 * @param {(arg: T) => T} f
 *
 * @template T
 */ parcelHelpers.export(exports, "iterate", ()=>iterate);
/**
 *
 * @param {Iterable<T>} iterable
 * @param {(arg: T, index: number) => R} f
 *
 * @template T
 * @template R
 */ parcelHelpers.export(exports, "map", ()=>map);
/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} n
 *
 * @template T
 */ parcelHelpers.export(exports, "groupsOf", ()=>groupsOf);
/**
 * @param {Iterable<T>} iterable
 *
 * @template T
 */ parcelHelpers.export(exports, "toArray", ()=>toArray);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {T | undefined}
 * @template T
 */ parcelHelpers.export(exports, "find", ()=>find);
/**
 * @param {Iterable<number>} xs
 * @returns
 */ parcelHelpers.export(exports, "sum", ()=>sum);
/**
 * @param {Iterable<number>} xs
 * @returns
 */ parcelHelpers.export(exports, "multiply", ()=>multiply);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */ parcelHelpers.export(exports, "filter", ()=>filter);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} [predicate]
 * @returns {number}
 * @template T
 */ parcelHelpers.export(exports, "count", ()=>count);
/**
 *
 * @param {Iterable<T>} iterableA
 * @param {Iterable<U>} iterableB
 * @returns {Iterable<[T, U]>}
 *
 * @template T, U
 */ parcelHelpers.export(exports, "zip", ()=>zip);
/**
 *
 * @param {Iterable<T>} iterable
 * @returns {Iterable<[number, T]>}
 *
 * @template T
 */ parcelHelpers.export(exports, "indexed", ()=>indexed);
/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} n
 * @returns {Iterable<T[]>}
 *
 * @template T
 */ parcelHelpers.export(exports, "windowed", ()=>windowed);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {number}
 * @template T
 */ parcelHelpers.export(exports, "findIndex", ()=>findIndex);
/**
 *
 * @param {Iterable<T>} iterable
 * @param {T} value
 * @returns {number}
 *
 * @template T
 */ parcelHelpers.export(exports, "indexOf", ()=>indexOf);
/**
 *
 * @param {Iterable<T>} iterable
 * @param {(arg: T) => Iterable<R>} f
 * @returns {Iterable<R>}
 *
 * @template T, R
 */ parcelHelpers.export(exports, "flatMap", ()=>flatMap);
/**
 * @param {Iterable<T>} iterable
 * @param {number} [n]
 * @returns {Iterable<T>}
 *
 * @template T
 */ parcelHelpers.export(exports, "skipLast", ()=>skipLast);
/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} every
 * @param {number} [skipInitial]
 * @returns {Iterable<T>}
 *
 * @template T
 */ parcelHelpers.export(exports, "takeEvery", ()=>takeEvery);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */ parcelHelpers.export(exports, "takeWhile", ()=>takeWhile);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */ parcelHelpers.export(exports, "takeUntil", ()=>takeUntil);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {boolean}
 * @template T
 */ parcelHelpers.export(exports, "every", ()=>every);
/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} index
 * @param {(arg: T) => T} fn
 *
 * @template T
 */ parcelHelpers.export(exports, "updateAt", ()=>updateAt);
/**
 *
 * @param {Iterable<T>} iterable
 * @param  {T[]} values
 *
 * @template T
 */ parcelHelpers.export(exports, "unshift", ()=>unshift);
/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */ parcelHelpers.export(exports, "skipAfter", ()=>skipAfter);
/**
 * @param {Iterable<T>} iterable
 * @param {(arg: T) => any} [mapFn]
 * @returns {Iterable<T>}
 *
 * @template T
 */ parcelHelpers.export(exports, "distinct", ()=>distinct);
parcelHelpers.export(exports, "it", ()=>it);
var _libJs = require("./lib.js");
var _vecJs = require("./vec.js");
function* range(start, end, step = 1) {
    if (start === undefined) start = 0;
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (step === undefined) step = 1;
    for(let i = start; i < end; i += step)yield i;
}
function* skip(iterable, n) {
    for (const x of iterable)if (n === 0) yield x;
    else n -= 1;
}
function* take(iterable, n) {
    for (const x of iterable){
        if (n === 0) return;
        yield x;
        n -= 1;
    }
}
function first(iterable) {
    for (const x of iterable)return x;
}
function last(iterable) {
    let last;
    for (const x of iterable)last = x;
    return last;
}
function reduce(iterable, reducer, initial) {
    let acc = initial;
    let idx = 0;
    for (const x of iterable)acc = reducer(acc, x, idx++);
    return acc;
}
function* iterate(x, f) {
    yield x;
    while(true){
        x = f(x);
        yield x;
    }
}
function* map(iterable, f) {
    let index = 0;
    for (const x of iterable){
        yield f(x, index);
        index += 1;
    }
}
function* groupsOf(iterable, n) {
    let group = [];
    for (const x of iterable){
        group.push(x);
        if (group.length === n) {
            yield group;
            group = [];
        }
    }
    if (group.length > 0) yield group;
}
function toArray(iterable) {
    return Array.from(iterable);
}
function find(iterable, predicate) {
    for (const x of iterable){
        if (predicate(x)) return x;
    }
}
function sum(xs) {
    return reduce(xs, (0, _libJs.add), 0);
}
function multiply(xs) {
    return reduce(xs, (0, _libJs.mul), 1);
}
function* filter(iterable, predicate) {
    for (const x of iterable)if (predicate(x)) yield x;
}
function count(iterable, predicate = ()=>true) {
    let count = 0;
    for (const x of iterable)if (predicate(x)) count += 1;
    return count;
}
function* zip(iterableA, iterableB) {
    const iterA = iterableA[Symbol.iterator]();
    const iterB = iterableB[Symbol.iterator]();
    while(true){
        const { value: a , done: doneA  } = iterA.next();
        const { value: b , done: doneB  } = iterB.next();
        if (doneA || doneB) return;
        yield [
            a,
            b
        ];
    }
}
function indexed(iterable) {
    return zip(range(Infinity), iterable);
}
function* windowed(iterable, n) {
    const buffer = [];
    for (const x of iterable){
        buffer.push(x);
        if (buffer.length === n) {
            yield buffer;
            buffer.shift();
        }
    }
}
function findIndex(iterable, predicate) {
    let i = 0;
    for (const x of iterable){
        if (predicate(x)) return i;
        i++;
    }
    return -1;
}
function indexOf(iterable, value) {
    return findIndex(iterable, (x)=>x === value);
}
function* flatMap(iterable, f) {
    for (const x of iterable)yield* f(x);
}
function* skipLast(iterable, n = 1) {
    if (n <= 0) {
        yield* iterable;
        return;
    }
    const buffer = Array(n);
    let i = 0;
    for (const x of iterable){
        if (i >= n) yield buffer[i % n];
        buffer[i % n] = x;
        i++;
    }
}
function* takeEvery(iterable, every, skipInitial = 0) {
    if (every <= 0) return;
    if (skipInitial < 0) skipInitial = 0;
    for (const x of iterable){
        if (skipInitial === 0) {
            yield x;
            skipInitial = every;
        }
        skipInitial--;
    }
}
function* takeWhile(iterable, predicate) {
    for (const x of iterable){
        if (!predicate(x)) return;
        yield x;
    }
}
function* takeUntil(iterable, predicate) {
    for (const x of iterable){
        if (predicate(x)) return;
        yield x;
    }
}
function every(iterable, predicate) {
    for (const x of iterable){
        if (!predicate(x)) return false;
    }
    return true;
}
function* updateAt(iterable, index, fn) {
    let i = 0;
    for (const x of iterable){
        if (i === index) yield fn(x);
        else yield x;
        i++;
    }
}
function* unshift(iterable, ...values) {
    yield* values;
    yield* iterable;
}
function* skipAfter(iterable, predicate) {
    for (const x of iterable){
        yield x;
        if (predicate(x)) return;
    }
}
function* distinct(iterable, mapFn = (x)=>x) {
    const set = new Set();
    for (const x of iterable){
        const key = mapFn(x);
        if (!set.has(key)) {
            set.add(key);
            yield x;
        }
    }
}
const it = (iterable)=>{
    /**
   * @type {FluentIterable<any>}
   */ const returnValue = {
        //#region GenericFluentIterable methods
        [Symbol.iterator]: ()=>iterable[Symbol.iterator](),
        /** @type {<R>(fn: (arg: T, index: number) => R) => FluentIterable<R>} */ map: (fn)=>it(map(iterable, fn)),
        groupsOf: (n)=>it(groupsOf(iterable, n)),
        toArray: ()=>toArray(iterable),
        first: ()=>first(iterable),
        last: ()=>last(iterable),
        find: (/** @type {(value: T) => boolean} */ predicate)=>find(iterable, predicate),
        skip: (n)=>it(skip(iterable, n)),
        take: (n)=>it(take(iterable, n)),
        toSet: ()=>new Set(iterable),
        /** @type {<R>(reducer: (arg0: R, arg1: T, index: number) => R, init: R) => R} */ reduce: (reducer, initial)=>reduce(iterable, reducer, initial),
        /** @type {(fn: (arg: T) => void) => void} */ forEach: (fn)=>{
            for (const x of iterable)fn(x);
        },
        filter: (/** @type {(arg: T) => boolean} */ predicate)=>it(filter(iterable, predicate)),
        count: (/** @type {((arg: T) => boolean) | undefined} */ predicate)=>count(iterable, predicate),
        indexed: ()=>it(indexed(iterable)),
        windowed: (n)=>it(windowed(iterable, n)),
        findIndex: (/** @type {(arg: T) => boolean} */ predicate)=>findIndex(iterable, predicate),
        indexOf: (/** @type {T} */ value)=>indexOf(iterable, value),
        /** @type {<R>(f: (arg: T) => Iterable<R>) => FluentIterable<R>} */ flatMap: (f)=>it(flatMap(iterable, f)),
        skipLast: (n)=>it(skipLast(iterable, n)),
        takeEvery: (every, skipInitial)=>it(takeEvery(iterable, every, skipInitial)),
        takeWhile: (/** @type {(arg: T) => boolean} */ predicate)=>it(takeWhile(iterable, predicate)),
        takeUntil: (/** @type {(arg: T) => boolean} */ predicate)=>it(takeUntil(iterable, predicate)),
        every: (/** @type {(arg: T) => boolean} */ predicate)=>every(iterable, predicate),
        updateAt: (/** @type {number} */ index, /** @type {(arg: T) => T} */ fn)=>it(updateAt(iterable, index, fn)),
        unshift: (...values)=>it(unshift(iterable, ...values)),
        skipAfter: (/** @type {(arg: T) => boolean} */ predicate)=>it(skipAfter(iterable, predicate)),
        distinct: (/** @type {(arg: T) => any} */ mapFn)=>it(distinct(iterable, mapFn)),
        //#endregion
        //#region NumFluentIterable methods
        multiply: ()=>multiply(/** @type {Iterable<number>} */ iterable),
        sum: ()=>sum(/** @type {Iterable<number>} */ iterable),
        min: ()=>/** @type {NumFluentIterable} */ returnValue.reduce(Math.min, Infinity),
        max: ()=>/** @type {NumFluentIterable} */ returnValue.reduce(Math.max, -Infinity),
        //#endregion
        //#region StrFluentIterable methods
        join: (separator = ",")=>toArray(iterable).join(separator)
    };
    return /** @type {FluentIterable<T>} */ returnValue;
};

},{"./lib.js":"7Ap0m","./vec.js":"2oi5s","@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"girLu":[function(require,module,exports) {
// @ts-check
// https://stackoverflow.com/a/42919752
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @template T
 * @implements {Iterable<T>}
 */ parcelHelpers.export(exports, "PriorityQueue", ()=>PriorityQueue);
const top = 0;
const parent = (/** @type {number} */ i)=>(i + 1 >>> 1) - 1;
const left = (/** @type {number} */ i)=>(i << 1) + 1;
const right = (/** @type {number} */ i)=>i + 1 << 1;
class PriorityQueue {
    /**
   *
   * @param {(a: T, b: T) => number} comparator
   */ constructor(comparator = (a, b)=>Number(a > b)){
        /** @type {T[]} @private */ this._heap = [];
        /** @private */ this._comparator = comparator;
    }
    [Symbol.iterator]() {
        return {
            next: ()=>{
                if (this.size() > 1) return {
                    value: this.pop(),
                    done: false
                };
                return {
                    done: true,
                    value: this.pop()
                };
            }
        };
    }
    get length() {
        return this.size();
    }
    size() {
        return this._heap.length;
    }
    isEmpty() {
        return this.size() == 0;
    }
    peek() {
        return this._heap[top];
    }
    /**
   * @param  {T[]} values
   * @returns
   */ push(...values) {
        values.forEach((value)=>{
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }
    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > top) this._swap(top, bottom);
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    /**
   * @param {T} value
   */ replace(value) {
        const replacedValue = this.peek();
        this._heap[top] = value;
        this._siftDown();
        return replacedValue;
    }
    /**
   * @param {number} i
   * @param {number} j
   * @private
   */ _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]) < 0;
    }
    /**
   * @param {number} i
   * @param {number} j
   * @private
   */ _swap(i, j) {
        [this._heap[i], this._heap[j]] = [
            this._heap[j],
            this._heap[i]
        ];
    }
    /**
   * @private
   */ _siftUp() {
        let node = this.size() - 1;
        while(node > top && this._greater(node, parent(node))){
            this._swap(node, parent(node));
            node = parent(node);
        }
    }
    /**
   * @private
   */ _siftDown() {
        let node = top;
        while(left(node) < this.size() && this._greater(left(node), node) || right(node) < this.size() && this._greater(right(node), node)){
            let maxChild = right(node) < this.size() && this._greater(right(node), left(node)) ? right(node) : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"kAYVe":[function(require,module,exports) {
// @ts-check
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @typedef {Object} BfsPos
 * @property {V.Vec2} pos
 * @property {number} distance
 * @property {T} value
 * @property {BfsPos<T>} [parent]
 *
 * @template T
 */ /**
 *
 * @param {Map2d<T>} map2d
 * @param {(from: BfsPos<T>, to: BfsPos<T>) => boolean} canGoFromTo
 * @param {V.Vec2 | Iterable<V.Vec2>} start
 * @param {(pos: V.Vec2) => Iterable<V.Vec2>} getNeighbors
 *
 * @template T
 */ parcelHelpers.export(exports, "bfs", ()=>bfs);
/**
 * @implements {Iterable<{pos: V.Vec2;value: T;}>}
 * @template T
 */ parcelHelpers.export(exports, "Map2d", ()=>Map2d);
/**
 * @param {T[][]} raw
 * @returns {Map2d<T>}
 * @template T
 */ parcelHelpers.export(exports, "toMap2d", ()=>toMap2d);
/**
 * @param {string} input
 * @returns
 */ parcelHelpers.export(exports, "parseMap2d", ()=>parseMap2d);
var _vecJs = require("./vec.js");
function* bfs(map2d, canGoFromTo, start, getNeighbors) {
    /** @type {BfsPos<T>[]} */ const queue = [];
    if (_vecJs.isVec(start)) queue.push({
        distance: 0,
        pos: start,
        value: map2d.get(start),
        parent: null
    });
    else for (const pos of start)queue.push({
        distance: 0,
        pos: pos,
        value: map2d.get(pos),
        parent: null
    });
    const visited = new Set();
    while(queue.length){
        const current = queue.shift();
        const key = current.pos.join();
        if (visited.has(key)) continue;
        visited.add(key);
        yield current;
        for (const next of getNeighbors(current.pos)){
            const nextBfs = {
                distance: current.distance + 1,
                pos: next,
                value: map2d.get(next),
                parent: current
            };
            if (canGoFromTo(current, nextBfs)) queue.push(nextBfs);
        }
    }
}
class Map2d {
    /**
   * @param {R[][]} raw
   * @template R
   */ static fromArray(raw) {
        const map = new Map2d();
        raw.forEach((row, y)=>{
            row.forEach((value, x)=>{
                map.set(_vecJs.vec(x, y), value);
            });
        });
        return map;
    }
    /**
   *
   * @param {V.Vec2} pos
   * @returns {Iterable<V.Vec2>}
   */ getNeighbors = (pos)=>_vecJs.DIRS_4.map((dir)=>_vecJs.add(pos, dir)).filter((pos)=>this.hasPos(pos));
    /**
   * @type {Map<number, Map<number, T>>}
   */ #data = new Map();
    #minX = Infinity;
    #minY = Infinity;
    #maxX = -Infinity;
    #maxY = -Infinity;
    #needRecalculateBounds = false;
    get bounds() {
        if (this.#needRecalculateBounds) this.#updateBounds();
        return {
            minX: this.#minX,
            minY: this.#minY,
            maxX: this.#maxX,
            maxY: this.#maxY,
            botRight: _vecJs.vec(this.#maxX, this.#maxY),
            topLeft: _vecJs.vec(this.#minX, this.#minY)
        };
    }
    get height() {
        return this.#maxY - this.#minY + 1;
    }
    get width() {
        return this.#maxX - this.#minX + 1;
    }
    /**
   * @param {Iterable<[V.Vec2, T]>} [data]
   */ constructor(data = []){
        for (const [pos, value] of data)this.set(pos, value);
    }
    #updateBounds() {
        this.#data.forEach((row, y)=>{
            row.forEach((_, x)=>{
                this.#extendBounds(x, y);
            });
        });
        this.#needRecalculateBounds = false;
    }
    /**
   * @param {number} x
   * @param {number} y
   */ #extendBounds(x, y) {
        this.#minX = Math.min(this.#minX, x);
        this.#minY = Math.min(this.#minY, y);
        this.#maxX = Math.max(this.#maxX, x);
        this.#maxY = Math.max(this.#maxY, y);
    }
    /**
   * @param {V.Vec2} vec
   * @returns {T | undefined}
   */ get([x, y]) {
        return this.#data.get(x)?.get(y);
    }
    /**
   * @param {V.Vec2} vec
   * @param {T} value
   * @returns {this}
   */ set([x, y], value) {
        if (this.#data.has(x) === false) this.#data.set(x, new Map());
        this.#data.get(x).set(y, value);
        this.#extendBounds(x, y);
        return this;
    }
    /**
   * @param {V.Vec2} vec
   */ hasPos([x, y]) {
        return this.#data.get(x)?.has(y) === true;
    }
    /**
   * @param {(arg: T, pos: V.Vec2) => R} mapFn
   * @returns {Map2d<R>}
   *
   * @template R
   */ map(mapFn) {
        const result = new Map2d();
        for (const { pos , value  } of this)result.set(pos, mapFn(value, pos));
        return result;
    }
    /**
   *
   * @param {(from: BfsPos<T>, to: BfsPos<T>) => boolean} canGoFromTo
   * @param {V.Vec2} start
   * @returns {Iterable<BfsPos<T>>}
   */ bfs(canGoFromTo, start) {
        return bfs(this, canGoFromTo, start, this.getNeighbors);
    }
    /**
   *
   * @param {(arg: V.Vec2) => Iterable<V.Vec2>} getNeighbors
   */ setGetNeighbors(getNeighbors) {
        this.getNeighbors = getNeighbors;
        return this;
    }
    [Symbol.iterator]() {
        return toIterable(this.#data);
    }
    /**
   * @param {Object} params
   * @param {V.Vec2} [params.topLeftPos]
   * @param {V.Vec2} [params.botRightPos]
   * @param {(arg: T | undefined) => J} params.valToString
   * @returns
   *
   * @template J
   */ to2dArray({ topLeftPos =_vecJs.vec(this.#minX, this.#minY) , botRightPos =_vecJs.vec(this.#maxX, this.#maxY) , valToString  }) {
        const [minX, minY] = topLeftPos;
        const [maxX, maxY] = botRightPos;
        const result = [];
        for(let y = minY; y <= maxY; y++){
            const row = [];
            for(let x = minX; x <= maxX; x++){
                const value = this.get([
                    x,
                    y
                ]);
                row.push(valToString(value));
            }
            result.push(row);
        }
        return result;
    }
    /**
   * @param {Object} params
   * @param {V.Vec2} [params.topLeftPos]
   * @param {V.Vec2} [params.botRightPos]
   * @param {(arg: T | undefined) => string} [params.valToString]
   * @returns
   */ toString({ topLeftPos =_vecJs.vec(this.#minX, this.#minY) , botRightPos =_vecJs.vec(this.#maxX, this.#maxY) , valToString =(x)=>(x ?? ".").toString()  } = {}) {
        return this.to2dArray({
            topLeftPos,
            botRightPos,
            valToString
        }).map((row)=>row.join("")).join("\n");
    }
}
function toMap2d(raw) {
    return Map2d.fromArray(raw);
}
function parseMap2d(input) {
    const raw = input.split("\n").map((line)=>line.split(""));
    return Map2d.fromArray(raw);
}
/**
 * @param {Map<number, Map<number, T>>} map2d
 *
 * @template T
 */ function* toIterable(map2d) {
    for (const x of map2d.keys())for (const y of map2d.get(x).keys())yield {
        pos: _vecJs.vec(x, y),
        value: map2d.get(x).get(y)
    };
}

},{"./vec.js":"2oi5s","@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"8wzUn":[function(require,module,exports) {
// @ts-check
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} [scale]
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scaleCanvasToPixelRatio", ()=>scaleCanvasToPixelRatio);
function scaleCanvasToPixelRatio(ctx, width, height, scale = 1) {
    const pixelRatio = (window.devicePixelRatio ?? 1) * scale;
    ctx.canvas.width = width * scale * pixelRatio;
    ctx.canvas.height = height * scale * pixelRatio;
    ctx.canvas.style.width = `${width * scale}px`;
    ctx.canvas.style.height = `${height * scale}px`;
    ctx.scale(pixelRatio, pixelRatio);
    return pixelRatio;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}]},["4HJcs"], null, "parcelRequiree764")

//# sourceMappingURL=index.05248d44.js.map
