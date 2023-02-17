function statusComponent(error) {
  if (error) {
    return `
      <i class="fa-solid fa-cloud-rain"></i>
      <span>Error: ${error}. Please try again</span>
    `
  } 

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

function locationComponent(city, country) {
  return `
    <span>${city}, ${country}</span>
  `
}

function weatherComponent(currentTemp, maxTemp, minTemp, weatherInfo, weatherInfoIcon) {
  return `
    <img src=${weatherInfoIcon} alt=${weatherInfo}/>
    <span class="current-temperature">${currentTemp} &degC</span>
    <span>${weatherInfo}</span>
    <span>Min ${minTemp} &degC / Max ${maxTemp} &degC</span>
  `
}

function cardComponent(weatherData) {
  return `
    <div class="weather-card">${weatherData.city}, ${weatherData.country}
    <br>
    Latitude: ${weatherData.lat}
    <br>
    Longitude: ${weatherData.lon}
    </div>
  `
}