const weatherForm = document.querySelector(".search-box");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const locationDisplay = document.querySelector(".location");
const dateDisplay = document.querySelector(".date");
const tempDisplay = document.querySelector(".temperature");
const weatherTypeDisplay = document.querySelector(".weather-type");

const detailBoxes = document.querySelectorAll(".detail-box p");

const apiKey = "ce1180a6de75a4218fcf0d2a94ac69c4";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        displayError("Please enter a city name");
        return;
    }

    try {
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
    } catch (error) {
        displayError(error.message);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("City not found");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const {
        name,
        main: { temp, humidity, pressure },
        weather: [{ description, id }],
        wind: { speed }
    } = data;

    card.style.display = "flex";
    weatherTypeDisplay.classList.remove("errorDisplay");

    locationDisplay.textContent = name;
    tempDisplay.textContent = `${Math.round(temp)}°C`;
    weatherTypeDisplay.textContent = `${getWeatherEmoji(id)} ${description}`;

    const now = new Date();
    dateDisplay.textContent = now.toDateString();

    detailBoxes[0].textContent = `${humidity}%`;
    detailBoxes[1].textContent = `${(speed * 3.6).toFixed(1)} km/h`;
    detailBoxes[2].textContent = `${pressure} hPa`;
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈";
    if (weatherId >= 300 && weatherId < 400) return "🌦";
    if (weatherId >= 500 && weatherId < 600) return "🌧";
    if (weatherId >= 600 && weatherId < 700) return "❄";
    if (weatherId >= 700 && weatherId < 800) return "🌫";
    if (weatherId === 800) return "☀";
    if (weatherId > 800) return "☁";
    return "🌍";
}

function displayError(message) {
    card.style.display = "flex";

    locationDisplay.textContent = "Error";
    dateDisplay.textContent = "";
    tempDisplay.textContent = "";
    weatherTypeDisplay.textContent = message;
    weatherTypeDisplay.classList.add("errorDisplay");

    detailBoxes[0].textContent = "--";
    detailBoxes[1].textContent = "--";
    detailBoxes[2].textContent = "--";
}
document.addEventListener("DOMContentLoaded", () => {
    getWeatherData("kangra")
        .then(displayWeatherInfo)
        .catch(err => displayError(err.message));
});