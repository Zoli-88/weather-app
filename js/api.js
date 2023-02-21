async function listWeatherForecast(lat, lon, citySearch) {
    const API_KEY = "ad6751393ee2ba66fdf0d09e46a0cc51";
    const UNITS = "metric";
    const BASE_API = "https://api.openweathermap.org/data/2.5/forecast";

    let endpointUrl = `${BASE_API}`;

    if (lat && lon) {
        endpointUrl += `?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}`;
    }
    
    if (citySearch) {
        endpointUrl += `?q=${citySearch}&units=${UNITS}&appid=${API_KEY}`;
    }

    const response = await fetch(endpointUrl);
    const data = await response.json();

    if (!response.ok) {
        throw data.message;
    }

    return data;
}