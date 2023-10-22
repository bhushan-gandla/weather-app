// https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=514de774dff585b06330978023bd2990

var currentLatitude, currentLongitude;
var apiKey = "514de774dff585b06330978023bd2990";

var city;

var cityInput = document.getElementById("cityInput");
var cityName = document.getElementById("cityName");
var ifRedirectedFromHome = true;
var weatherData;

var backgroundAnimator = document.getElementById("backgroundAnimator");
var cityLayer = document.getElementById("cityLayer");


const weatherRequest = "";

const url = location.href;
const urlCity = url.split('?')[1];
console.log(urlCity);

function getCity(){
  if(urlCity == undefined){
    city = cityInput.value;
    console.log("input city");
  }else{
    city = urlCity;
    console.log("url city");
  }
}

getCity();


function submitCity(event) {
  event.preventDefault();

  // console.log(city);
  // createAndOpenCityPage(city);
  getCity();
  
  window.open("city.html?"+city+"",'_self');
  
};

 async function getWeather(apiUrl){
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const cityWeatherData = response.json();
    return cityWeatherData;
}

async function weatherAPICall(city){
 
  try {
    weatherData = await getWeather("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial");
    console.log(weatherData);
    // window.open("city.html?"+city+"",'_self');
    // window.open("city.html?"+city+"",'_self');
    // console.log(weatherData);
    bindData(weatherData);
   
  } catch(e){
    console.log(e);
  }
}


function cityPageLoad(){
  weatherAPICall(city);
  console.log("city page works");
}


function bindData(weatherData){
  var dataCityName = document.getElementById("dataCityName");
  var dataCityTemp = document.getElementById("dataCityTemp");
  var dataCityWeatherDescription = document.getElementById("dataCityWeatherDescription");
 
  console.log(weatherData.name);


  dataCityName.innerHTML = weatherData.name;
  dataCityTemp.innerHTML = (weatherData.main.temp).toFixed(0);
  dataCityWeatherDescription.innerHTML = weatherData.weather[0].description;
  // dataCountryName.innerHTML = "US ";

  createWeatherMood(weatherData.weather[0].icon);
}

function createWeatherMood(weatherDescription){
  $('#backgroundAnimator').empty();
  
  // switch(weatherDescription){
  //   case "broken clouds":
  //     backgroundAnimator.innerHTML = `<div class="sun"></div>`;
  //     // console.log(1)
  //     break;
  //   case "03n":
  //     cityLayer.className += 'scattered-clouds';
  //     backgroundAnimator.innerHTML = `<div class="day-cloud cloud-1"></div>
  //     <div class="day-cloud cloud-2"></div>
  //     <div class="day-cloud cloud-3"></div>`;
  //     break;
  // }

  addDayOrNight(weatherDescription);

  if(weatherDescription == '01n' || weatherDescription == '01d'){
    cityLayer.className += 'clear-sky';
    backgroundAnimator.innerHTML = `<div class="sun"></div>`;
  }else if(weatherDescription == '02n' || weatherDescription == '02d'){
    cityLayer.className += 'few-clouds';
    backgroundAnimator.innerHTML = `<div class="sun"></div>
    <div class="cloud"></div>`;
  }else if(weatherDescription == '03n' || weatherDescription == '03d'){
    cityLayer.className += 'scattered-clouds';
    backgroundAnimator.innerHTML = `<div class="day-cloud cloud-1"></div>
    <div class="day-cloud cloud-2"></div>
    <div class="day-cloud cloud-3"></div>`;
  }else if(weatherDescription == '04n' || weatherDescription == '04d'){
    cityLayer.className += 'broken-clouds';
    backgroundAnimator.innerHTML = `<div class="day-cloud cloud-1"></div>
    <div class="day-cloud cloud-2"></div>
    <div class="day-cloud cloud-3"></div>
    <div class="day-cloud cloud-4"></div>
    <div class="day-cloud cloud-5"></div>
    <div class="day-cloud cloud-6"></div>
    <div class="day-cloud cloud-7"></div>
    <div class="day-cloud cloud-8"></div>`;
  }else if(weatherDescription == '09n' || weatherDescription == '09d'){
    cityLayer.className += 'shower-rain';
    backgroundAnimator.innerHTML = `<div class="day-cloud cloud-1"></div>
    <div class="day-cloud cloud-2"></div>
    <div class="day-cloud cloud-3"></div>
    <div class="back-row-toggle">
        <div class="rain front-row"></div>
        <div class="rain back-row"></div>
    </div>`;
  }else if(weatherDescription == '10n' || weatherDescription == '10d'){
    cityLayer.className += 'rain';
    backgroundAnimator.innerHTML = `<div class="day-cloud cloud-1"></div>
    <div class="day-cloud cloud-2"></div>
    <div class="day-cloud cloud-3"></div>
    <div class="back-row-toggle">
        <div class="rain front-row"></div>
        <div class="rain back-row"></div>
    </div>`;
  }else if(weatherDescription == '11n' || weatherDescription == '11d'){
    cityLayer.className += 'shower-rain';
    backgroundAnimator.innerHTML = `<div class="day-cloud cloud-1"></div>
    <div class="day-cloud cloud-2"></div>
    <div class="day-cloud cloud-3"></div>
    <div class="thunderstorm-bg"></div>
    <div class="thunderstorms-animation"></div>`;
  }else if(weatherDescription == '13n' || weatherDescription == '13d'){
    cityLayer.className += 'snow-rain';
    backgroundAnimator.innerHTML = `<div class="day-cloud cloud-2"></div>
    <div class="snow">
        <div></div>
    </div>`;
  }else if(weatherDescription == '50n' || weatherDescription == '50d'){
    cityLayer.className += 'scattered-clouds mist';
    backgroundAnimator.innerHTML = `<div class="day-cloud cloud-1"></div>
    <div class="day-cloud cloud-2"></div>
    <div class="day-cloud cloud-3"></div>
    <div class="mist"></div>`;
  }
}

function addDayOrNight(icon){
  if(icon[icon.length - 1] == "n"){
    cityLayer.className += 'night ';
  }else if(icon[icon.length - 1] == "d"){
    cityLayer.className += 'day ';
  }
}


// broken clouds
var numberOfClouds = 9;
let root = document.documentElement;
function getRandomValues(min, max){
  return (Math.random() * (max - min) + min).toFixed(0);
}

function createStylingForBrokenClouds(){
  for(i=1; i<numberOfClouds; i++){
    console.log(i);
    root.style.setProperty("--cloud-width-"+i+"", ""+getRandomValues(40, 70)+"vw");
    root.style.setProperty("--cloud-background-position-y-"+i+"", ""+getRandomValues(5, 50)+"vh");
    root.style.setProperty("--cloud-position-"+i+"", ""+getRandomValues(0, 20)+"%");

    if(i==1 || i==2 || i==3){
      root.style.setProperty("--cloud-width-"+i+"", ""+getRandomValues(20, 50)+"vw");
      root.style.setProperty("--cloud-background-position-y-"+i+"", ""+getRandomValues(5, 10)+"vh");
      root.style.setProperty("--cloud-position-"+i+"", ""+getRandomValues(0, 10)+"%");

      if(i==2){
        root.style.setProperty("--cloud-position-"+i+"", ""+getRandomValues(30, 40)+"%");
      }
    }
  }
}

createStylingForBrokenClouds();