import{apiKey} from "./environment.js";

let currTemp = document.getElementById("currTemp");
let currDesc = document.getElementById("currDesc");
let maxTempCurr = document.getElementById("maxTempCurr");
let currWind= document.getElementById("currWind");
let minTempCurr = document.getElementById("minTempCurr");
let currHumidity= document.getElementById("currHumidity");
let location = document.getElementById("location");


let lat = "37.9577";
let lon = "-121.2908";
let units = "imperial"

async function currentWeather(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)

    const data = await promise.json();

    console.log(data);
    update(data); 
}

function update(weather){
    currTemp.textContent = weather.main.temp;
    currDesc.textContent = weather.weather[0].description;
    maxTempCurr.textContent = weather.main.temp_max;
    currWind.textContent= weather.wind.speed;
    minTempCurr.textContent = weather.main.temp_min;
    currHumidity.textContent= weather.main.humidity;
    location.textContent = weather.name;
}



// i will need the 0, 8, 16, 24, and 32 point of data for every 5 days without the hours
async function fiveDayWeather(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    
    

    const data = await promise.json();

    console.log(data.list);
}


currentWeather();
//fiveDayWeather();