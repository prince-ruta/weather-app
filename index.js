const apiKey = "dc6d924d2e952b79abffc02809ab8100";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityName = document.querySelector('.city');
const tempValue = document.querySelector('.temp');
const humidityValue = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind');
const searchInput = document.querySelector('#city-search');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const weatherBody = document.querySelector('.weather');
const errorMsg = document.querySelector('.error');

async function checkWeather(cities){
    const response = await fetch(apiUrl + cities + `&appid=${apiKey}`);

    if(response.status == 404){
        errorMsg.style.display = "block";
        weatherBody.style.display = "none";
    }
    else if(response.status == 400){
        errorMsg.style.display = "block";
        weatherBody.style.display = "none";
    }
    else {
        let data = await response.json();
    cityName.textContent = data.name;
    tempValue.textContent = Math.round(data.main.temp) +`°C`;
    humidityValue.textContent = data.main.humidity + `%`;
    windSpeed.textContent = data.wind.speed + ` Km/hr`;

    if(data.weather[0].main == 'Clouds') {
        weatherIcon.src = "./images/clouds.png";
    } else if(data.weather[0].main == 'clear'){
        weatherIcon.src = "./images/clear.png";
    } else if(data.weather[0].main == 'snow'){
        weatherIcon.src = "./images/snow.png";
    } else if(data.weather[0].main == 'wind') {
        weatherIcon.src = "./images/wind.png";
    } else if(data.weather[0].main == 'rain'){
        weatherIcon.src = "./images/rain.png";
    } else if(data.weather[0].main = 'drizzle'){
        weatherIcon.src = "./images/drizzle.png";
    }
     else {
        weatherIcon.src = "./images/mist.png";
    }

    weatherBody.style.display = "block";
    errorMsg.style.display = "none";
    }   
}

searchInput.addEventListener('keyup',(event)=>{
    if(event.key == "Enter"){
        event.preventDefault();
        checkWeather(searchInput.value);
    }
})

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchInput.value);
})
