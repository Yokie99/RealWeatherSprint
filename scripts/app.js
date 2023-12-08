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

let day2Date = document.getElementById("day2Date");
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
let day2Humidity = document.getElementById("day2Humidity");

let day3DateO = document.getElementById("day3DateO");
let day3IconO = document.getElementById("day3IconO");
let day3Desc = document.getElementById("day3Desc");
let day3maxTemp = document.getElementById("day3maxTemp");
let day3minTemp = document.getElementById("day3minTemp");
let day3Wind = document.getElementById("day3Wind");
let day3Humidity = document.getElementById("day3Humidity");

let day4DateO = document.getElementById("day4DateO");
let day4IconO = document.getElementById("day4IconO");
let day4Desc = document.getElementById("day4Desc");
let day4maxTemp = document.getElementById("day4maxTemp");
let day4minTemp = document.getElementById("day4minTemp");
let day4Wind = document.getElementById("day4Wind");
let day4Humidity = document.getElementById("day4Humidity");

let day5DateO = document.getElementById("day5DateO");
let day5IconO = document.getElementById("day5IconO");
let day5Desc = document.getElementById("day5Desc");
let day5maxTemp = document.getElementById("day5maxTemp");
let day5minTemp = document.getElementById("day5minTemp");
let day5Wind = document.getElementById("day5Wind");
let day5Humidity = document.getElementById("day5Humidity");

// let btn1 = document.getElementById("btn1");
// let btn2 = document.getElementById("btn2");
// let btn3 = document.getElementById("btn3");
// let btn4 = document.getElementById("btn4");
// let btn5 = document.getElementById("btn5");
// let btn1bool = true;
// let btn2bool = true;
// let btn3bool = true;
// let btn4bool = true;
// let btn5bool = true;

// btn1.addEventListener('keydown', function (event) {
//     alert();
//     if (btn1bool) {
//         btn1.className = "accordion-button collapsed d-none"
//         btn1bool = false;
//     }
//     else {
//         btn1.className = "accordion-button collapsed"
//         btn1bool = true;
//     }

// })
let lat = "37.9577";
let lon = "-121.2908";
let units = "imperial";
// let priTemp = document.getElementById("priTemp");
// let secTemp = document.getElementById("priTemp");
// priTemp.addEventListener('click', function (event) {
//         units = "imperical"
//         currentWeather();
//         fiveDayWeather();

//         secTemp.className = "greyTxt"
//     })
// secTemp.addEventListener('click', function (event) {
//         units = "metric"
//         currentWeather();
//         fiveDayWeather();

//         priTemp.className = "greyTxt"
//     })

let injectHere = document.getElementById("injectHere");

navigator.geolocation.getCurrentPosition(currentLocationWeather, currentWeather);

async function currentLocationWeather(position) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`)


    const data = await promise.json();


    console.log("current location enabled")
    console.log(data);
    update(data);
    checkFav();

}

async function currentWeather(lat, lon, units) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)

    const data = await promise.json();


    console.log(data);
    update(data);
    checkFav()
}

function update(weather) {
    currTemp.textContent = Math.floor(weather.main.temp);
    currDesc.textContent = weather.weather[0].description;
    maxTempCurr.textContent = Math.floor(weather.main.temp_max);
    currWind.textContent = weather.wind.speed;
    minTempCurr.textContent = Math.floor(weather.main.temp_min);
    currHumidity.textContent = weather.main.humidity;
    location.textContent = weather.name;

    currIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
}

async function fiveDayWeather() {

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)

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

    let day1humidity = [];
    let day2humidity = [];
    let day3humidity = [];
    let day4humidity = [];
    let day5humidity = [];

    for (let i = start; i < 8; i++) {
        day1humidity.push(data.list[i].main.humidity);
    }
    console.log("this is day1humidity" + day1humidity);
    average(day1humidity);
    console.log("this is average humidity1 " + average(day1humidity));

    for (let i = start + 8; i < 16; i++) {
        day2humidity.push(data.list[i].main.humidity);
    }
    console.log("this is day2humidity" + day2humidity);
    average(day2humidity);
    console.log("this is average humidity2 " + average(day2humidity));

    for (let i = start + 16; i < 24; i++) {
        day3humidity.push(data.list[i].main.humidity);
    }
    for (let i = start + 24; i < 32; i++) {
        day4humidity.push(data.list[i].main.humidity);
    }
    for (let i = 31 + start; i < 40; i++) {
        day5humidity.push(data.list[i].main.humidity);
    }

    console.log("this is average humidity3 " + average(day3humidity));

    console.log("this is average humidity4 " + average(day4humidity));

    console.log("this is average humidity5 " + average(day5humidity));

    let day1wind = [];
    let day2wind = [];
    let day3wind = [];
    let day4wind = [];
    let day5wind = [];

    for (let i = start; i < 8; i++) {
        day1wind.push(data.list[i].wind.speed);
    }
    console.log("this is day1wind" + day1wind);

    console.log("this is average wind1 " + day1wind);

    for (let i = start + 8; i < 16; i++) {
        day2wind.push(data.list[i].wind.speed);
    }
    console.log("this is day2wind" + day2wind);

    console.log("this is average wind2 " + average(day2wind));

    for (let i = start + 16; i < 24; i++) {
        day3wind.push(data.list[i].wind.speed);
    }
    for (let i = start + 24; i < 32; i++) {
        day4wind.push(data.list[i].wind.speed);
    }
    for (let i = 31 + start; i < 40; i++) {
        day5wind.push(data.list[i].wind.speed);
    }


    console.log("this is average wind3 " + average(day3wind));

    console.log("this is average wind4 " + average(day4wind));

    console.log("this is average wind5 " + average(day5wind));

    let day1day;
    let day2day;
    let day3day;
    let day4day;
    let day5day;
    switch (daylist[start]) {
        case 0:
            day1day = "Sun"
            
            break;
        case 1:
            day1day = "Mon"
      
            break;
        case 2:
            day1day = "Tue"

            break;
        case 3:
            day1day = "Wed"

            break;
        case 4:
            day1day = "Thur"

            break;
        case 5:
            day1day = "Fri"

            break;
        case 6:
            day1day = "Sat"
     
            break;
    }
    switch (daylist[start + 8]) {
        case 0:

            day2day = "Sun"
          

            
           
            break;
        case 1:
          

            day2day = "Mon"

            break;
        case 2:
            
            day2day = "Tue"

        
            break;
        case 3:
          
            day2day = "Wed"

          
            break;
        case 4:
           
            day2day = "Thur"

            
            break;
        case 5:

            day2day = "Fri"
    
            break;
        case 6:        
            day2day = "Sat"
 
     
            break;
    }
    switch (daylist[start+16]) {
        case 0:

            day3day = "Sun"
        
           
            break;
        case 1:
           
            day3day = "Mon"

            break;
        case 2:

            day3day = "Tue"

            break;
        case 3:
            day3day = "Wed"

            break;
        case 4:
            day3day = "Thur"
            
            break;
        case 5:
            day3day = "Fri"
            
            break;
        case 6:
            day3day = "Sat"
     
            break;
    }
    switch (daylist[start+24]) {
        case 0:
   
            day4day = "Sun"
            
            break;
        case 1:
           
            day4day = "Mon"

            break;
        case 2:
            
            day4day = "Tue"

            break;
        case 3:
            
            day4day = "Wed"

            break;
        case 4:
            day4day = "Thur"

            
            break;
        case 5:
           
            day4day = "Fri"
            
            break;
        case 6:

            day4day = "Sat"
     
            break;
    }
    switch (daylist[39]) {
        case 0:
            
            day5day = "Sun"
           
            break;
        case 1:
           
            day5day = "Mon"
            break;
        case 2:
           
            day5day = "Tue"
            break;
        case 3:
            

            day5day = "Wed"
            break;
        case 4:
           
            day5day = "Thur"
            
            break;
        case 5:
           
            day5day = "Fri"
            
            break;
        case 6:
           
            day5day = "Sat"
     
            break;
    }
    
    updateFiveDay(data, start, day1max, day1min, day1wind, day1humidity, day2max, day2min, day2wind, day2humidity, day3max, day3min, day3wind, day3humidity, day4max, day4min, day4wind, day4humidity, day5max, day5min, day5wind, day5humidity, day1day, day1DateO, day1Date, day2day, day2Date, day2DateO, day3day, day3Date, day3DateO, day4day, day4Date, day4DateO, day5day, day5Date, day5DateO);
    checkFav();


}

function updateFiveDay(weather, start, day1max, day1min, day1wind, day1humidity, day2max, day2min, day2wind, day2humidity, day3max, day3min, day3wind, day3humidity, day4max, day4min, day4wind, day4humidity, day5max, day5min, day5wind, day5humidity, day1day, day1DateO, day1Date, day2day, day2Date, day2DateO, day3day, day3Date, day3DateO, day4day, day4Date, day4DateO, day5day, day5Date, day5DateO) {


    day1DateO.textContent = day1day;
    day1IconO.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day1Desc.textContent = weather.list[start].weather[0].description;
    day1maxTemp.textContent = `${Math.floor(day1max)}°`;
    day1minTemp.textContent = `${Math.floor(day1min)}°`;
    day1Wind.textContent = `${Math.floor(average(day1wind))}/mph`;
    day1Humidity.textContent = `${Math.floor(average(day1humidity))}%`;
    day1Date.textContent = day1day 
    day1Icon.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day1High.textContent = Math.floor(day1max);
    day1Low.textContent = Math.floor(day1min);

    day2DateO.textContent = day2day;
    day2IconO.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day2Desc.textContent = weather.list[start].weather[0].description;
    day2maxTemp.textContent = `${Math.floor(day2max)}°`;
    day2minTemp.textContent = `${Math.floor(day2min)}°`;
    day2Wind.textContent = `${Math.floor(average(day2wind))}/mph`;
    day2Humidity.textContent = `${Math.floor(average(day2humidity))}%`;
    day2Date.textContent = day2day;
    day2Icon.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day2High.textContent = Math.floor(day2max);
    day2Low.textContent = Math.floor(day2min);

    day3DateO.textContent = day3day;
    day3IconO.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day3Desc.textContent = weather.list[start].weather[0].description;
    day3maxTemp.textContent = `${Math.floor(day3max)}°`;
    day3minTemp.textContent = `${Math.floor(day3min)}°`;
    day3Wind.textContent = `${Math.floor(average(day3wind))}/mph`;
    day3Humidity.textContent = `${Math.floor(average(day3humidity))}%`;
    day3Date.textContent = day3day;
    day3Icon.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day3High.textContent = Math.floor(day3max);
    day3Low.textContent = Math.floor(day3min);

    day4DateO.textContent = day4day;
    day4IconO.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day4Desc.textContent = weather.list[start].weather[0].description;
    day4maxTemp.textContent = `${Math.floor(day4max)}°`;
    day4minTemp.textContent = `${Math.floor(day4min)}°`;
    day4Wind.textContent = `${Math.floor(average(day4wind))}/mph`;
    day4Humidity.textContent = `${Math.floor(average(day4humidity))}%`;
    day4Date.textContent = day4day;
    day4Icon.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day4High.textContent = Math.floor(day4max);
    day4Low.textContent = Math.floor(day4min);

    console.log(day5day)
    day5DateO.textContent = day5day;
    day5IconO.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day5Desc.textContent = weather.list[start].weather[0].description;
    day5maxTemp.textContent = `${Math.floor(day5max)}°`;
    day5minTemp.textContent = `${Math.floor(day5min)}°`;
    day5Wind.textContent = `${Math.floor(average(day5wind))}/mph`;
    day5Humidity.textContent = `${Math.floor(average(day5humidity))}%`;
    day5Date.textContent = day5day;
    day5Icon.src = `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    day5High.textContent = Math.floor(day5max);
    day5Low.textContent = Math.floor(day5min);


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
                fiveDayWeather();
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
let favbar = document.getElementById("favbar");
let favStat = false;

favStar.addEventListener('click', function (e) {
    if (favStat) {
        favbar.className = "favbarHide"
        favStat = false;
    }
    else {
        favbar.className = "favbar"
        favStat = true;
    }

})

function loadFav(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},{country code}&limit=1&appid=${apiKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            console.log(`this is lat ${lat} and this is lon ${lon}`)
            currentWeather(lat, lon, units);
            fiveDayWeather();
        })
}

function test() {
    alert();
}



let favToggle = document.getElementById("favToggle");
let toggleStat = true;
let savedArr = [];

if (localStorage.getItem("saved")) {
    savedArr = JSON.parse(localStorage.getItem("saved"));
}
function checkFav() {

    for (let i = 0; i < savedArr.length; i++) {
        if (savedArr[i] == location.textContent) {
            favToggle.src = "./AssetsForWeather/star_filled.png"
            toggleStat = false;
        }
        else {
            toggleStat = true;
            favToggle.src = "./AssetsForWeather/star_unfilled.png"
        }
    }
}


favToggle.addEventListener('click', function (e) {
    checkFav();
    if (toggleStat) {
        savedArr.push(location.textContent);
        localStorage.setItem("saved", JSON.stringify(savedArr));
        favToggle.src = "./AssetsForWeather/star_filled.png";
        toggleStat = false;

        let h2 = document.createElement("h2");
        injectHere.appendChild(h2);
        h2.textContent = location.textContent;
        h2.addEventListener("click", function () {
            loadFav(h2.textContent);
        });

    }
    else {
        favToggle.src = "./AssetsForWeather/star_unfilled.png"
        toggleStat = true;
        for (let i = 0; i < savedArr.length; i++) {
            if (savedArr[i] == location.textContent) {
                savedArr.splice(i, 1);
                localStorage.setItem("saved", JSON.stringify(savedArr));
            }
        }

    }

})



