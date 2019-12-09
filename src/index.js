import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { ScatterplotLayer } from "@deck.gl/layers";

const scatterplot = () =>
  new ScatterplotLayer({
    id: "scatter",
    data: "./crime.json",
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.Long, d.Lat],
    getFillColor: d =>
      d.Shooting > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
    pickable: true,
    onClick: ({ object, x, y }) => {
      const el = document.getElementById("tooltip");
      if (object) {
        const { OCCURRED_ON_DATE, OFFENSE_DESCRIPTION } = object;
        el.innerHTML = `<h1>${OCCURRED_ON_DATE} Type: ${OFFENSE_DESCRIPTION}</h1>`;
        el.style.position = "fixed";
        el.style.display = "block";
        el.style.backgroundColor = "white";
        el.style.opacity = 0.9;
        el.style.left = x + "px";
        el.style.top = y + "px";
      } else {
        el.style.opacity = 0.0;
        el.style.display = "none";
      }
    }
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
