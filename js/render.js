// Constants / Variables
const ICON_SIZE = "2x";


// DOM elements
const $container = document.querySelector(".container");
const $loading = document.querySelector(".loading");
const $timeandDateInfo = document.querySelector("#time");
const $locationInfo = document.querySelector("#location");
const $weatherInfo = document.querySelector("#weather");
const canvas = document.getElementById('chart');
const ctx = canvas.getContext("2d");
let myChart;

// On load
initRendering();

// Functions
function initRendering() {
    renderLoading();
    getCurrentTime();
    renderWeatherForecast();
}

function renderLoading() {
    $loading.innerHTML = loadingComponent();
}

function renderTime(clock, date) {
    $timeandDateInfo.innerHTML = clockComponent(clock, date);
}

function renderLocationInfo(city, country) {
    $locationInfo.innerHTML = locationInfoComponent(city, country);
}

function renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon) {
    $weatherInfo.innerHTML = weatherInfoComponent(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
}

async function renderWeatherForecast() {

    try {
        navigator.geolocation.getCurrentPosition(async position => {
            const forecast = await listWeatherForecast(position.coords.latitude, position.coords.longitude);
            const city = forecast.city.name;
            const country = forecast.city.country;
            const currentDay = forecast.list[0];
            const currentTemp = Math.round(currentDay.main.temp);
            const maxTemp = Math.round(currentDay.main.temp_max);
            const minTemp = Math.round(currentDay.main.temp_min);
            const weatherInfo = currentDay.weather[0].main;
            const weatherInfoIcon = `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}@${ICON_SIZE}.png`;
            let weeklyTemp = [];
            //  Simulating 5 days of the week, because API returns random hours instead of 3 hours/day like they said
            for (let i = 0; i < 15; i += 3) {
                const dailyTemp = Math.round(forecast.list[i].main.temp);
                weeklyTemp.push(dailyTemp);
            }
            clearLoading();
            renderForecastGraphic(weeklyTemp);
            renderLocationInfo(city, country);
            renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
        })

    } catch (error) {
        console.log(error);
    }
}

function renderForecastGraphic(weeklyTemp) {
    generateChart(weeklyTemp);
}

async function renderSearchByCity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const citySearch = formData.get("city");
    clearForecast();
    renderLoading();
    try {
        const forecast = await listWeatherForecast(null, null, citySearch);
        console.log(forecast);
        const city = forecast.city.name;
        const country = forecast.city.country;
        const currentDay = forecast.list[0];
        const currentTemp = Math.round(currentDay.main.temp);
        const maxTemp = Math.round(currentDay.main.temp_max);
        const minTemp = Math.round(currentDay.main.temp_min);
        const weatherInfo = currentDay.weather[0].main;
        const weatherInfoIcon = `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}@${ICON_SIZE}.png`;
        let weeklyTemp = [];
        //  Simulating 5 days of the week, because API returns random hours instead of 3 hours/day like they said
        for (let i = 0; i < 15; i += 3) {
            const dailyTemp = Math.round(forecast.list[i].main.temp);
            weeklyTemp.push(dailyTemp);
        }
        clearLoading();
        renderForecastGraphic(weeklyTemp);
        renderLocationInfo(city, country);
        renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);

    } catch (error) {
        console.log(error)
    }
}

async function renderSearchByCoords(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const lat = formData.get("latitude");
    const lon = formData.get("longitude");

    clearForecast();
    renderLoading();
    try {
        const forecast = await listWeatherForecast(lat, lon, null);
        console.log(forecast);
        const city = forecast.city.name;
        const country = forecast.city.country;
        const currentDay = forecast.list[0];
        const currentTemp = Math.round(currentDay.main.temp);
        const maxTemp = Math.round(currentDay.main.temp_max);
        const minTemp = Math.round(currentDay.main.temp_min);
        const weatherInfo = currentDay.weather[0].main;
        const weatherInfoIcon = `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}@${ICON_SIZE}.png`;
        let weeklyTemp = [];
        //  Simulating 5 days of the week, because API returns random hours instead of 3 hours/day like they said
        for (let i = 0; i < 15; i += 3) {
            const dailyTemp = Math.round(forecast.list[i].main.temp);
            weeklyTemp.push(dailyTemp);
        }
        clearLoading();
        renderForecastGraphic(weeklyTemp);
        renderLocationInfo(city, country);
        renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);

    } catch (error) {
        console.log(error)
    }
}

// Clearing functions
function clearLoading() {
    $loading.innerHTML = '';
}

function clearForecastGraphic() {
    // we reset the chart each time we search for a new forecast so that the chart won't be in use
    if (myChart) {
        myChart.destroy();
    }
}

function clearLocationInfo() {
    $locationInfo.innerHTML = "";
}

function clearWeatherInfo() {
    $weatherInfo.innerHTML = "";
}

function clearForecast() {
    clearForecastGraphic();
    clearLocationInfo();
    clearWeatherInfo();
}
