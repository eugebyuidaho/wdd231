const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastContainer = document.querySelector("#forecast");

const apiKey = "3ec8e6687b12aa4ce58f0a50947c8fd8";
const lat = "40.2338";
const lon = "-111.6585";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const currentResponse = await fetch(currentUrl);
    if (!currentResponse.ok) {
      throw new Error(`Current weather error: ${currentResponse.status}`);
    }
    const currentData = await currentResponse.json();
    displayCurrent(currentData);

    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(`Forecast error: ${forecastResponse.status}`);
    }
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
  } catch (error) {
    console.error("Error loading weather:", error);
    currentTemp.textContent = "Weather unavailable";
  }
}

function displayCurrent(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  currentTemp.innerHTML = `${temp}&deg;F`;
  weatherDesc.textContent = description;
}

function displayForecast(data) {
  const noon = data.list.filter(item => item.dt_txt.includes("12:00:00"));
  const threeDays = noon.slice(0, 3);

  forecastContainer.innerHTML = "";

  threeDays.forEach(day => {
    const date = new Date(day.dt_txt);
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const temp = Math.round(day.main.temp);

    const dayDiv = document.createElement("div");
    dayDiv.innerHTML = `
      <p class="forecast-day">${weekday}</p>
      <p class="forecast-temp">${temp}&deg;F</p>
    `;
    forecastContainer.appendChild(dayDiv);
  });
}

getWeather();