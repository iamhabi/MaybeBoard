// SELECT ELEMENTS
const iconElement = document.querySelectorAll(".weather-icon");
const tempElement = document.querySelectorAll(".temperature-value p");
const descElement = document.querySelectorAll(".temperature-description p");
const locationElement = document.querySelectorAll(".location p");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273.15;
// API KEY
const key = '2985450e2462b8a26a815a8a48ae0459';

var oneHour = 1000 * 60 * 60;
setInterval(getAllWeather(), oneHour);

function getAllWeather() {
    getWeather("Seoul", 0);
    getWeather("Daejeon", 1);
}

// GET WEATHER FROM API PROVIDER
function getWeather(pos, idx) {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${pos}&appid=${key}`;
    
    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather(idx);
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(idx) {
    iconElement[idx].innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement[idx].innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement[idx].innerHTML = weather.description;
    locationElement[idx].innerHTML = `${weather.city}, ${weather.country}`;
}
