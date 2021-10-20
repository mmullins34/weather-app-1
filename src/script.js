let now = new Date();

let dateInput = document.querySelector("#date-input");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  hours = `0${minutes}`;
}
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

dateInput.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function getCurrentWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function findPosition(position) {
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(getCurrentWeather);
}

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

function showCity(city) {
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getCurrentWeather);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCurrentLocation);

let button = document.querySelector("#current-location");
button.addEventListener("click", showCurrentCity);
