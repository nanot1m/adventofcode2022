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
})({"2wF5n":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "349966cc758ec585";
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

},{}],"5j2lZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _common = require("../common");
var _24 = require("../../../js/solutions/24");
var _map2D = require("../../../js/modules/map2d");
var _grassPng = require("./img/grass.png");
var _grassPngDefault = parcelHelpers.interopDefault(_grassPng);
var _wallVPng = require("./img/wall-v.png");
var _wallVPngDefault = parcelHelpers.interopDefault(_wallVPng);
var _wallHPng = require("./img/wall-h.png");
var _wallHPngDefault = parcelHelpers.interopDefault(_wallHPng);
var _wallTlPng = require("./img/wall-tl.png");
var _wallTlPngDefault = parcelHelpers.interopDefault(_wallTlPng);
var _wallTrPng = require("./img/wall-tr.png");
var _wallTrPngDefault = parcelHelpers.interopDefault(_wallTrPng);
var _wallBlPng = require("./img/wall-bl.png");
var _wallBlPngDefault = parcelHelpers.interopDefault(_wallBlPng);
var _wallBrPng = require("./img/wall-br.png");
var _wallBrPngDefault = parcelHelpers.interopDefault(_wallBrPng);
var _modules = require("../../../js/modules");
var _itertools = require("../../../js/modules/itertools");
var _lib = require("../../../js/modules/lib");
const example = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;
const blizzardToChar = {
    "<": "⇠",
    ">": "⇢",
    "^": "⇡",
    v: "⇣"
};
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */ const ctx = canvas.getContext("2d");
const form = document.getElementById("input-form");
const inputElement = document.getElementById("input");
inputElement.value = example;
const controls = document.querySelector(".controls");
const solveBtn = document.getElementById("solve");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const input = formData.get("input")?.toString() ?? "";
    startLevel(input.trim());
});
const tileSize = 10;
let scale = 4;
const padding = 4;
const colors = {
    bg: "#1e130a",
    blizzard: "#4dabf7"
};
function drawElf(pos) {
    drawChar(pos, "\uD83E\uDDCC", "green", false);
}
function drawElf2(pos) {
    drawChar(pos, "\uD83E\uDDDD‍♂️", "green", false);
}
function drawChar(pos, char, color = "white", clear = true) {
    ctx.font = tileSize * scale + "px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const size = tileSize * scale;
    if (clear) {
        ctx.fillStyle = colors.bg;
        ctx.fillRect(pos[0] * size, pos[1] * size, size, size);
    }
    ctx.fillStyle = color;
    ctx.fillText(char, pos[0] * size + size / 2, pos[1] * size + size / 2);
}
function drawSprite(pos, sprite) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, 0, 0, tileSize, tileSize, pos[0] * tileSize * scale, pos[1] * tileSize * scale, tileSize * scale, tileSize * scale);
}
function loadSprite(path) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.onload = ()=>resolve(img);
        img.onerror = reject;
        img.src = path;
    });
}
async function loadSprites() {
    const sprites = await Promise.all([
        loadSprite((0, _grassPngDefault.default)),
        loadSprite((0, _wallVPngDefault.default)),
        loadSprite((0, _wallHPngDefault.default)),
        loadSprite((0, _wallTlPngDefault.default)),
        loadSprite((0, _wallTrPngDefault.default)),
        loadSprite((0, _wallBlPngDefault.default)),
        loadSprite((0, _wallBrPngDefault.default))
    ]);
    return {
        grass: sprites[0],
        wallV: sprites[1],
        wallH: sprites[2],
        wallTL: sprites[3],
        wallTR: sprites[4],
        wallBL: sprites[5],
        wallBR: sprites[6]
    };
}
function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
let handle = 0;
async function startLevel(level) {
    const map = (0, _24.parseInput)(level);
    const width = (map.width + 2) * tileSize + padding * 2;
    const height = (map.height + 2) * tileSize + padding * 2;
    const blizzards = (0, _itertools.it)(map).filter((x)=>x.value !== ".").toArray();
    const screenWidth = window.innerWidth;
    const maxScale = Math.max(Math.min(Math.floor(screenWidth / width), 4), 1);
    scale = maxScale;
    (0, _common.scaleCanvasToPixelRatio)(ctx, width, height, scale);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(padding * scale, padding * scale);
    const message = "Loading...";
    let timePassed = Date.now();
    for(let i = 0; i < message.length; i++)drawChar([
        i,
        1
    ], message[i], "white");
    const sprites = await loadSprites();
    const shortestPath = (0, _24.toArray)((0, _24.getShortestPath)(map, [
        0,
        -1
    ], [
        map.width - 1,
        map.height
    ], 0));
    timePassed = Date.now() - timePassed;
    if (timePassed < 1000) await delay(1000 - timePassed);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(-padding, -padding, canvas.width, canvas.height);
    let playerPos = [
        0,
        -1
    ];
    let time = 0;
    let lost = false;
    let won = false;
    let blizzardsToDraw = blizzards;
    drawLevel(map, time);
    setButtonsState();
    async function showSolution() {
        cancelAnimationFrame(handle);
        blockAllButtons();
        for (const [pos] of shortestPath)await movePlayerFromToWithAnimation(playerPos, pos, 100);
    }
    function movePlayerFromToWithAnimation(from, to, duration) {
        return new Promise((res)=>{
            const [x1, y1] = from;
            const [x2, y2] = to;
            const dx = x2 - x1;
            const dy = y2 - y1;
            let lastTime = 0;
            const origPoses = blizzardsToDraw.map((b)=>b.pos);
            function loop(dt) {
                if (lastTime === 0) lastTime = dt;
                const dTime = dt - lastTime;
                const progress = Math.min(dTime / duration, 1);
                const x = x1 + dx * progress;
                const y = y1 + dy * progress;
                playerPos = [
                    x,
                    y
                ];
                blizzardsToDraw.forEach((b, i)=>{
                    const dx = b.value === "<" ? -1 : b.value === ">" ? 1 : 0;
                    const dy = b.value === "^" ? -1 : b.value === "v" ? 1 : 0;
                    blizzardsToDraw[i] = {
                        value: b.value,
                        pos: [
                            origPoses[i][0] + dx * progress,
                            origPoses[i][1] + dy * progress
                        ]
                    };
                });
                drawLevel(map, time);
                if (progress < 1) handle = requestAnimationFrame(loop);
                else {
                    cancelAnimationFrame(handle);
                    playerPos = to;
                    time++;
                    blizzardsToDraw.forEach((b, i)=>{
                        const dx = b.value === "<" ? -1 : b.value === ">" ? 1 : 0;
                        const dy = b.value === "^" ? -1 : b.value === "v" ? 1 : 0;
                        const x = (0, _lib.mod)(origPoses[i][0] + dx, map.width);
                        const y = (0, _lib.mod)(origPoses[i][1] + dy, map.height);
                        blizzardsToDraw[i] = {
                            value: b.value,
                            pos: [
                                x,
                                y
                            ]
                        };
                    });
                    drawLevel(map, time);
                    res();
                }
            }
            loop(0);
        });
    }
    function drawLevel(map, time) {
        ctx.fillStyle = colors.bg;
        ctx.fillRect(-padding * scale, -padding * scale, canvas.width, canvas.height);
        let drawMap = new (0, _map2D.Map2d)();
        for(let i = -1; i <= map.width; i++){
            drawMap.set([
                i,
                -1
            ], "#");
            drawMap.set([
                i,
                map.height
            ], "#");
        }
        for(let i1 = 0; i1 < map.height; i1++){
            drawMap.set([
                -1,
                i1
            ], "#");
            drawMap.set([
                map.width,
                i1
            ], "#");
        }
        drawMap.set([
            0,
            -1
        ], ".");
        drawMap.set([
            map.width - 1,
            map.height
        ], ".");
        drawMap = (0, _map2D.parseMap2d)(drawMap.toString());
        for (const { pos , value  } of drawMap)if (value === "#") {
            const isWallOnLeft = drawMap.get([
                pos[0] - 1,
                pos[1]
            ]) === "#";
            const isWallOnRight = drawMap.get([
                pos[0] + 1,
                pos[1]
            ]) === "#";
            const isWallOnTop = drawMap.get([
                pos[0],
                pos[1] - 1
            ]) === "#";
            const isWallOnBottom = drawMap.get([
                pos[0],
                pos[1] + 1
            ]) === "#";
            if (isWallOnRight && isWallOnBottom) drawSprite(pos, sprites.wallTL);
            else if (isWallOnLeft && isWallOnBottom || isWallOnLeft && !isWallOnRight) drawSprite(pos, sprites.wallTR);
            else if (isWallOnRight && isWallOnTop || isWallOnRight && !isWallOnLeft) drawSprite(pos, sprites.wallBL);
            else if (isWallOnLeft && isWallOnTop) drawSprite(pos, sprites.wallBR);
            else if (isWallOnRight || isWallOnLeft) drawSprite(pos, sprites.wallH);
            else drawSprite(pos, sprites.wallV);
        }
        blizzardsToDraw.forEach((blizzard)=>{
            drawChar((0, _modules.V).add(blizzard.pos, (0, _modules.V).vec(1, 1)), blizzardToChar[blizzard.value], colors.blizzard, false);
        });
        drawElf([
            playerPos[0] + 1,
            playerPos[1] + 1
        ]);
        drawElf2([
            drawMap.width - 2,
            drawMap.height - 1
        ]);
    }
    function blockAllButtons() {
        for (const button of controls.children)button.disabled = true;
    }
    function setButtonsState() {
        const canMove = {
            up: (0, _modules.V).eq([
                playerPos[0],
                playerPos[1] - 1
            ], [
                0,
                -1
            ]) || map.has([
                playerPos[0],
                playerPos[1] - 1
            ]),
            down: (0, _modules.V).eq([
                playerPos[0],
                playerPos[1] + 1
            ], [
                map.width - 1,
                map.height
            ]) || map.has([
                playerPos[0],
                playerPos[1] + 1
            ]),
            left: map.has([
                playerPos[0] - 1,
                playerPos[1]
            ]),
            right: map.has([
                playerPos[0] + 1,
                playerPos[1]
            ]),
            stay: true
        };
        for (const button of controls.children)button.disabled = lost || won || !canMove[button.name];
    }
    function drawLoseScreen() {
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const message = "You lost!";
        for(let i = 0; i < message.length; i++)drawChar([
            i,
            1
        ], message[i], "red");
    }
    function drawWinScreen() {
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const message = "You won!";
        for(let i = 0; i < message.length; i++)drawChar([
            i,
            1
        ], message[i], "green");
    }
    function checkWinLose() {
        if ((0, _modules.V).eq(playerPos, [
            map.width - 1,
            map.height
        ])) {
            won = true;
            drawWinScreen();
        } else if ((0, _24.checks).u(map, playerPos, time) || (0, _24.checks).d(map, playerPos, time) || (0, _24.checks).l(map, playerPos, time) || (0, _24.checks).r(map, playerPos, time)) {
            lost = true;
            drawLoseScreen();
        }
    }
    async function handleMove(direction) {
        let nextPos = [
            ...playerPos
        ];
        if (direction === "up") nextPos[1]--;
        else if (direction === "down") nextPos[1]++;
        else if (direction === "left") nextPos[0]--;
        else if (direction === "right") nextPos[0]++;
        await movePlayerFromToWithAnimation(playerPos, nextPos, 300);
        checkWinLose();
        setButtonsState();
    }
    controls.onclick = function(e) {
        handleMove(e.target.name);
    };
    solveBtn.onclick = function() {
        showSolution();
    };
}

},{"../common":"8wzUn","../../../js/solutions/24":"i9Vgd","../../../js/modules/map2d":"kAYVe","./img/grass.png":"iMAve","./img/wall-v.png":"8yDjB","./img/wall-h.png":"9KdlT","./img/wall-tl.png":"7fqsw","./img/wall-tr.png":"fQWy3","./img/wall-bl.png":"k9FM7","./img/wall-br.png":"elz9g","../../../js/modules":"eVlez","@parcel/transformer-js/src/esmodule-helpers.js":"5gDop","../../../js/modules/itertools":"aDL7D","../../../js/modules/lib":"7Ap0m"}],"i9Vgd":[function(require,module,exports) {
// @ts-check
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useExample", ()=>useExample);
parcelHelpers.export(exports, "exampleInput", ()=>exampleInput);
parcelHelpers.export(exports, "parseInput", ()=>parseInput);
parcelHelpers.export(exports, "checks", ()=>checks);
/**
 *
 * @param {Map2d<string>} map
 * @param {V.Vec2 | null} me
 * @param {number} time
 */ parcelHelpers.export(exports, "prepareMapForDraw", ()=>prepareMapForDraw);
/** @typedef {[V.Vec2, number, BfsStep | null]} BfsStep */ /**
 * @param {BfsStep} step
 */ parcelHelpers.export(exports, "toArray", ()=>toArray);
/**
 * @param {Map2d<string>} map
 * @param {V.Vec2} start
 * @param {V.Vec2} end
 * @param {V.Vec2} pos
 * @param {number} t
 * @returns {V.Vec2[]}
 */ parcelHelpers.export(exports, "getAvailablePositions", ()=>getAvailablePositions);
/**
 *
 * @param {InputType} map
 * @param {V.Vec2} start
 * @param {V.Vec2} end
 * @param {number} startTime
 * @returns
 */ parcelHelpers.export(exports, "getShortestPath", ()=>getShortestPath);
/**
 * @param {InputType} input
 */ parcelHelpers.export(exports, "part1", ()=>part1);
/**
 * @param {InputType} input
 */ parcelHelpers.export(exports, "part2", ()=>part2);
var _indexJs = require("../modules/index.js");
var _libJs = require("../modules/lib.js");
var _map2DJs = require("../modules/map2d.js");
const useExample = false;
const exampleInput = `\
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;
const parseInput = (/** @type {string} */ input)=>{
    /** @type {Map2d<string>} */ const resultMap = new (0, _map2DJs.Map2d)();
    const lines = (0, _libJs.readLines)(input);
    for(let y = 1; y < lines.length - 1; y++)for(let x = 1; x < lines[y].length - 1; x++)resultMap.set((0, _indexJs.V).vec(x - 1, y - 1), lines[y][x]);
    return resultMap;
};
/**
 *
 * @param {Map2d<string>} map
 * @param {V.Vec2} pos
 * @param {number} time
 * @returns
 */ function isBlizzard(map, pos, time) {
    return checks.u(map, pos, time) || checks.d(map, pos, time) || checks.l(map, pos, time) || checks.r(map, pos, time);
}
const checks = {
    u: (map, [x, y], time)=>map.get([
            x,
            (0, _libJs.mod)(y + time, map.height)
        ]) === "^",
    d: (map, [x, y], time)=>map.get([
            x,
            (0, _libJs.mod)(y - time, map.height)
        ]) === "v",
    l: (map, [x, y], time)=>map.get([
            (0, _libJs.mod)(x + time, map.width),
            y
        ]) === "<",
    r: (map, [x, y], time)=>map.get([
            (0, _libJs.mod)(x - time, map.width),
            y
        ]) === ">"
};
function prepareMapForDraw(map, me, time) {
    const drawMap = new (0, _map2DJs.Map2d)();
    for (const { pos  } of map){
        const blizzards = [];
        if (checks.u(map, pos, time)) blizzards.push("^");
        if (checks.d(map, pos, time)) blizzards.push("v");
        if (checks.l(map, pos, time)) blizzards.push("<");
        if (checks.r(map, pos, time)) blizzards.push(">");
        if (blizzards.length > 0) drawMap.set(pos, blizzards.length === 1 ? blizzards[0] : blizzards.length);
    }
    for(let i = -1; i <= map.width; i++){
        drawMap.set([
            i,
            -1
        ], "#");
        drawMap.set([
            i,
            map.height
        ], "#");
    }
    for(let i1 = 0; i1 < map.height; i1++){
        drawMap.set([
            -1,
            i1
        ], "#");
        drawMap.set([
            map.width,
            i1
        ], "#");
    }
    drawMap.set([
        0,
        -1
    ], ".");
    drawMap.set([
        map.width - 1,
        map.height
    ], ".");
    if (me) drawMap.set(me, "E");
    return (0, _map2DJs.parseMap2d)(drawMap.toString());
}
function toArray(step) {
    const result = [];
    while(step){
        result.push(step);
        step = step[2];
    }
    return result.reverse();
}
function getAvailablePositions(map, start, end, pos, t) {
    return [
        ...(0, _indexJs.V).DIRS_4,
        (0, _indexJs.V).ZERO
    ].map((d)=>(0, _indexJs.V).add(pos, d)).filter((n)=>{
        return !isBlizzard(map, n, t + 1) && ((0, _indexJs.V).eq(n, start) || (0, _indexJs.V).eq(n, end) || map.has(n));
    });
}
function getShortestPath(map, start, end, startTime) {
    while(isBlizzard(map, start, startTime))startTime++;
    /**
   * @param {V.Vec2} start
   * @param {V.Vec2} end
   * @param {number} startTime
   *
   * @returns {BfsStep | null}
   */ function bfs(start, end, startTime) {
        /** @type {Array<BfsStep>} */ const queue = [
            [
                start,
                startTime,
                null
            ]
        ];
        const visited = new Set();
        while(queue.length > 0){
            const cur = queue.shift();
            const [pos, t] = cur;
            if ((0, _indexJs.V).eq(pos, end)) return cur;
            const key = pos.toString() + ":" + t;
            if (visited.has(key)) continue;
            else visited.add(key);
            for (const next of getAvailablePositions(map, start, end, pos, t))queue.push([
                next,
                t + 1,
                cur
            ]);
        }
        throw new Error("No path found");
    }
    const result = bfs(start, end, startTime);
    // toArray(result).forEach((pos, i) => {
    //   drawMap(map, pos[0], i + startTime)
    // })
    return result;
}
function part1(input) {
    const start = (0, _indexJs.V).vec(0, -1);
    const end = (0, _indexJs.V).vec(input.width - 1, input.height);
    return getShortestPath(input, start, end, 0)[1];
}
function part2(input) {
    const start = (0, _indexJs.V).vec(0, -1);
    const end = (0, _indexJs.V).vec(input.width - 1, input.height);
    const first = getShortestPath(input, start, end, 0);
    const second = getShortestPath(input, end, start, first[1]);
    const third = getShortestPath(input, start, end, second[1]);
    return third;
}

},{"../modules/index.js":"eVlez","../modules/lib.js":"7Ap0m","../modules/map2d.js":"kAYVe","@parcel/transformer-js/src/esmodule-helpers.js":"5gDop"}],"iMAve":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("4vZ2b") + "../grass.bccba575.png" + "?" + Date.now();

},{"./helpers/bundle-url":"fPs0q"}],"fPs0q":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"8yDjB":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("4vZ2b") + "../wall-v.359df388.png" + "?" + Date.now();

},{"./helpers/bundle-url":"fPs0q"}],"9KdlT":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("4vZ2b") + "../wall-h.687776f7.png" + "?" + Date.now();

},{"./helpers/bundle-url":"fPs0q"}],"7fqsw":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("4vZ2b") + "../wall-tl.c98868e8.png" + "?" + Date.now();

},{"./helpers/bundle-url":"fPs0q"}],"fQWy3":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("4vZ2b") + "../wall-tr.f7b996ac.png" + "?" + Date.now();

},{"./helpers/bundle-url":"fPs0q"}],"k9FM7":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("4vZ2b") + "../wall-bl.3edc8d7b.png" + "?" + Date.now();

},{"./helpers/bundle-url":"fPs0q"}],"elz9g":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("4vZ2b") + "../wall-br.ff9b468d.png" + "?" + Date.now();

},{"./helpers/bundle-url":"fPs0q"}]},["2wF5n","5j2lZ"], "5j2lZ", "parcelRequiree764")

//# sourceMappingURL=index.758ec585.js.map
