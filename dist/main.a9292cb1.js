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
})({"js/main.js":[function(require,module,exports) {
var highlightLayer;

function highlightFeature(e) {
  highlightLayer = e.target;

  if (e.target.feature.geometry.type === 'LineString') {
    highlightLayer.setStyle({
      color: '#ffff00'
    });
  } else {
    highlightLayer.setStyle({
      fillColor: '#ffff00',
      fillOpacity: 1
    });
  }
}
var map = L.map('map', {
  zoomControl: true,
  maxZoom: 28,
  minZoom: 1
}).fitBounds([[-79.80639003863648, -188.147969675], [169.07272003863648, 188.74762667500036]]);
var hash = new L.Hash(map);
map.attributionControl.addAttribution('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a>');
var bounds_group = new L.featureGroup([]);

function setBounds() {}

function pop_cb_2017_us_state_20m_0(feature, layer) {
  layer.on({
    mouseout: function mouseout(e) {
      for (i in e.target._eventParents) {
        e.target._eventParents[i].resetStyle(e.target);
      }
    },
    mouseover: highlightFeature
  });
  var popupContent = '<table>\
            <tr>\
                <th scope="row">STATEFP</th>\
                <td>' + (feature.properties['STATEFP'] !== null ? Autolinker.link(String(feature.properties['STATEFP'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">STATENS</th>\
                <td>' + (feature.properties['STATENS'] !== null ? Autolinker.link(String(feature.properties['STATENS'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">AFFGEOID</th>\
                <td>' + (feature.properties['AFFGEOID'] !== null ? Autolinker.link(String(feature.properties['AFFGEOID'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">GEOID</th>\
                <td>' + (feature.properties['GEOID'] !== null ? Autolinker.link(String(feature.properties['GEOID'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">STUSPS</th>\
                <td>' + (feature.properties['STUSPS'] !== null ? Autolinker.link(String(feature.properties['STUSPS'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">NAME</th>\
                <td>' + (feature.properties['NAME'] !== null ? Autolinker.link(String(feature.properties['NAME'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">LSAD</th>\
                <td>' + (feature.properties['LSAD'] !== null ? Autolinker.link(String(feature.properties['LSAD'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">ALAND</th>\
                <td>' + (feature.properties['ALAND'] !== null ? Autolinker.link(String(feature.properties['ALAND'])) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">AWATER</th>\
                <td>' + (feature.properties['AWATER'] !== null ? Autolinker.link(String(feature.properties['AWATER'])) : '') + '</td>\
            </tr>\
        </table>';
  layer.bindPopup(popupContent, {
    maxHeight: 400
  });
}

function style_cb_2017_us_state_20m_0_0() {
  return {
    pane: 'pane_cb_2017_us_state_20m_0',
    opacity: 1,
    color: 'rgba(35,35,35,1.0)',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 1.0,
    fill: true,
    fillOpacity: 1,
    fillColor: 'rgba(146,88,78,1.0)'
  };
}
map.createPane('pane_cb_2017_us_state_20m_0');
map.getPane('pane_cb_2017_us_state_20m_0').style.zIndex = 400;
map.getPane('pane_cb_2017_us_state_20m_0').style['mix-blend-mode'] = 'normal';
var layer_cb_2017_us_state_20m_0 = new L.geoJson(json_cb_2017_us_state_20m_0, {
  attribution: '<a href=""></a>',
  pane: 'pane_cb_2017_us_state_20m_0',
  onEachFeature: pop_cb_2017_us_state_20m_0,
  style: style_cb_2017_us_state_20m_0_0
});
bounds_group.addLayer(layer_cb_2017_us_state_20m_0);
map.addLayer(layer_cb_2017_us_state_20m_0);
var osmGeocoder = new L.Control.Geocoder({
  collapsed: true,
  position: 'topleft',
  text: 'Search',
  title: 'Testing'
}).addTo(map);
document.getElementsByClassName('leaflet-control-geocoder-icon')[0].className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0].title += 'Search for a place';
var baseMaps = {};
L.control.layers(baseMaps, {
  '<img src="legend/cb_2017_us_state_20m_0.png" /> cb_2017_us_state_20m': layer_cb_2017_us_state_20m_0
}, {
  collapsed: false
}).addTo(map);
setBounds();
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
},{}]},{},["../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.a9292cb1.map