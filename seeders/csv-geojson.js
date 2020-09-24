const fs = require("fs");

// {
//   "type": "Feature",
//   "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   },
//   "properties": {
//     "name": "Dinagat Islands"
//   }
// }

const featureCollection = {
  type: "FeatureCollection",
  features: []
};

fs.readFile("complete.csv", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  const lines = data.split(/\r?\n/);
  const cols = lines.shift();
  featureCompiler(lines, cols);
});

function featureBuilder(line, keyList) {
  const lineItems = line.split(",");
  console.log(keyList);
  const feature = {
    type: "Feature",
    geometry: {
      type: "Point"
    },
    properties: {}
  };

  feature.geometry.coordinates = [lineItems[11 - 2], lineItems[11 - 1]];
  keyList.forEach((key, i) => {
    feature.properties[key] = lineItems[i];
  });
  return feature;
}

function featureCompiler(lines, keys) {
  const keyArr = keys.split(",");
  lines.forEach(line =>{
    const feature = featureBuilder(line, keyArr);
    featureCollection.features.push(feature);
  });
  console.log(featureCollection.features.length);
}
