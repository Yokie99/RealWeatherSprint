import{apiKey} from "./environment.js";


let lat = "37.9577";
let lon = "-121.2908";

async function currentWeather(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

    const data = await promise.json();

    console.log(data);
}

// i will need the 0, 8, 16, 24, and 32 point of data for every 5 days without the hours
async function fiveDayWeather(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    
    

    const data = await promise.json();

    console.log(data.list);
}

currentWeather();
fiveDayWeather();