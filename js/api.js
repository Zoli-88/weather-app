async function listWeatherForecast(lat, lon, citySearch) {
    const API_KEY = "ad6751393ee2ba66fdf0d09e46a0cc51";
    const UNITS = "metric";
    const BASE_API = "https://api.openweathermap.org/data/2.5/forecast";

    let endpointUrl = `${BASE_API}`;

    if (lat && lon) {
        endpointUrl += `?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}`;
        const response = await fetch(endpointUrl);
        const data = await response.json();
        return data;
    }
    
     if (citySearch) {
        endpointUrl += `?q=${citySearch}&appid=${API_KEY}`;
        const response = await fetch(endpointUrl);
        const data = await response.json();
        return data;
    }

    else {
        console.log("TRY AGAIN")
    }
}

// let currentLocation = {
//     lat: null,
//     lon: null
// };

// const GEOLOCATION_OPTIONS = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// };

// function getUsersLocation() {
//     navigator.geolocation.getCurrentPosition(setPosition,handleErrorGeolocation, GEOLOCATION_OPTIONS);
// }

// function setPosition(position) {
//     console.log(position);
//     currentLocation.lat = position.coords.latitude;
//     currentLocation.lon = position.coords.longitude;    
// }

// function handleErrorGeolocation(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
// }