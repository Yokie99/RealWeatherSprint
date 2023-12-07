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

navigator.geolocation.getCurrentPosition(currentLocationWeather, currentWeather);

async function currentLocationWeather(position){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`)

    const data = await promise.json();
    console.log("current location enabled")
    console.log(data);
    update(data); 
}

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
    console.log(data);
    console.log("tis is temp max" + data.list[0].main.temp_max)
    console.log(typeof data.list[0].main.temp_max);

    let startTime = data.list[0].dt;
    let start = 0;
    
    startTime = (startTime - startTime%86400) + 86400; //find 12am of current day
    for (let i =0; i< data.list.length; i++){
        if (data.list[i].dt < startTime){
            data.list[i] = 0;
            start++; 
        }
    }
    console.log(data);
    let day1max = data.list[start].main.temp_max;
    let day2max = data.list[9].main.temp_max;;
    let day3max = data.list[17].main.temp_max;
    let day4max = data.list[25].main.temp_max;
    let day5max = data.list[33].main.temp_max;

    

    for (let i=start; i< 8; i++){
        if (data.list[i].main.temp_max > day1max){
            day1max = data.list[i].main.temp_max;
        }
    }
    for (let i=8; i< 16; i++){
        if (data.list[i].main.temp_max > day2max){
            day2max = data.list[i].main.temp_max;
        }
    }
    for (let i=16; i< 24; i++){
        if (data.list[i].main.temp_max > day3max){
            day3max = data.list[i].main.temp_max;
        }
    }
    for (let i=24; i< 32; i++){
        if (data.list[i].main.temp_max > day4max){
            day4max = data.list[i].main.temp_max;
        }
    }
    for (let i=32; i< 40; i++){
        if (data.list[i].main.temp_max > day5max){
            day5max = data.list[i].main.temp_max;
        }
    }

    console.log(day1max);
    console.log(day2max);
    console.log(day3max);
    console.log(day4max);
    console.log(day5max);

let day1min = data.list[start].main.temp_min;
    let day2min = data.list[9].main.temp_min;
    let day3min = data.list[17].main.temp_min;
    let day4min = data.list[25].main.temp_min;
    let day5min = data.list[33].main.temp_min;
    for (let i=start; i< 8; i++){
        if (data.list[i].main.temp_min > day1min){
            day1min = data.list[i].main.temp_min;
        }
    }
    for (let i=8; i< 16; i++){
        if (data.list[i].main.temp_min > day2min){
            day2min = data.list[i].main.temp_min;
        }
    }
    for (let i=16; i< 24; i++){
        if (data.list[i].main.temp_min > day3min){
            day3min = data.list[i].main.temp_min;
        }
    }
    for (let i=24; i< 32; i++){
        if (data.list[i].main.temp_max > day4min){
            day4min = data.list[i].main.temp_min;
        }
    }
    for (let i=32; i< 40; i++){
        if (data.list[i].main.temp_max > day5min){
            day5min = data.list[i].main.temp_min;
        }
    }

    console.log(day1min);
    console.log(day2min);
    console.log(day3min);
    console.log(day4min);
    console.log(day5min);

    let day1temp = [] ;
    let day2temp = [] ;
    let day3temp = [] ;
    let day4temp = [] ;
    let day5temp = [];

    for (let i=start; i< 8; i++){
        day1temp.push(data.list[i].main.temp);
    }
    for (let i=8; i< 16; i++){
        day2temp.push(data.list[i].main.temp);
    }
    for (let i=16; i< 24; i++){
        day3temp.push(data.list[i].main.temp);
    }
    for (let i=24; i< 32; i++){
        day4temp.push(data.list[i].main.temp);
    }
    for (let i=32; i< 40; i++){
        day5temp.push(data.list[i].main.temp);
    }
    
    average(day1temp);
    console.log("this is average temp" +day1temp);
    average(day2temp);
    console.log("this is average temp" +day2temp);
    average(day3temp);
    console.log("this is average temp" +day3temp);
    average(day4temp);
    console.log("this is average temp" +day4temp);
    average(day5temp);
    console.log("this is average temp" +day5temp);
    

}

function average(array){
    let total = 0;
    for(let i =0; array.length; i++){
        total = total + array[i];
    }
    return total/array.length;
}

//currentWeather();
fiveDayWeather();