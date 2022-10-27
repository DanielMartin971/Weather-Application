

//api key: a4bddbfa58913317f6eb36cabdfea609

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a4bddbfa58913317f6eb36cabdfea609
var cityName = '';
var setter;
var lon = 0;
var lat = 0;

function cityRequest(county){
    cityName = county;
    console.log(cityName);
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=a4bddbfa58913317f6eb36cabdfea609';

    fetch(requestURL)
    .then(response => response.json())
    .then(response => {
        setter = response
        city.textContent = setter.name + '  (' +currentDay+ ')';
        cityTemp.textContent = "Temp: " + setter.main.temp + ' F';
        cityWind.textContent = "Wind: " + setter.wind.speed + ' MPH';
        cityHum.textContent  = "Humidity: " + setter.main.humidity + ' %';

        var aside = document.getElementById('side');
        var temp  = document.createElement('input');
        temp.type = 'button';
        temp.classList.add('btn');
        temp.value = cityName;
        aside.appendChild(temp);

        lon = setter.coord.lon;
        lat = setter.coord.lat;

        forecast();
    })
    .catch(err => console.error(err))
}

function forecast(){
    var request = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=a4bddbfa58913317f6eb36cabdfea609';

    fetch(request)
    .then(response => response.json())
    .then(response => console.log(response))

    var days = document.querySelectorAll('.day');
    var count = 0;
    days.forEach(day => {
        //mom is used for the date because direct use of moment for textContent would give error
        //list is being used for the rest of the attributes in the articles
        var mom = 0
        var list;
        if(count === 0){
            mom = moment().add(1, 'days').format('MMMM Do YYYY');
            day.textContent = mom;
        }
        else if(count === 1){
            mom = moment().add(2, 'days').format('MMMM Do YYYY');
            day.textContent = mom;
        }
        else if(count === 2){
            mom = moment().add(3, 'days').format('MMMM Do YYYY');
            day.textContent = mom;
        }
        else if(count === 3){
            mom = moment().add(4, 'days').format('MMMM Do YYYY');
            day.textContent = mom;
        }
        else if(count === 4){
            mom = moment().add(5, 'days').format('MMMM Do YYYY');
            day.textContent = mom;
        }
        count++;
    })
    console.log(days);
}

var currentDay = moment().format('MMMM Do YYYY');


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
    });
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cityRequest(search.value);
});