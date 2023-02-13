// DOM elements
const $container = document.querySelector(".container")
const $loading = document.querySelector(".loading");
const $clock = document.querySelector(".clock");

// On load
renderLoading();
getCurrentTime();

function renderLoading() {
    $loading.innerHTML += loadingComponent();
}

// Events
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
