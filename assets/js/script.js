//get date from dayjs
const currentDate = dayjs();
const currentHour = currentDate.$H;

var currentDay = $('#currentDay');
function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss A');
    currentDay.text(rightNow);
};
displayTime();
setInterval(displayTime, 1000);


const search = document.getElementById('search');
const cityInput = document.getElementById('city');
const current = document.getElementById('current');
const historyBtn = document.getElementById('historyBtn');
const cityHistory = document.getElementById('cityHistory');
const forecast = document.getElementById('forecast');
const fiveDay = document.getElementById('forecastContainer');


let cities = [];
const appid = '16ccf13b03a4b3dab274ef7fab1a1d7e';

// search function that runs once you submit on the form element
function searchCity(event) {
    event.preventDefault();
    let city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
        getForecast(city);
        cities.unshift({ city });
        cityInput.value = '';
    } else {
        alert("That's not a city!!!");
    }

    setSearchLocal();
    history(city);
}

// save searched city to local storage
function setSearchLocal() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

// city and api key are injected into the url which we then pass thru fetch and put the results into json then run the printWeather function with some data
function getWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${appid}`
    fetch(URL).then(function (response) {
        response.json().then(function (data) {
            printWeather(data, city);
        })
    })
};

// prints the weather data onto the page
function printWeather(weather, cityName) {
    current.textContent = "";
    cityHistory.textContent = cityName;

    let today = document.createElement('span');
    today.textContent = " (" + dayjs(weather.dt.value).format("MMM D, YYYY") + ") ";
    cityHistory.appendChild(today);

    //add icon
    let icon = document.createElement("img")
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    cityHistory.appendChild(icon);

    let temp = document.createElement("li");
    temp.textContent = 'Temperature: ' + weather.main.temp + " °F";
    temp.classList = 'listItem';
    current.appendChild(temp);

    let wind = document.createElement("li");
    wind.textContent = '\nWind Speed: ' + weather.wind.speed + " MPH";
    wind.classList = 'listItem';
    current.appendChild(wind);

    let hum = document.createElement("li");
    hum.textContent = '\nHumidity: ' + weather.main.humidity + " %";
    hum.classList = 'listItem';
    current.appendChild(hum);

    let lat = weather.coord.lat;
    let lon = weather.coord.lon;

    uv(lat, lon);
};

// grab the uv index for latitude and longitude of searched city
function uv(lat, lon) {
    let URL = `https://api.openweathermap.org/data/2.5/uvi?appid=${appid}&lat=${lat}&lon=${lon}`

    fetch(URL)
        .then(function (response) {
            response.json().then(function (data) {
                printUV(data);
                console.log(data);
            });
        });
    console.log(lat);
    console.log(lon);
};

// adds uv index to the page
function printUV(index) {
    let uvEl = document.createElement('div');
    uvEl.textContent = 'UV Index: ';
    uvEl.classList = 'list-item';

    let uvIndex = document.createElement("span");
    uvIndex.textContent = index.value;

    if (index.value <= 2) {
        uvIndex.classList = "favorable";
    } else if (index.value > 2 && index.value <= 8) {
        uvIndex.classList = "moderate ";
    }
    else if (index.value > 8) {
        uvIndex.classList = "severe";
    };

    uvEl.appendChild(uvIndex);

    current.appendChild(uvEl);
};

// city and api key are injected into the url which we then pass thru fetch and put the results into json then run the fiveDayForecast function with some data
function getForecast(city) {
    let URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${appid}`;

    fetch(URL)
        .then(function (response) {
            response.json().then(function (data) {
                fiveDayForecast(data);
            });
        });
};

// prints the forecast to the page
function fiveDayForecast(weather) {
    fiveDay.textContent = '';
    forecast.textContent = 'Five Day Forecast';

    let fiveDayWeather = weather.list;
    for (var i = 5; i < fiveDayWeather.length; i = i + 8) {
        let dailyWeather = fiveDayWeather[i];

        let forecastEl = document.createElement("div");
        forecastEl.classList = 'card bg-primary text-light m-2';

        var date = document.createElement("h5");
        date.textContent = dayjs.unix(dailyWeather.dt).format("MMM D, YYYY");
        date.classList = 'card-header text-center';
        forecastEl.appendChild(date);

        let icon = document.createElement('img');
        icon.classList = 'card-body text-center';
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${dailyWeather.weather[0].icon}@2x.png`);

        forecastEl.appendChild(icon);

        let temp = document.createElement('span');
        temp.classList = 'card-body text-center';
        temp.textContent = 'Temp: ' + dailyWeather.main.temp + ' °F';
        forecastEl.appendChild(temp);

        let windSpan = document.createElement('span');
        windSpan.classList = 'card-body text-center';
        windSpan.textContent = 'Wind Speed: ' + dailyWeather.wind.speed + " MPH";
        forecastEl.appendChild(windSpan);

        let humEl = document.createElement("span");
        humEl.classList = 'card-body text-center';
        humEl.textContent = 'Humidity: ' + dailyWeather.main.humidity + ' %';
        forecastEl.appendChild(humEl);

        fiveDay.appendChild(forecastEl);

    }
}

// search history buttons
function history(history) {
    let historyEl = document.createElement("button");
    historyEl.textContent = history;
    historyEl.classList = 'd-flex w-100 btn-light border p-2';
    historyEl.setAttribute('city-info', history);
    historyEl.setAttribute('type', 'submit');

    historyBtn.prepend(historyEl);
}

// function for the buttons above
function historyButton(event) {
    var city = event.target.getAttribute('city-info');
    if (city) {
        getWeatherData(city);
        getForecast(city);
    }
}


search.addEventListener('submit', searchCity);
historyBtn.addEventListener('click', historyButton);