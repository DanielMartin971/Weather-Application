

//api key: a4bddbfa58913317f6eb36cabdfea609

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a4bddbfa58913317f6eb36cabdfea609
var cityName = '';
var setter;
var lon = 0;
var lat = 0;
var sent = false;

function cityRequest(county){
    cityName = county;
    // console.log(cityName);
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
        btns = document.querySelectorAll('.btn');

        btns.forEach(val => {
            val.addEventListener('click', (e) =>{
                e.preventDefault();
                newBtn(val);
            });
        });

        lon = setter.coord.lon;
        lat = setter.coord.lat;

        forecast();
    })
    .catch(err => console.error(err))
}

function forecast(){
    var request = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial&appid=a4bddbfa58913317f6eb36cabdfea609';
    var num = {
        zero:0,
        one:0,
        two:0,
        three:0,
        four:0
    };
    var count = 0;

    fetch(request)
    .then(response => response.json())
    .then(data => {
        console.log('This is data', data);
        num.zero   = data.list[0].main.temp; 
        num.one    = data.list[7].main.temp;
        num.two    = data.list[14].main.temp;
        num.three  = data.list[21].main.temp;
        num.four   = data.list[28].main.temp;
        console.log(num)

        temps.forEach(temp => {
            if(count == 5){
                count = 0;
            }
            
            if(count == 0){
                temp.textContent = 'Temp: ' + num.zero + ' F';
            }
            else if(count == 1){
                temp.textContent = 'Temp: ' + num.one + ' F';
            }
            else if(count == 2){
                temp.textContent = 'Temp: ' + num.two + ' F';
            }
            else if(count == 3){
                temp.textContent = 'Temp: ' + num.three + ' F';
            }
            else if(count == 4){
                temp.textContent = 'Temp: ' + num.four + ' F';
            }
    
    
            count++;
        });

        num.zero   = data.list[0].wind.speed; 
        num.one    = data.list[7].wind.speed;
        num.two    = data.list[14].wind.speed;
        num.three  = data.list[21].wind.speed;
        num.four   = data.list[28].wind.speed;

        winds.forEach(wind => {
            if(count == 5){
                count = 0;
            }
            
            if(count == 0){
                wind.textContent = 'Wind: ' + num.zero + ' MPH';
            }
            else if(count == 1){
                wind.textContent = 'Wind: ' + num.one + ' MPH';
            }
            else if(count == 2){
                wind.textContent = 'Wind: ' + num.two + ' MPH';
            }
            else if(count == 3){
                wind.textContent = 'Wind: ' + num.three + ' MPH';
            }
            else if(count == 4){
                wind.textContent = 'Wind: ' + num.four + ' MPH';
            }
    
    
            count++;
        });

        num.zero   = data.list[0].main.humidity; 
        num.one    = data.list[7].main.humidity;
        num.two    = data.list[14].main.humidity;
        num.three  = data.list[21].main.humidity;
        num.four   = data.list[28].main.humidity;

        hums.forEach(hum => {
            if(count == 5){
                count = 0;
            }
            
            if(count == 0){
                hum.textContent = 'Humidity: ' + num.zero + ' %';
            }
            else if(count == 1){
                hum.textContent = 'Humidity: ' + num.one + ' %';
            }
            else if(count == 2){
                hum.textContent = 'Humidity: ' + num.two + ' %';
            }
            else if(count == 3){
                hum.textContent = 'Humidity: ' + num.three + ' %';
            }
            else if(count == 4){
                hum.textContent = 'Humidity: ' + num.four + ' %';
            }
    
    
            count++;
        });
    })

    var days  = document.querySelectorAll('.day');
    var temps = document.querySelectorAll('.temp');
    var winds = document.querySelectorAll('.wind');
    var hums  = document.querySelectorAll('.hum');

    
    days.forEach(day => {
        //mom is used for the date because direct use of moment for textContent would give error
        //list is being used for the rest of the attributes in the articles
        var mom = 0
        if(count === 5){
            count = 0;
        }

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
    });

    // console.log(days);
    // console.log(temps);
    // console.log(winds);
    // console.log(hums);
}

function newBtn(btn){
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        sent = true;
        cityRequest(btn.value);
        console.log('you called the function newBtn', btn);
    });
}

var currentDay = moment().format('MMMM Do YYYY');

var city     = document.getElementById('city-name-date');
var cityTemp = document.getElementById('city-temp');
var cityWind = document.getElementById('city-wind');
var cityHum  = document.getElementById('city-hum');

var btns      = document.querySelectorAll('.btn');
var search    = document.querySelector('#search');
var searchBtn = document.querySelector('.searchBtn')

btns.forEach(val => {
    val.addEventListener('click', (e) =>{
        e.preventDefault();
        cityRequest(val.value.toLowerCase());
    });
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('you clicked a btn');
    cityRequest(search.value);
    search.value = '';
});