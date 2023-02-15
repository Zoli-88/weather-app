// DOM elements
const $container = document.querySelector(".container");
const $loading = document.querySelector(".loading");
const $clock = document.querySelector(".clock");
const $locationInfo = document.querySelector(".location-info");
const $weatherInfo = document.querySelector(".weather-info");

// On load
initRendering();

// Functions
function initRendering() {
    renderLoading();
    getCurrentTime();
    // renderWeatherForecast();
}

function renderLoading() {
    $loading.innerHTML += loadingComponent();
}

function renderClearLoading() {
    $loading.remove();
}

function renderTime(clock) {
    renderClearTime();
    $clock.textContent = clockComponent(clock);
}

function renderClearTime() {
    $clock.textContent = '';
}

function renderLocationInfo(city, country) {
    $locationInfo.textContent = locationInfoComponent(city, country);
}

function renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon) {
    $weatherInfo.insertAdjacentHTML("afterbegin", weatherInfoComponent(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon));
}

async function renderWeatherForecast() {
    const ICON_SIZE = "4x";

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
            renderClearLoading();
            renderForecastGraphic(weeklyTemp);
            renderLocationInfo(city, country);
            renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);
        })

    } catch (error) {
        console.log(error);
    }
}

function renderForecastGraphic(weeklyTemp) {
    const ctx = document.getElementById('chart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Temperature (°C)',
                data: weeklyTemp,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function renderSearchByCity(e) {
    e.preventDefault();
    const ICON_SIZE = "4x";
    const formData = new FormData(e.target);
    const citySearch = formData.get("city");

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
        renderClearLoading();
        renderForecastGraphic(weeklyTemp);
        renderLocationInfo(city, country);
        renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon);

    } catch (error) {
        console.log(error)
    }

}