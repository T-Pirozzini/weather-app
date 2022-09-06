const background = document.querySelector('.background')
const h2 = document.querySelector('h2')

let city = "";

const input = document.querySelector('input');    
const button = document.querySelector('button')
const img = document.querySelector('img');   

const weatherAPI = "371c44fb7c2d48cd04b154a7a724acf7";

const changeBackground = (weatherData) => {
  if (weatherData.sys.type === 1) {
    background.classList.add('night')
  } else if (weatherData.sys.type === 2) {
    background.classList.add('day')
  } else {
    background.classList.add('morning')
  }
}

const addGiph = (giph) => {
    img.src = giph
}


// fetch weather data on button click
button.addEventListener('click', async function getWeather() {
  city = input.value

  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${weatherAPI}`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();             
    changeBackground(weatherData);

    const giphyResponse = await await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=V6DEqhbisIo51r2by8ps9KvlE6iWD2Fc&s=${city}`, {mode: 'cors'});
    const giphyData = await giphyResponse.json();
    addGiph(giphyData.data.images.original.url);

    input.value = ""
    h2.textContent = ""
  } catch (error) {   
    h2.textContent = "City name not found";    
  } 
}); 