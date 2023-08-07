// https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=514de774dff585b06330978023bd2990

// var x = document.getElementById("cityName");

var currentLatitude, currentLongitude;
var apiKey = "514de774dff585b06330978023bd2990";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    currentLatitude =  position.coords.latitude;
    currentLongitude = position.coords.longitude;
    console.log(currentLatitude + "" + currentLongitude);
}

getLocation();

function getWeatherCurrentCity(currentLatitude, currentLongitude){

      let myPromise = new Promise(function(myResolve, myReject) {
        let x = 0;
      
      // The producing code (this may take some time)
      
        if (currentLatitude == 0 && currentLongitude == 0) {
          myResolve(currentLatitude,currentLongitude);
        } else {
          myReject("Error");
        }
      });
      
      myPromise.then(
        function(currentLatitude,currentLongitude) {
            getWeather("https://api.openweathermap.org/data/2.5/weather?lat="+currentLatitude+"&lon="+currentLongitude+"&appid="+apiKey+"");
        },
        function(error) {

        }
      );

   
}

// getWeatherCurrentCity(currentLatitude, currentLongitude);


var city = ""

var cityInput = document.getElementById("cityInput");
const citySubmit = document.getElementById("citySubmit");
var cityName = document.getElementById("cityName");



citySubmit.addEventListener("click", () => {
    city = cityInput.value;
    console.log(city);
    getWeather("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"");
});

async function getWeather(apiUrl){
    
    // const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityFromInput+"&appid="+apiKey+"";

    const response = await fetch(apiUrl);
    var data = await response.json();
    console.log(data);

    cityName.innerHTML = data.weather[0].main;
}

