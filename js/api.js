async function getWeatherInfo(lat, lon) {

    const ICON_SIZE = "4x";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=ad6751393ee2ba66fdf0d09e46a0cc51`);
    const data = await response.json();
    if (data) {
        renderClearLoading();
        console.log(data);
        const city = data.city.name;
        const country = data.city.country;
        const currentDay = data.list[0];
        const currentTemp = Math.round(currentDay.main.temp);
        const maxTemp = Math.round(currentDay.main.temp_max);
        const minTemp = Math.round(currentDay.main.temp_min);
        const weatherInfo = currentDay.weather[0].main;
        const weatherInfoIcon = `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}@${ICON_SIZE}.png`;
        let weeklyTemp = [];
        //  Simulating 5 days of the week, because API returns random hours instead of 3 hours/day like they said
        for (let i = 0; i < 15; i += 3) {
            const dailyTemp = Math.round(data.list[i].main.temp);
            weeklyTemp.push(dailyTemp);
        }
        console.log(weeklyTemp);
        renderForecastGraphic(weeklyTemp);
        renderLocationInfo(city, country);
        renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
    }
}

// async function searchByCity() {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=ad6751393ee2ba66fdf0d09e46a0cc51`);
//     const data = await response.json();
// }

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
        getWeatherInfo(currentLocation.lat, currentLocation.lon)
    });
}

function handleErrorGeolocation(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(getGeolocation, handleErrorGeolocation, GEOLOCATION_OPTIONS);




async function listWeatherForecast() {
    // fetch
    // response
    // data
    // return data
}

async function renderWeatherForecast() {
    const forecast = await listWeatherForecast();
    // call the three rendering functions
}