const APIKEY = "";

const containerWeather = document.querySelector(".weather");
const containerError = document.querySelector(".error");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
containerWeather.innerHTML = "";

async function checkWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
  const response = await fetch(url);

  if (response.status !== 404) {
    containerError.style.display = "none"; // Hide error message
    containerWeather.style.display = "block"; // Show weather container

    const data = await response.json();

    const temperature = Math.floor(data.main.temp); // Temperature in Celsius
    const cityName = data.name;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const mainWeatherCond = `${data.weather[0].main.toLowerCase()}.png`;

    // Update the content of the existing .weather container
    containerWeather.innerHTML = `
        <img src="images/${mainWeatherCond}" class="weather-icon" alt="">
        <h1 class="temp">${temperature}°C</h1>
        <h2 class="city">${cityName}</h2>
        <div class="details">
          <div class="col">
            <img src="images/humidity.png" alt="">
            <div>
              <p class="humidity">${humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div class="col">
            <img src="images/wind.png" alt="">
            <div>
              <p class="wind">${windSpeed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>`;
  } else {
    containerWeather.style.display = "none"; // Hide weather container
    containerError.style.display = "block"; // Show error message
    containerError.textContent = "City not found. Please try again.";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    containerWeather.style.display = "none";
    containerError.style.display = "block";
    containerError.textContent = "Please enter a valid city name.";
  }
});
