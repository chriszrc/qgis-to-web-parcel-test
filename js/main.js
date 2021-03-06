var highlightLayer;

function highlightFeature(e) {
  highlightLayer = e.target;

  if (e.target.feature.geometry.type === 'LineString') {
    highlightLayer.setStyle({
      color: '#ffff00',
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
}).fitBounds([
  [-79.80639003863648, -188.147969675],
  [169.07272003863648, 188.74762667500036]
]);
var hash = new L.Hash(map);
map.attributionControl.addAttribution('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a>');
var bounds_group = new L.featureGroup([]);

function setBounds() {}

function pop_cb_2017_us_state_20m_0(feature, layer) {
  layer.on({
    mouseout: function(e) {
      for (i in e.target._eventParents) {
        e.target._eventParents[i].resetStyle(e.target);
      }
    },
    mouseover: highlightFeature,
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
    fillColor: 'rgba(146,88,78,1.0)',
  }
}
map.createPane('pane_cb_2017_us_state_20m_0');
map.getPane('pane_cb_2017_us_state_20m_0').style.zIndex = 400;
map.getPane('pane_cb_2017_us_state_20m_0').style['mix-blend-mode'] = 'normal';
var layer_cb_2017_us_state_20m_0 = new L.geoJson(json_cb_2017_us_state_20m_0, {
  attribution: '<a href=""></a>',
  pane: 'pane_cb_2017_us_state_20m_0',
  onEachFeature: pop_cb_2017_us_state_20m_0,
  style: style_cb_2017_us_state_20m_0_0,
});
bounds_group.addLayer(layer_cb_2017_us_state_20m_0);
map.addLayer(layer_cb_2017_us_state_20m_0);
var osmGeocoder = new L.Control.Geocoder({
  collapsed: true,
  position: 'topleft',
  text: 'Search',
  title: 'Testing'
}).addTo(map);
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
  .className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
  .title += 'Search for a place';
var baseMaps = {};
L.control.layers(baseMaps, {
  '<img src="legend/cb_2017_us_state_20m_0.png" /> cb_2017_us_state_20m': layer_cb_2017_us_state_20m_0,
}, {
  collapsed: false
}).addTo(map);
setBounds();
