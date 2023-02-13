async function getWeatherInfo(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad6751393ee2ba66fdf0d09e46a0cc51`);
    const data = await response.json();
    if (data) {
      renderClearLoading();
    }
    return data
}

let currentLocation = {
    lat: null,
    lon: null
};

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

 function getGeolocation() {
    navigator.geolocation.getCurrentPosition(position => {
        currentLocation.lat = position.coords.latitude;
        currentLocation.lon = position.coords.longitude;
        if (currentLocation.lat, currentLocation.lon) {
            getWeatherInfo(currentLocation.lat, currentLocation.lon)
        }
    });
}

function handleErrorGeolocation(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(getGeolocation, handleErrorGeolocation, GEOLOCATION_OPTIONS);