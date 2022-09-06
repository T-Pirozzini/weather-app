const background = document.querySelector('body')
const h2 = document.querySelector('h2')
const name = document.getElementById('name')
const type = document.getElementById('type')
const lon = document.getElementById('lon')
const lat = document.getElementById('lat')
const temp = document.getElementById('temp')

let city = "";
let weatherType = ""
const input = document.querySelector('input');    
const button = document.querySelector('button')
const img = document.querySelector('img');   

const weatherAPI = "371c44fb7c2d48cd04b154a7a724acf7";

const changeBackground = (weatherType) => { 
  if (weatherType === "Clear") {
    background.classList.add('clear')
    background.classList.remove('cloudy')
  } else if (weatherType === 'Clouds') {    
    background.classList.add('cloudy')
    background.classList.remove('clear')
  } else {
    background.classList.add('rain')
    background.classList.remove('clear')
    background.classList.remove('cloudy')
  }
}

let celcius = 0;

const kelvinToCelcius = (kelvin) => {
  celcius = kelvin - 273.15
}

const updateWeather = (weatherData) => {
  name.textContent = weatherData.name.toUpperCase()
  temp.textContent = "Temperature: " + celcius.toFixed(2) + ' °'
  type.textContent = "Description: " + weatherData.weather[0].main
  lon.textContent = "Latitude: " + weatherData.coord.lon
  lat.textContent = "Longitude: " + weatherData.coord.lat
}

const addGiph = (giph) => {
    img.src = giph
}

// fetch weather data on button click
button.addEventListener('click', async function getWeather(e) {
  e.preventDefault()
  city = input.value

  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${weatherAPI}`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData)             
    weatherType = weatherData.weather[0].main
    changeBackground(weatherType);
    kelvinToCelcius(weatherData.main.temp)
    
    const giphyResponse = await await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=V6DEqhbisIo51r2by8ps9KvlE6iWD2Fc&s=${city}`, {mode: 'cors'});
    const giphyData = await giphyResponse.json();
    addGiph(giphyData.data.images.original.url);
    
    const weatherInfo = document.querySelector(".weatherInfo")
    weatherInfo.style.display = "flex";
    input.value = ""
    h2.textContent = ""
    updateWeather(weatherData)    
  } catch (error) {   
    h2.textContent = "City name not found";    
  } 
}); 