import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

const scatterplot = () =>
  new ScatterplotLayer({
    id: "scatter",
    data: "./crime.json",
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.Long, d.Lat],
    getFillColor: d => (d.Shooting > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100])
  });

window.initMap = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.0, lng: -100.0 },
    zoom: 5
  });

  const overlay = new GoogleMapsOverlay({
    layers: [scatterplot()]
  });

  overlay.setMap(map);
};
