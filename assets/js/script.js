

//api key: a4bddbfa58913317f6eb36cabdfea609

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a4bddbfa58913317f6eb36cabdfea609
var cityName = '';

function cityRequest(county){
    cityName = county;
    console.log(cityName);
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=a4bddbfa58913317f6eb36cabdfea609';
    var setter;

    fetch(requestURL)
    .then(response => response.json())
    .then(response => setter = response)
    .then(response => city.textContent = setter.name)
    .then(response => cityTemp.textContent = "Temp: " + setter.main.temp + ' F')
    .then(response => cityWind.textContent = "Wind: " + setter.wind.speed + ' MPH')
    .then(response => cityHum.textContent  = "Humidity: " + setter.main.humidity + ' %')
    .catch(err => console.error(err))
}

function forecast(){

}




var city     = document.getElementById('city-name-date');
var cityTemp = document.getElementById('city-temp');
var cityWind = document.getElementById('city-wind');
var cityHum  = document.getElementById('city-hum');

var btns = document.querySelectorAll('.btn');
var search = document.querySelector('#search');
var searchBtn = document.querySelector('.searchBtn')

btns.forEach(val => {
    val.addEventListener('click', (e) =>{
        e.preventDefault();
        cityRequest(val.value.toLowerCase());
        // forecast()
    });
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cityRequest(search.value);
});