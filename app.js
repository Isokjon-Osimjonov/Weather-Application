const mainTemperature = document.querySelector(".main_temperature");
const mainPosition = document.querySelector(".main_position");
const weatherImage = document.querySelector(".weather_image");
const mainForm = document.querySelector("form");
const mainInput = document.querySelector("input");
const forecast = document.querySelector(".forecast");
const detailedPosition = document.querySelector(".detailed_position");
const calendar = document.querySelector(".calendar");
const status = document.querySelector(".status");

async function loadOnRefresh() {
  await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${
      mainInput.value === "" ? "Namangan" : mainInput.value
    }&days=7&aqi=yes&alerts=yes`
  )
    .then((response) => response.json())
    .then((data) => getRealData(data));
}

loadOnRefresh();

mainForm.addEventListener("submit", getWeatherData);

async function getWeatherData(e) {
  e.preventDefault();
  try {
    await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${
        mainInput.value === "" ? "Namangan" : mainInput.value
      }&days=7&aqi=yes&alerts=yes`
    )
      .then((response) => response.json())
      .then((data) => getRealData(data));
  } catch (err) {
    console.log(err);
  }
}

function getRealData(data) {
  const mainPositionP = document.querySelector(".city_name");
  mainTemperature.innerHTML = data.current.temp_c + "°C";
  mainPositionP.innerHTML = data.location.name;
  weatherImage.setAttribute("src", data.current.condition.icon);
  detailedPosition.innerHTML = data.location.name + " " + data.location.country;
  status.innerHTML = data.current.condition.text;
  calendar.innerHTML = data.location.localtime;
  forecast.innerHTML = "";
  data.forecast.forecastday.forEach((day) => {
    const everyDay = document.createElement("div");
    everyDay.className = "day";
    everyDay.innerHTML = `
    <div> 
      <h1 class="day_date">${day.date}</h1>
      <div class="temp_title">Average Temperature in this day</div>
        <div class="day_temp">
          <div class="temp_pointer" style="left: calc(${
            day.day.avgtemp_c * 0.8
          }% + 50%)">
          <div class="pointer_tooltip">${day.day.avgtemp_c}</div>
        </div>
      </div>
      <p class="temp_title">Humidity</p>
      <div class="day_option">
        <div class="humidity">
          <div class="circle_diagramm">
            <div class="percent_show"> <h1 class="humidity_perc">${
              day.day.avghumidity
            }%</h1></div>
            <div class="diagramm_filter" style="height: ${
              day.day.avghumidity
            }%"></div>
          </div>
        </div>
<div class="pressure">

<div class="back"><h2 class="pressure_number" >${
      day.hour[0].pressure_mb
    } hPa</h2></div>
</div>

        <div class="wind_speed">
          <div class="wind_threshhold">
          <div class="wind_speedkm">${day.hour[0].wind_kph} kp/h</div>
            <div class="wind_pointer" style="transform:rotate(${
              day.hour[0].wind_degree
            }deg) " >
           
            </div>
          </div>
        </div>
      </div>
    </div>

   
    `;
    forecast.appendChild(everyDay);
    console.log(day);
  });
}
