function loadingComponent() {
  return `
    <i class="fa-solid fa-snowflake fa-spin"></i>
    <span>Loading, please wait...</span>
  `
}

function clockComponent(clock) {
  return `${clock}`
}

function locationInfoComponent(city, country) {
  return `${city}, ${country}`
}

function weatherInfoComponent(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon) {
  return `
    <img src=${weatherInfoIcon} alt=${weatherInfo}/>
    <ul>
      <li class="current-temperature">${currentTemp} &degC</li>
      <li>${weatherInfo}</li>
      <li>Min ${minTemp} &degC/Max ${maxTemp} &degC</li>
    </ul>
  `
}