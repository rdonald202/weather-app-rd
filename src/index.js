function formatDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];
  let date = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${date} ${month} | ${hours}:${minutes}`;
}
let h2 = document.querySelector("#live-date");
h2.innerHTML = formatDate();

function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#search-text-input");
  h1.innerHTML= cityInput.value;

  citySearch(cityInput.value);
}


function displayWeather (response) {
 
  let search = response.data.name;
  let city = document.querySelector("h1");
  city.innerHTML = `${search}`;

  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector ("#currentTemp");
  temperature.innerHTML = `${currentTemperature}℃`;

  let weatherCondition = response.data.weather[0].description;
  let weather = document.querySelector ("#weatherCondition");
  weather.innerHTML= `${weatherCondition}`;

  let windSpeed = response.data.wind.speed
  let liveWindSpeed= document.querySelector ("#windSpeed");
  liveWindSpeed.innerHTML = `Wind Speed ${windSpeed}km/h`;

}

function citySearch (city) {

let apiKey = "0572524632f3441c87819f42001a3a63";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 
  axios.get(apiUrl).then(displayWeather);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);