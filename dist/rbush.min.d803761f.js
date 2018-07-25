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
})({"js/rbush.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var i;i = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, i.rbush = t();
  }
}(function () {
  return function t(i, n, e) {
    function r(h, o) {
      if (!n[h]) {
        if (!i[h]) {
          var s = "function" == typeof require && require;if (!o && s) return s(h, !0);if (a) return a(h, !0);var l = new Error("Cannot find module '" + h + "'");throw l.code = "MODULE_NOT_FOUND", l;
        }var f = n[h] = { exports: {} };i[h][0].call(f.exports, function (t) {
          var n = i[h][1][t];return r(n ? n : t);
        }, f, f.exports, t, i, n, e);
      }return n[h].exports;
    }for (var a = "function" == typeof require && require, h = 0; h < e.length; h++) {
      r(e[h]);
    }return r;
  }({ 1: [function (t, i, n) {
      "use strict";
      function e(t, i) {
        return this instanceof e ? (this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), i && this._initFormat(i), void this.clear()) : new e(t, i);
      }function r(t, i, n) {
        if (!n) return i.indexOf(t);for (var e = 0; e < i.length; e++) {
          if (n(t, i[e])) return e;
        }return -1;
      }function a(t, i) {
        h(t, 0, t.children.length, i, t);
      }function h(t, i, n, e, r) {
        r || (r = p(null)), r.minX = 1 / 0, r.minY = 1 / 0, r.maxX = -(1 / 0), r.maxY = -(1 / 0);for (var a, h = i; h < n; h++) {
          a = t.children[h], o(r, t.leaf ? e(a) : a);
        }return r;
      }function o(t, i) {
        return t.minX = Math.min(t.minX, i.minX), t.minY = Math.min(t.minY, i.minY), t.maxX = Math.max(t.maxX, i.maxX), t.maxY = Math.max(t.maxY, i.maxY), t;
      }function s(t, i) {
        return t.minX - i.minX;
      }function l(t, i) {
        return t.minY - i.minY;
      }function f(t) {
        return (t.maxX - t.minX) * (t.maxY - t.minY);
      }function u(t) {
        return t.maxX - t.minX + (t.maxY - t.minY);
      }function c(t, i) {
        return (Math.max(i.maxX, t.maxX) - Math.min(i.minX, t.minX)) * (Math.max(i.maxY, t.maxY) - Math.min(i.minY, t.minY));
      }function m(t, i) {
        var n = Math.max(t.minX, i.minX),
            e = Math.max(t.minY, i.minY),
            r = Math.min(t.maxX, i.maxX),
            a = Math.min(t.maxY, i.maxY);return Math.max(0, r - n) * Math.max(0, a - e);
      }function d(t, i) {
        return t.minX <= i.minX && t.minY <= i.minY && i.maxX <= t.maxX && i.maxY <= t.maxY;
      }function x(t, i) {
        return i.minX <= t.maxX && i.minY <= t.maxY && i.maxX >= t.minX && i.maxY >= t.minY;
      }function p(t) {
        return { children: t, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -(1 / 0), maxY: -(1 / 0) };
      }function M(t, i, n, e, r) {
        for (var a, h = [i, n]; h.length;) {
          n = h.pop(), i = h.pop(), n - i <= e || (a = i + Math.ceil((n - i) / e / 2) * e, g(t, a, i, n, r), h.push(i, a, a, n));
        }
      }i.exports = e;var g = t("quickselect");e.prototype = { all: function all() {
          return this._all(this.data, []);
        }, search: function search(t) {
          var i = this.data,
              n = [],
              e = this.toBBox;if (!x(t, i)) return n;for (var r, a, h, o, s = []; i;) {
            for (r = 0, a = i.children.length; r < a; r++) {
              h = i.children[r], o = i.leaf ? e(h) : h, x(t, o) && (i.leaf ? n.push(h) : d(t, o) ? this._all(h, n) : s.push(h));
            }i = s.pop();
          }return n;
        }, collides: function collides(t) {
          var i = this.data,
              n = this.toBBox;if (!x(t, i)) return !1;for (var e, r, a, h, o = []; i;) {
            for (e = 0, r = i.children.length; e < r; e++) {
              if (a = i.children[e], h = i.leaf ? n(a) : a, x(t, h)) {
                if (i.leaf || d(t, h)) return !0;o.push(a);
              }
            }i = o.pop();
          }return !1;
        }, load: function load(t) {
          if (!t || !t.length) return this;if (t.length < this._minEntries) {
            for (var i = 0, n = t.length; i < n; i++) {
              this.insert(t[i]);
            }return this;
          }var e = this._build(t.slice(), 0, t.length - 1, 0);if (this.data.children.length) {
            if (this.data.height === e.height) this._splitRoot(this.data, e);else {
              if (this.data.height < e.height) {
                var r = this.data;this.data = e, e = r;
              }this._insert(e, this.data.height - e.height - 1, !0);
            }
          } else this.data = e;return this;
        }, insert: function insert(t) {
          return t && this._insert(t, this.data.height - 1), this;
        }, clear: function clear() {
          return this.data = p([]), this;
        }, remove: function remove(t, i) {
          if (!t) return this;for (var n, e, a, h, o = this.data, s = this.toBBox(t), l = [], f = []; o || l.length;) {
            if (o || (o = l.pop(), e = l[l.length - 1], n = f.pop(), h = !0), o.leaf && (a = r(t, o.children, i), a !== -1)) return o.children.splice(a, 1), l.push(o), this._condense(l), this;h || o.leaf || !d(o, s) ? e ? (n++, o = e.children[n], h = !1) : o = null : (l.push(o), f.push(n), n = 0, e = o, o = o.children[0]);
          }return this;
        }, toBBox: function toBBox(t) {
          return t;
        }, compareMinX: s, compareMinY: l, toJSON: function toJSON() {
          return this.data;
        }, fromJSON: function fromJSON(t) {
          return this.data = t, this;
        }, _all: function _all(t, i) {
          for (var n = []; t;) {
            t.leaf ? i.push.apply(i, t.children) : n.push.apply(n, t.children), t = n.pop();
          }return i;
        }, _build: function _build(t, i, n, e) {
          var r,
              h = n - i + 1,
              o = this._maxEntries;if (h <= o) return r = p(t.slice(i, n + 1)), a(r, this.toBBox), r;e || (e = Math.ceil(Math.log(h) / Math.log(o)), o = Math.ceil(h / Math.pow(o, e - 1))), r = p([]), r.leaf = !1, r.height = e;var s,
              l,
              f,
              u,
              c = Math.ceil(h / o),
              m = c * Math.ceil(Math.sqrt(o));for (M(t, i, n, m, this.compareMinX), s = i; s <= n; s += m) {
            for (f = Math.min(s + m - 1, n), M(t, s, f, c, this.compareMinY), l = s; l <= f; l += c) {
              u = Math.min(l + c - 1, f), r.children.push(this._build(t, l, u, e - 1));
            }
          }return a(r, this.toBBox), r;
        }, _chooseSubtree: function _chooseSubtree(t, i, n, e) {
          for (var r, a, h, o, s, l, u, m;;) {
            if (e.push(i), i.leaf || e.length - 1 === n) break;for (u = m = 1 / 0, r = 0, a = i.children.length; r < a; r++) {
              h = i.children[r], s = f(h), l = c(t, h) - s, l < m ? (m = l, u = s < u ? s : u, o = h) : l === m && s < u && (u = s, o = h);
            }i = o || i.children[0];
          }return i;
        }, _insert: function _insert(t, i, n) {
          var e = this.toBBox,
              r = n ? t : e(t),
              a = [],
              h = this._chooseSubtree(r, this.data, i, a);for (h.children.push(t), o(h, r); i >= 0 && a[i].children.length > this._maxEntries;) {
            this._split(a, i), i--;
          }this._adjustParentBBoxes(r, a, i);
        }, _split: function _split(t, i) {
          var n = t[i],
              e = n.children.length,
              r = this._minEntries;this._chooseSplitAxis(n, r, e);var h = this._chooseSplitIndex(n, r, e),
              o = p(n.children.splice(h, n.children.length - h));o.height = n.height, o.leaf = n.leaf, a(n, this.toBBox), a(o, this.toBBox), i ? t[i - 1].children.push(o) : this._splitRoot(n, o);
        }, _splitRoot: function _splitRoot(t, i) {
          this.data = p([t, i]), this.data.height = t.height + 1, this.data.leaf = !1, a(this.data, this.toBBox);
        }, _chooseSplitIndex: function _chooseSplitIndex(t, i, n) {
          var e, r, a, o, s, l, u, c;for (l = u = 1 / 0, e = i; e <= n - i; e++) {
            r = h(t, 0, e, this.toBBox), a = h(t, e, n, this.toBBox), o = m(r, a), s = f(r) + f(a), o < l ? (l = o, c = e, u = s < u ? s : u) : o === l && s < u && (u = s, c = e);
          }return c;
        }, _chooseSplitAxis: function _chooseSplitAxis(t, i, n) {
          var e = t.leaf ? this.compareMinX : s,
              r = t.leaf ? this.compareMinY : l,
              a = this._allDistMargin(t, i, n, e),
              h = this._allDistMargin(t, i, n, r);a < h && t.children.sort(e);
        }, _allDistMargin: function _allDistMargin(t, i, n, e) {
          t.children.sort(e);var r,
              a,
              s = this.toBBox,
              l = h(t, 0, i, s),
              f = h(t, n - i, n, s),
              c = u(l) + u(f);for (r = i; r < n - i; r++) {
            a = t.children[r], o(l, t.leaf ? s(a) : a), c += u(l);
          }for (r = n - i - 1; r >= i; r--) {
            a = t.children[r], o(f, t.leaf ? s(a) : a), c += u(f);
          }return c;
        }, _adjustParentBBoxes: function _adjustParentBBoxes(t, i, n) {
          for (var e = n; e >= 0; e--) {
            o(i[e], t);
          }
        }, _condense: function _condense(t) {
          for (var i, n = t.length - 1; n >= 0; n--) {
            0 === t[n].children.length ? n > 0 ? (i = t[n - 1].children, i.splice(i.indexOf(t[n]), 1)) : this.clear() : a(t[n], this.toBBox);
          }
        }, _initFormat: function _initFormat(t) {
          var i = ["return a", " - b", ";"];this.compareMinX = new Function("a", "b", i.join(t[0])), this.compareMinY = new Function("a", "b", i.join(t[1])), this.toBBox = new Function("a", "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};");
        } };
    }, { quickselect: 2 }], 2: [function (t, i, n) {
      "use strict";
      function e(t, i, n, a, h) {
        for (; a > n;) {
          if (a - n > 600) {
            var o = a - n + 1,
                s = i - n + 1,
                l = Math.log(o),
                f = .5 * Math.exp(2 * l / 3),
                u = .5 * Math.sqrt(l * f * (o - f) / o) * (s - o / 2 < 0 ? -1 : 1),
                c = Math.max(n, Math.floor(i - s * f / o + u)),
                m = Math.min(a, Math.floor(i + (o - s) * f / o + u));e(t, i, c, m, h);
          }var d = t[i],
              x = n,
              p = a;for (r(t, n, i), h(t[a], d) > 0 && r(t, n, a); x < p;) {
            for (r(t, x, p), x++, p--; h(t[x], d) < 0;) {
              x++;
            }for (; h(t[p], d) > 0;) {
              p--;
            }
          }0 === h(t[n], d) ? r(t, n, p) : (p++, r(t, p, a)), p <= i && (n = p + 1), i <= p && (a = p - 1);
        }
      }function r(t, i, n) {
        var e = t[i];t[i] = t[n], t[n] = e;
      }i.exports = e;
    }, {}] }, {}, [1])(1);
});
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
},{}]},{},["../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/rbush.min.js"], null)
//# sourceMappingURL=/rbush.min.d803761f.map