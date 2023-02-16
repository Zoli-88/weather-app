function loadingComponent() {
  return `
    <i class="fa-solid fa-snowflake fa-spin"></i>
    <span>Loading, please wait...</span>
  `
}

function clockComponent(clock, date) {
  const currentDate = date || new Date();

  return `
    <span class="date">${currentDate}</span>
    <br>
    <span class="clock">${clock}</span>
  `
}

function locationInfoComponent(city, country) {
  return `
    <span>${city}, ${country}</span>
  `
}

function weatherInfoComponent(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon) {
  return `
    <img src=${weatherInfoIcon} alt=${weatherInfo}/>
    <span class="current-temperature">${currentTemp} &degC</span>
    <span>${weatherInfo}</span>
    <span>Min ${minTemp} &degC / Max ${maxTemp} &degC</span>
  `
}