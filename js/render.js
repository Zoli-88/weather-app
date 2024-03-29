// Constants / Variables
const ICON_SIZE = "2x";

// DOM elements
const $container = document.querySelector(".container");
const $loading = document.querySelector(".loading");
const $time = document.querySelector("#time");
const $location = document.querySelector("#location");
const $weather = document.querySelector("#weather");
const $map = document.querySelector("#map");
const $cardList = document.querySelector("#card-list");
const $listMessage = document.querySelector("#list-message");

// ChartJS library
const $canvas = document.getElementById("chart");
const ctx = $canvas.getContext("2d");
let myChart;

// Local storage
let weatherDataList = JSON.parse(localStorage.getItem("weatherDataList")) || [];
// On load
initRendering();

// Functions
function initRendering() {
    if (weatherDataList.length) {
        clearListMessage();
        renderCardList();
    }
    renderStatus();
    getCurrentTime();
    renderWeatherForecast();
}

function renderCardList() {
    weatherDataList.forEach(weatherData => {
        $cardList.innerHTML += cardComponent(weatherData);
    })
}

function renderStatus(error) {
    $loading.innerHTML = statusComponent(error);
}

function renderTime(clock, date) {
    $time.innerHTML = clockComponent(clock, date);
}

function renderLocation(city, country) {
    $location.innerHTML = locationComponent(city, country);
}

function renderWeather(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon) {
    $weather.innerHTML = weatherComponent(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
}

function renderMap($map, lat, lon) {
    generateMap($map, lat, lon);
}

function renderForecastGraphic(weeklyTemp) {
    generateChart(weeklyTemp);
}

// Events

async function renderWeatherForecast() {
    try {
        navigator.geolocation.getCurrentPosition(async position => {
            const forecast = await listWeatherForecast(position.coords.latitude, position.coords.longitude);
            const city = forecast.city.name;
            const country = forecast.city.country;
            const lat = forecast.city.coord.lat;
            const lon = forecast.city.coord.lon;
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
            clearStatus();
            renderForecastGraphic(weeklyTemp);
            renderMap($map, lat, lon);
            renderLocation(city, country);
            renderWeather(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
        })

    } catch (error) {
        console.log(error);
    }
}

async function renderSearchByCity(e, city) {
    let citySearch;

    if (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        citySearch = formData.get("city");
    } else {
        citySearch = city;
    }

    clearForecast();
    renderStatus();

    try {
        const forecast = await listWeatherForecast(null, null, citySearch);
        const city = forecast.city.name;
        const country = forecast.city.country;
        const lat = forecast.city.coord.lat;
        const lon = forecast.city.coord.lon;
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
        
        let alreadyExists = false;

        weatherDataList.forEach((weatherData, index) => {
            if (weatherData.lat === lat && weatherData.lon === lon) {
                alreadyExists = true;
                weatherDataList.splice(index, 1);
                weatherDataList.unshift(weatherData);
                localStorage.setItem("weatherDataList", JSON.stringify(weatherDataList))
            }
        })

        if (!alreadyExists) {
            const newWeatherData = {
                // if the key value pairs are identical, no need to add the value
                city,
                country,
                lat,
                lon
            }
            weatherDataList.unshift(newWeatherData)
            localStorage.setItem("weatherDataList", JSON.stringify(weatherDataList))
        }

        clearStatus();
        renderForecastGraphic(weeklyTemp);
        renderMap($map, lat, lon);
        renderLocation(city, country);
        renderWeather(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
        clearListMessage();
        clearCardList();
        renderCardList();

    } catch (error) {
        clearStatus();
        renderStatus(error);
    }
}

async function renderSearchByCoords(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const latSearch = formData.get("latitude");
    const lonSearch = formData.get("longitude");

    clearForecast();
    renderStatus();
    try {
        const forecast = await listWeatherForecast(latSearch, lonSearch, null);
        const city = forecast.city.name;
        const country = forecast.city.country;
        const lat = forecast.city.coord.lat;
        const lon = forecast.city.coord.lon;
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

        let alreadyExists = false;

        weatherDataList.forEach((weatherData, index) => {
            if (weatherData.lat === lat && weatherData.lon === lon) {
                alreadyExists = true;
                weatherDataList.splice(index, 1);
                weatherDataList.unshift(weatherData);
                localStorage.setItem("weatherDataList", JSON.stringify(weatherDataList))
            }
        })

        if (!alreadyExists) {
            const newWeatherData = {
                // if the key value pairs are identical, no need to add the value
                city,
                country,
                lat,
                lon
            }
            weatherDataList.unshift(newWeatherData)
            localStorage.setItem("weatherDataList", JSON.stringify(weatherDataList))
        }

        clearStatus();
        renderForecastGraphic(weeklyTemp);
        renderMap($map, lat, lon);
        renderLocation(city, country);
        renderWeather(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
        clearListMessage();
        clearCardList();
        renderCardList();

    } catch (error) {
        clearStatus();
        renderStatus(error);
    }
}

// Clearing functions
function clearStatus() {
    $loading.innerHTML = "";
}

function clearCardList() {
    $cardList.innerHTML = "";
}

function clearListMessage() {
    $listMessage.innerHTML = "";
}

function clearForecastGraphic() {
    // we reset the chart each time we search for a new forecast so that the chart won't be in use
    if (myChart) {
        myChart.destroy();
    }
}

function clearLocation() {
    $location.innerHTML = "";
}

function clearWeather() {
    $weather.innerHTML = "";
}

function clearMap() {
    $map.innerHTML = "";
}

function clearForecast() {
    clearForecastGraphic();
    clearMap();
    clearLocation();
    clearWeather();
}
