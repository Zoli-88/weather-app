
async function getWeatherInfo() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Cluj-Napoca&appid=ad6751393ee2ba66fdf0d09e46a0cc51");
    const data = await response.json();
    console.log(data);
}
getWeatherInfo();