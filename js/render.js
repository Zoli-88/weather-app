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
}

function renderLoading() {
    $loading.innerHTML += loadingComponent();
}

function renderClearLoading() {
    $loading.remove();
}

function renderClearTime() {
    $clock.textContent = '';
}

function renderTime(clock) {
    renderClearTime();
    $clock.textContent = clockComponent(clock);
}

function renderLocationInfo(city, country) {
    $locationInfo.textContent = locationInfoComponent(city, country);
}

function renderWeatherInfo(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon) {
    $weatherInfo.insertAdjacentHTML("afterbegin", weatherInfoComponent(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon));
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

    function renderSearchByCity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    console.log(search);
}