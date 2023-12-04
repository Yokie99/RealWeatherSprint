import{apiKey} from "./environment.js";


let lat = "37.9577";
let lon = "-121.2908";

async function currentWeather(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

    const data = await promise.json();

    console.log(data);
}

currentWeather();