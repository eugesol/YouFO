/* eslint-disable no-unused-vars */

fs.readFile("../../seeders/geoJSON.json", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  dataLoader(data);
});

function dataLoader(data) {
  map.data.loadGeoJson("data.json");
}

function initMap() {
  // The location of Geometric Center of the U.S.
  const osborne = { lat: 39.224087, lng: -98.542152 };
  // The map, centered at Osborne
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: osborne
  });
}
