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

// const collection = document.querySelectorAll('[data-day]');

// let weather = {
//     fetchWeather(city) {
//         fetch(
//             "https://api.openweathermap.org/data/2.5/weather?q=" +
//             city +
//             "&units=imperial&appid=16ccf13b03a4b3dab274ef7fab1a1d7e" +
//             this.apiKey
//         )
//             .then((response) => {
//                 if (!response.ok) {
//                     alert("No weather found.");
//                     throw new Error("No weather found.");
//                 }
//                 return response.json();
//             })
//             .then((data) => this.displayWeather(data));
//     },

//     displayWeather(data) {
//         const { name } = data;
//         const { icon, description } = data.weather[0];
//         const { temp } = data.main;
//         document.querySelector(".city").innerText = "Weather in " + name;
//         document.querySelector(".icon").src =
//             "https://openweathermap.org/img/wn/" + icon + ".png";
//         document.querySelector(".description").innerText = description;
//         document.querySelector(".temp").innerText = temp + "°f";
//         document.querySelector("currently").style.backgroundImage =
//             "url('https://source.unsplash.com/1600x900/?" + name + "')";
//     },

//     search() {
//         this.fetchWeather(document.querySelector(".search-bar").value);

//     },


//     collection.forEach((element) => {

//         //get data elements
//         const dayCards = element.dataset.day;

//         //create divs
//         const label = document.createElement("div");
//         const day = document.createElement("h5");
//         const saveBtn = document.createElement("btn");

//         //add classes to new divs
//         label.classList.add("col-md-1", "card-body", "text-center", "py-3");
//         day.classList.add("col-md-10", "weather-day");
//         saveBtn.classList.add("btn", "saveBtn", "col-md-1");

//         //add time to label
//         label.innerHTML = dayCards

//         //add icon to button
//         saveBtn.innerHTML = "<i class='fas fa-save' aria-hidden='true'></i>"

//         //add divs to html
//         element.appendChild(dayCards);

//         //get storage data
//         const storageData = localStorage.getItem(dayCards);

//         //load task into task area if exists in localstorage
//         search.value = storageData;

//         //if search button is clicked then send hour and the task to localstorage
//         search.addEventListener('submit', e => {
//             setLocalStorage(dayCards, search.value)
//         })
//     }),
// };

// function setLocalStorage(dayCards) {
//     localStorage.setItem(dayCards);
// }


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn');
let city = document.getElementById('city');
const currentCity = document.getElementsByClassName('weather-description')[0];
const currentTemp = document.getElementsByClassName('weather-temp')[0];
const forecast = document.getElementsByClassName('forecast')[0];
const appid = '16ccf13b03a4b3dab274ef7fab1a1d7e';
let weatherStart = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + appid;
const url = (city) => "https://api.openweathermap.org/data/2.5/forecast/daily?" +
    "q=${city}&cnt=7&units=imperial&APPID=${appid}";

function getWeatherData(position) {
    const headers = new Headers();
    const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?${position}&cnt=7&units=imperial&APPID=${appid}`;

    return fetch(URL, {
        method: 'GET',
        headers: headers
    }).then(data => data.json());
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