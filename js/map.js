function generateMap($map, lat, lon) {

    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9seTg4IiwiYSI6ImNsMTZnNHQ0cjE5bm0zZXBkaWJuMGN6bmgifQ.WdZ3VhrsPwsx3ATRVDB5_Q';
    new mapboxgl.Map({
        container: $map,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [lon, lat],
        zoom: 1
    });
}

