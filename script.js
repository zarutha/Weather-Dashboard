const apiKey = 'REPLACE_WITH_ACTUAL_API_KEY'; // <--------------IMPORTANT--------------<
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', handleSearch);
locationInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const location = locationInput.value;
    if (location) {
        locationElement.textContent = '';
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
        fetchWeather(location);
    }
}

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Location not found, try somewhere nearby? :(:', error);
            locationElement.textContent = 'Location not found, check spelling or try somewhere nearby :(';
        });
}