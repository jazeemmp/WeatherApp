const card = document.querySelector(".card")
const search = document.querySelector(".search-section")
const cityInput = document.querySelector(".city")
const errorDisplay = document.querySelector(".error")
const weatherSec = document.querySelector(".weather")
const section  = document.querySelector(".section")
const errorSection = document.querySelector(".error-section") 
const apiKey = "3f25de0eabb64a465c74e6d0b625d172"

search.addEventListener("submit", async event =>{
    event.preventDefault()
    const city = cityInput.value
     
    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherData(weatherData)
        }
        catch(error){
           console.log(error);
        }
    }
    else{
        displayError("Please Enter Your location")
    }
})
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl)
    // console.log(response);
    if(!response.ok){
        // throw new Error("not valid city")
        displayErrorImg()
    }

    return await response.json()
}
function displayWeatherData(data){
    console.log(data);
    const {name:city,
           main:{temp,humidity},
           wind:{speed},
           weather: [{main,description}]} = data

    const temparature = document.querySelector(".temparature")
    const weatherDisc = document.querySelector(".name")
    const humidityTxt = document.querySelector(".humidity")
    const windSpeed = document.querySelector(".windspeed")
    const weatherImg = document.querySelector(".weather-img")

    weatherDisc.textContent = description
    temparature.innerHTML = `${Math.floor(temp - 273.15)}<span>°C</span>`
    humidityTxt.textContent = humidity + "%"
    windSpeed.textContent = speed + "km/h"
    switch (main) {
        case "Clouds":
            weatherImg.src = "images/clouds.png";
            break;
        case "Clear":
            weatherImg.src = "images/clear.png";
            break;
        case "Drizzle":
            weatherImg.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherImg.src = "images/mist.png";
            break;
        case "Rain":
            weatherImg.src = "images/rain.png";
            break;
        default:
            weatherImg.src = "images/clear.png"; 
            break;
    }
    errorDisplay.textContent = ""
    errorSection.classList.remove('error-active')
    card.style.height = "540px"
    section.classList.add('active')
}
function displayError(message){
    errorSection.classList.remove('error-active')
    errorDisplay.textContent = message
    errorDisplay.classList.add("error")
    card.style.height = "130px"
}
function displayErrorImg(){
    errorDisplay.textContent = ""
    section.classList.remove('active')
    card.style.height = "450px"
    errorSection.classList.add("error-active")

}