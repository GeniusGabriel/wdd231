// Select HTML elements

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API URL

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=3168712f4a73c405e00901a710b555db';

// Fetch weather data

async function apiFetch() {

    try {

        const response = await fetch(url);

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

    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);

    weatherIcon.setAttribute('alt', desc);

    captionDesc.textContent = desc;

}

// Call the function

apiFetch();