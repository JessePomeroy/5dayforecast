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
const history = document.getElementById('history');
const current = document.getElementById('current');
const forecast = document.getElementById('forecast');
const fiveDay = document.getElementById('forecastContainer');


let cities = [];
const appid = '16ccf13b03a4b3dab274ef7fab1a1d7e';

function submitForm(event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        getForecast(city);
        cities.unshift({ city });
        cityInput.value = '';
    } else {
        alert("That's not a city!!!");
    }

    setSearchLocal();
    history(city);
}

function setSearchLocal() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function getWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?${city}&cnt=7&units=imperial&APPID=${appid}`;
    fetch(URL).then(function (response) {
        response.json().then(function (data) {
            printWeather(data, city);
        })
    })
};

// let getWeatherStart = async (city) => {
//     let weatherStartData = weatherStart + '&q=' + city;
//     let response = await fetch(weatherStartData);
//     if (response.statusCode !== 200) {
//         alert("not a city");
//         return;
//     }
//     let weather = await response.json();
//     return weather;
// }

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     let weather = await getWeatherStart(search.value);
//     if (!weather) {
//         return;
//     }
//     currentWeather(weather);
// });

// let currentWeather = (data) => {
//     city.textContent = data.name + ', ' + data.sys.country;
// };

// let dayOfWeek = () => {
//     new