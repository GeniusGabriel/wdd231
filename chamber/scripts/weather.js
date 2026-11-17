// Nkaseim, Ghana weather configuration
const API_KEY = "cec17e0e2259119f389ad1b4e809d4a9";

const LATITUDE = "7.5";
const LONGITUDE = "-2.20";
// Select HTML elements

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-description');
const forecastContainer = document.querySelector('#forecast-container');
// API URL

const currentWeatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;
const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;    
// Fetch weather data

async function apiFetch() {

    try {

        const response = await fetch(currentWeatherUrl);

        if (response.ok) {

            const data = await response.json();

            console.log(data);

            displayResults(data);

        } else {

            throw new Error(await response.text());

        }

    } catch (error) {

        console.error(error);

    }

}

// Display weather results

function displayResults(data) {

    currentTemp.innerHTML = `${data.main.temp}&deg;C`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);

    weatherIcon.setAttribute('alt', desc);

    captionDesc.textContent = desc;

}

// Call the function

apiFetch();
// ====================================
// THREE-DAY WEATHER FORECAST
// ====================================

async function fetchForecast() {


    try {

        const response = await fetch(forecastUrl);

        if (response.ok) {

            const data = await response.json();

            // Select one forecast for each of the next three days
            const dailyForecasts = data.list.filter(item =>
                item.dt_txt.includes("12:00:00")
            ).slice(0, 3);

            forecastContainer.innerHTML = "";

            dailyForecasts.forEach(day => {

                const date = new Date(day.dt_txt);

                const dayName = date.toLocaleDateString("en-GH", {
                    weekday: "short"
                });

                const temperature = Math.round(day.main.temp);

                const description = day.weather[0].description;

                const icon = day.weather[0].icon;

                const card = document.createElement("div");

                card.classList.add("forecast-card");

                card.innerHTML = `
                    <h4>${dayName}</h4>

                    <img 
                        src="https://openweathermap.org/img/wn/${icon}@2x.png"
                        alt="${description}"
                    >

                    <p>${temperature}&deg;C</p>

                    <p>${description}</p>
                `;

                forecastContainer.appendChild(card);

            });

        } else {
            throw new Error("Unable to retrieve forecast data.");
        }

    } catch (error) {

        console.error("Forecast error:", error);

        forecastContainer.innerHTML =
            "<p>Weather forecast is currently unavailable.</p>";

    }
}

// Run forecast function
fetchForecast();