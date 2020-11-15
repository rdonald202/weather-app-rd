function formatDate(timestamp) {
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
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
   return `${hours}:${minutes}`;
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
  let temperature = document.querySelector ("#temperature");
  temperature.innerHTML = `${currentTemperature}`;

  let weatherCondition = response.data.weather[0].description;
  let weather = document.querySelector ("#weatherCondition");
  weather.innerHTML= `${weatherCondition}`;

  let windSpeed = response.data.wind.speed
  let liveWindSpeed= document.querySelector ("#windSpeed");
  liveWindSpeed.innerHTML = `Wind Speed ${windSpeed}km/h`;

  let precipitation = response.data.clouds.all
  let livePrecipitation= document.querySelector("#precipitation");
  livePrecipitation.innerHTML = `Precipitation: ${precipitation}%`;

  let icon = response.data.weather[0].icon
  let iconElement = document.querySelector("#iconHero");
  iconElement.setAttribute( "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  )
  iconElement.innerHTML = `${icon}`;

  celsiusTemperature = Math.round(response.data.main.temp);


}


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h5>
        ${formatHours(forecast.dt * 1000)}
      </h5>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        |
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}


function citySearch (city) {

let apiKey = "0572524632f3441c87819f42001a3a63";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}




let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

citySearch("Glasgow");