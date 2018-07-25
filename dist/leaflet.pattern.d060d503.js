// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/leaflet.pattern.js":[function(require,module,exports) {
/*
 Leaflet.pattern, Provides tools to set the backgrounds of vector shapes in Leaflet to be patterns.
 https://github.com/teastman/Leaflet.pattern
 (c) 2015, Tyler Eastman
*/
!function (t, e) {
  L.Pattern = L.Class.extend({ includes: [L.Mixin.Events], options: { x: 0, y: 0, width: 8, height: 8, patternUnits: "userSpaceOnUse", patternContentUnits: "userSpaceOnUse" }, _addShapes: L.Util.falseFn, _update: L.Util.falseFn, initialize: function initialize(t) {
      this._shapes = {}, L.setOptions(this, t);
    }, onAdd: function onAdd(t) {
      this._map = t.target ? t.target : t, this._map._initDefRoot(), this._initDom();for (var e in this._shapes) {
        this._shapes[e].onAdd(this);
      }this._addShapes(), this._addDom(), this.redraw(), this.getEvents && this._map.on(this.getEvents(), this), this.fire("add"), this._map.fire("patternadd", { pattern: this });
    }, onRemove: function onRemove() {
      this._removeDom();
    }, redraw: function redraw() {
      if (this._map) {
        this._update();for (var t in this._shapes) {
          this._shapes[t].redraw();
        }
      }return this;
    }, setStyle: function setStyle(t) {
      return L.setOptions(this, t), this._map && (this._updateStyle(), this.redraw()), this;
    }, addTo: function addTo(t) {
      return t.addPattern(this), this;
    }, remove: function remove() {
      return this.removeFrom(this._map);
    }, removeFrom: function removeFrom(t) {
      return t && t.removePattern(this), this;
    } }), L.Map.addInitHook(function () {
    this._patterns = {};
  }), L.Map.include({ addPattern: function addPattern(t) {
      var e = L.stamp(t);return this._patterns[e] ? t : (this._patterns[e] = t, this.whenReady(t.onAdd, t), this);
    }, removePattern: function removePattern(t) {
      var e = L.stamp(t);return this._patterns[e] ? (this._loaded && t.onRemove(this), t.getEvents && this.off(t.getEvents(), t), delete this._patterns[e], this._loaded && (this.fire("patternremove", { pattern: t }), t.fire("remove")), t._map = null, this) : this;
    }, hasPattern: function hasPattern(t) {
      return !!t && L.stamp(t) in this._patterns;
    } }), L.Pattern.SVG_NS = "http://www.w3.org/2000/svg", L.Pattern = L.Pattern.extend({ _createElement: function _createElement(t) {
      return e.createElementNS(L.Pattern.SVG_NS, t);
    }, _initDom: function _initDom() {
      this._dom = this._createElement("pattern"), this.options.className && L.DomUtil.addClass(this._dom, this.options.className), this._updateStyle();
    }, _addDom: function _addDom() {
      this._map._defRoot.appendChild(this._dom);
    }, _removeDom: function _removeDom() {
      L.DomUtil.remove(this._dom);
    }, _updateStyle: function _updateStyle() {
      var t = this._dom,
          e = this.options;if (t) {
        if (t.setAttribute("id", L.stamp(this)), t.setAttribute("x", e.x), t.setAttribute("y", e.y), t.setAttribute("width", e.width), t.setAttribute("height", e.height), t.setAttribute("patternUnits", e.patternUnits), t.setAttribute("patternContentUnits", e.patternContentUnits), e.patternTransform || e.angle) {
          var i = e.patternTransform ? e.patternTransform + " " : "";i += e.angle ? "rotate(" + e.angle + ") " : "", t.setAttribute("patternTransform", i);
        } else t.removeAttribute("patternTransform");for (var s in this._shapes) {
          this._shapes[s]._updateStyle();
        }
      }
    } }), L.Map.include({ _initDefRoot: function _initDefRoot() {
      if (!this._defRoot) if ("function" == typeof this.getRenderer) {
        var t = this.getRenderer(this);this._defRoot = L.Pattern.prototype._createElement("defs"), t._container.appendChild(this._defRoot);
      } else this._pathRoot || this._initPathRoot(), this._defRoot = L.Pattern.prototype._createElement("defs"), this._pathRoot.appendChild(this._defRoot);
    } }), L.SVG ? L.SVG.include({ _superUpdateStyle: L.SVG.prototype._updateStyle, _updateStyle: function _updateStyle(t) {
      this._superUpdateStyle(t), t.options.fill && t.options.fillPattern && t._path.setAttribute("fill", "url(#" + L.stamp(t.options.fillPattern) + ")");
    } }) : L.Path.include({ _superUpdateStyle: L.Path.prototype._updateStyle, _updateStyle: function _updateStyle() {
      this._superUpdateStyle(), this.options.fill && this.options.fillPattern && this._path.setAttribute("fill", "url(#" + L.stamp(this.options.fillPattern) + ")");
    } }), L.StripePattern = L.Pattern.extend({ options: { weight: 4, spaceWeight: 4, color: "#000000", spaceColor: "#ffffff", opacity: 1, spaceOpacity: 0 }, _addShapes: function _addShapes() {
      this._stripe = new L.PatternPath({ stroke: !0, weight: this.options.weight, color: this.options.color, opacity: this.options.opacity }), this._space = new L.PatternPath({ stroke: !0, weight: this.options.spaceWeight, color: this.options.spaceColor, opacity: this.options.spaceOpacity }), this.addShape(this._stripe), this.addShape(this._space), this._update();
    }, _update: function _update() {
      this._stripe.options.d = "M0 " + this._stripe.options.weight / 2 + " H " + this.options.width, this._space.options.d = "M0 " + (this._stripe.options.weight + this._space.options.weight / 2) + " H " + this.options.width;
    }, setStyle: L.Pattern.prototype.setStyle }), L.stripePattern = function (t) {
    return new L.StripePattern(t);
  }, L.PatternShape = L.Class.extend({ options: { stroke: !0, color: "#3388ff", weight: 3, opacity: 1, lineCap: "round", lineJoin: "round", fillOpacity: .2, fillRule: "evenodd" }, initialize: function initialize(t) {
      L.setOptions(this, t);
    }, onAdd: function onAdd(t) {
      this._pattern = t, this._pattern._dom && (this._initDom(), this._addDom());
    }, addTo: function addTo(t) {
      return t.addShape(this), this;
    }, redraw: function redraw() {
      return this._pattern && this._updateShape(), this;
    }, setStyle: function setStyle(t) {
      return L.setOptions(this, t), this._pattern && this._updateStyle(), this;
    }, setShape: function setShape(t) {
      this.options = L.extend({}, this.options, t), this._updateShape();
    } }), L.Pattern.include({ addShape: function addShape(t) {
      var e = L.stamp(t);return this._shapes[e] ? t : (this._shapes[e] = t, t.onAdd(this), void 0);
    } }), L.PatternShape.SVG_NS = "http://www.w3.org/2000/svg", L.PatternShape = L.PatternShape.extend({ _createElement: function _createElement(t) {
      return e.createElementNS(L.PatternShape.SVG_NS, t);
    }, _initDom: L.Util.falseFn, _updateShape: L.Util.falseFn, _initDomElement: function _initDomElement(t) {
      this._dom = this._createElement(t), this.options.className && L.DomUtil.addClass(this._dom, this.options.className), this._updateStyle();
    }, _addDom: function _addDom() {
      this._pattern._dom.appendChild(this._dom);
    }, _updateStyle: function _updateStyle() {
      var t = this._dom,
          e = this.options;t && (e.stroke ? (t.setAttribute("stroke", e.color), t.setAttribute("stroke-opacity", e.opacity), t.setAttribute("stroke-width", e.weight), t.setAttribute("stroke-linecap", e.lineCap), t.setAttribute("stroke-linejoin", e.lineJoin), e.dashArray ? t.setAttribute("stroke-dasharray", e.dashArray) : t.removeAttribute("stroke-dasharray"), e.dashOffset ? t.setAttribute("stroke-dashoffset", e.dashOffset) : t.removeAttribute("stroke-dashoffset")) : t.setAttribute("stroke", "none"), e.fill ? (e.fillPattern ? t.setAttribute("fill", "url(#" + L.stamp(e.fillPattern) + ")") : t.setAttribute("fill", e.fillColor || e.color), t.setAttribute("fill-opacity", e.fillOpacity), t.setAttribute("fill-rule", e.fillRule || "evenodd")) : t.setAttribute("fill", "none"), t.setAttribute("pointer-events", e.pointerEvents || (e.interactive ? "visiblePainted" : "none")));
    } }), L.PatternPath = L.PatternShape.extend({ _initDom: function _initDom() {
      this._initDomElement("path");
    }, _updateShape: function _updateShape() {
      this._dom && this._dom.setAttribute("d", this.options.d);
    } }), L.PatternCircle = L.PatternShape.extend({ options: { x: 0, y: 0, radius: 0 }, _initDom: function _initDom() {
      this._initDomElement("circle");
    }, _updateShape: function _updateShape() {
      this._dom && (this._dom.setAttribute("cx", this.options.x), this._dom.setAttribute("cy", this.options.y), this._dom.setAttribute("r", this.options.radius));
    } }), L.PatternRect = L.PatternShape.extend({ options: { x: 0, y: 0, width: 10, height: 10 }, _initDom: function _initDom() {
      this._initDomElement("rect");
    }, _updateShape: function _updateShape() {
      this._dom && (this._dom.setAttribute("x", this.options.x), this._dom.setAttribute("y", this.options.y), this._dom.setAttribute("width", this.options.width), this._dom.setAttribute("height", this.options.height), this.options.rx && this._dom.setAttribute("rx", this.options.rx), this.options.ry && this._dom.setAttribute("ry", this.options.ry));
    } });
}(window, document);
},{}],"../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55797' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/leaflet.pattern.js"], null)
//# sourceMappingURL=/leaflet.pattern.d060d503.map