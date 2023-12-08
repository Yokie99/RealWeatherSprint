import { apiKey } from "./environment.js";

let currTemp = document.getElementById("currTemp");
let currDesc = document.getElementById("currDesc");
let maxTempCurr = document.getElementById("maxTempCurr");
let currWind = document.getElementById("currWind");
let minTempCurr = document.getElementById("minTempCurr");
let currHumidity = document.getElementById("currHumidity");
let location = document.getElementById("location");
let search = document.getElementById("search");

let currIcon = document.getElementById("currIcon");

//all the accordian header variables
let day1Date = document.getElementById("day1Date");
let day1Icon = document.getElementById("day1Icon");
let day1High = document.getElementById("day1High");
let day1Low = document.getElementById("day1Low");

let day2date = document.getElementById("day2Date");
let day2Icon = document.getElementById("day2Icon");
let day2High = document.getElementById("day2High");
let day2Low = document.getElementById("day2Low");

let day3Date = document.getElementById("day3Date");
let day3Icon = document.getElementById("day1Icon");
let day3High = document.getElementById("day1High");
let day3Low = document.getElementById("day1Low");

let day4Date = document.getElementById("day4Date");
let day4Icon = document.getElementById("day4Icon");
let day4High = document.getElementById("day4High");
let day4Low = document.getElementById("day4Low");

let day5Date = document.getElementById("day5Date");
let day5Icon = document.getElementById("day5Icon");
let day5High = document.getElementById("day5High");
let day5Low = document.getElementById("day5Low");

//accordian body variables
let day1DateO = document.getElementById("day1DateO");
let day1IconO = document.getElementById("day1IconO");
let day1Desc = document.getElementById("day1Desc");
let day1maxTemp = document.getElementById("day1maxTemp");
let day1minTemp = document.getElementById("day1minTemp");
let day1Wind = document.getElementById("day1Wind");
let day1Humidity = document.getElementById("day1Humidity");

let day2DateO = document.getElementById("day2DateO");
let day2IconO = document.getElementById("day2IconO");
let day2Desc = document.getElementById("day2Desc");
let day2maxTemp = document.getElementById("day2maxTemp");
let day2minTemp = document.getElementById("day2minTemp");
let day2Wind = document.getElementById("day2Wind");
let day22Humidity = document.getElementById("day2Humidity");

let day3DateO = document.getElementById("dayDateO");
let day3IconO = document.getElementById("day3IconO");
let day3Desc = document.getElementById("day3Desc");
let day3maxTemp = document.getElementById("day3maxTemp");
let day3minTemp = document.getElementById("Day3minTemp");
let day3Wind = document.getElementById("day3Wind");
let day3Humidity = document.getElementById("day3Humidity");

let day4DateO = document.getElementById("day4DateO");
let day4IconO = document.getElementById("day4IconO");
let day4Desc = document.getElementById("day4Desc");
let day4maxTemp = document.getElementById("day4maxTemp");
let day4minTemp = document.getElementById("ay4minTemp");
let day4Wind = document.getElementById("day4Wind");
let day4Humidity = document.getElementById("day4Humidity");

let day5DateO = document.getElementById("day5DateO");
let day5IconO = document.getElementById("day5IconO");
let day5Desc = document.getElementById("day5Desc");
let day5maxTemp = document.getElementById("day5maxTemp");
let day5minTemp = document.getElementById("Day5minTemp");
let day5Wind = document.getElementById("day5Wind");
let day5Humidity = document.getElementById("day5Humidity");


let lat = "37.9577";
let lon = "-121.2908";
let units = "imperial";
let dataC;

navigator.geolocation.getCurrentPosition(currentLocationWeather, currentWeather);

async function currentLocationWeather(position) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`)


    const data = await promise.json();


    console.log("current location enabled")
    console.log(data);
    update(data);

}

async function currentWeather(lat, lon, units) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)

    const data = await promise.json();


    console.log(data);
    update(data);
    return data;
}

function update(weather) {
    currTemp.textContent = Math.floor(weather.main.temp);
    currDesc.textContent = weather.weather[0].description;
    maxTempCurr.textContent = weather.main.temp_max;
    currWind.textContent = weather.wind.speed;
    minTempCurr.textContent = weather.main.temp_min;
    currHumidity.textContent = weather.main.humidity;
    location.textContent = weather.name;

    currIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    day1Icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    day1IconO.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
}

async function fiveDayWeather() {

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)

    const data = await promise.json();

    const promise1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)

    const data1 = await promise1.json();

    console.log(data1)
    let currDate = dayOfWeek(data1);

    console.log("tis is temp max" + data.list[0].main.temp_max)
    console.log(typeof data.list[0].main.temp_max);

    let daylist;
    daylist = dayOfWeekArr(data);

    for (let i = 0; i < daylist.length; i++) {
        if (currDate == daylist[i]) {
            daylist[i] = 99;
        }
    }

    console.log(daylist)

    let start = 0;
    for (let i = 0; i < data.list.length; i++) {
        if (daylist[i] == 99) {
            start++;
        }
    }
    console.log(start);
    console.log(data);

    let day1max = data.list[start].main.temp_max;
    let day2max = data.list[start + 8].main.temp_max;
    let day3max = data.list[start + 16].main.temp_max;
    let day4max = data.list[start + 24].main.temp_max;
    let day5max = data.list[31 + start].main.temp_max;

    for (let i = start; i < 8; i++) {
        if (data.list[i].main.temp_max > day1max) {
            day1max = data.list[i].main.temp_max;
        }
    }
    for (let i = start + 8; i < 16; i++) {
        if (data.list[i].main.temp_max > day2max) {
            day2max = data.list[i].main.temp_max;
        }
    }
    for (let i = start + 16; i < 24; i++) {
        if (data.list[i].main.temp_max > day3max) {
            day3max = data.list[i].main.temp_max;
        }
    }
    for (let i = start + 24; i < 32; i++) {
        if (data.list[i].main.temp_max > day4max) {
            day4max = data.list[i].main.temp_max;
        }
    }
    for (let i = 32 + start; i < 40; i++) {
        if (data.list[i].main.temp_max > day5max) {
            day5max = data.list[i].main.temp_max;
        }
    }

    console.log(day1max);
    console.log(day2max);
    console.log(day3max);
    console.log(day4max);
    console.log(day5max);

    let day1min = data.list[start].main.temp_min;
    let day2min = data.list[start + 8].main.temp_min;
    let day3min = data.list[start + 16].main.temp_min;
    let day4min = data.list[start + 16].main.temp_min;
    let day5min = data.list[31 + start].main.temp_min;
    for (let i = start; i < 8; i++) {
        if (data.list[i].main.temp_min > day1min) {
            day1min = data.list[i].main.temp_min;
        }
    }
    for (let i = start + 16; i < 16; i++) {
        if (data.list[i].main.temp_min > day2min) {
            day2min = data.list[i].main.temp_min;
        }
    }
    for (let i = start + 16; i < 24; i++) {
        if (data.list[i].main.temp_min > day3min) {
            day3min = data.list[i].main.temp_min;
        }
    }
    for (let i = start + 16; i < 32; i++) {
        if (data.list[i].main.temp_max > day4min) {
            day4min = data.list[i].main.temp_min;
        }
    }
    for (let i = 31 + start; i < 40; i++) {
        if (data.list[i].main.temp_max > day5min) {
            day5min = data.list[i].main.temp_min;
        }
    }

    console.log(day1min);
    console.log(day2min);
    console.log(day3min);
    console.log(day4min);
    console.log(day5min);

    let day1temp = [];
    let day2temp = [];
    let day3temp = [];
    let day4temp = [];
    let day5temp = [];

    for (let i = start; i < 8; i++) {
        day1temp.push(data.list[i].main.temp);
    }
    console.log("this is day1temp" + day1temp);
    average(day1temp);
    console.log("this is average temp1 " + average(day1temp));

    for (let i = start + 8; i < 16; i++) {
        day2temp.push(data.list[i].main.temp);
    }
    console.log("this is day2temp" + day2temp);
    average(day2temp);
    console.log("this is average temp2 " + average(day2temp));

    for (let i = start + 16; i < 24; i++) {
        day3temp.push(data.list[i].main.temp);
    }
    for (let i = start + 24; i < 32; i++) {
        day4temp.push(data.list[i].main.temp);
    }
    for (let i = 31 + start; i < 40; i++) {
        day5temp.push(data.list[i].main.temp);
    }

    console.log("this is average temp3 " + average(day3temp));

    console.log("this is average temp4 " + average(day4temp));

    console.log("this is average temp5 " + average(day5temp));


}

search.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search.value},{country code}&limit=1&appid=${apiKey}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                lat = data[0].lat;
                lon = data[0].lon;
                console.log(`this is lat ${lat} and this is lon ${lon}`)
                currentWeather(lat, lon, units);
            })
    }



})


function dayOfWeekArr(arr) {
    let day = [];
    for (let i = 0; i < arr.list.length; i++) {
        day.push((Math.floor(arr.list[i].dt / 86400) + 4) % 7)

    }
    return day;
}
function dayOfWeek(data) {
    return ((Math.floor(data.dt / 86400) + 4) % 7);
}
function average(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total = total + array[i];
    }
    total = total / array.length;
    return total
}

currentWeather(lat, lon, units);
fiveDayWeather();

let favStar = document.getElementById("favStar");

favStar.addEventListener('click', function (e) {


})


//Scroll effect
accordionItems.forEach((el) => {
    el.addEventListener('shown.bs.collapse', (e) => {
        var scrollOffset = acc.scrollTop + el.parentNode.offsetTop
        acc.scroll({
            top: scrollOffset,
            left: 0,
            behavior: 'smooth'
        })
    })
})