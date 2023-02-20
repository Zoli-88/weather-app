function generateMap($map, lat, lon) {

    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9seTg4IiwiYSI6ImNsMTZnNHQ0cjE5bm0zZXBkaWJuMGN6bmgifQ.WdZ3VhrsPwsx3ATRVDB5_Q';
    new mapboxgl.Map({
        container: $map,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [lon, lat],
        zoom: 8
    });

//     const geojson = {
//         type: 'FeatureCollection',
//         features: [
//           {
//             type: 'Feature',
//             geometry: {
//               type: 'Point',
//               coordinates: [lon, lat]
//             },
//             properties: {
//               title: 'Mapbox',
//               description: 'Washington, D.C.'
//             }
//           }
//         ]
//       };
      
//       // add markers to map
// for (const feature of geojson.features) {
//     // create a HTML element for each feature
//     const el = document.createElement('div');
//     el.className = 'marker';
  
//     // make a marker for each feature and add to the map
//     new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
//   }
  

}

