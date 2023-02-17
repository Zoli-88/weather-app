function generateMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9seTg4IiwiYSI6ImNsMTZnNHQ0cjE5bm0zZXBkaWJuMGN6bmgifQ.WdZ3VhrsPwsx3ATRVDB5_Q';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
    });
}

