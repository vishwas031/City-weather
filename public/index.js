import {api} from './var.js';

var searchBar_ = document.querySelector("#search-bar") ;
var loca_ = document.querySelector("#location") ;
var date_ = document.querySelector("#date") ;
var curTemp_ = document.querySelector("#cur-temp") ;
var climate_ = document.querySelector("#climate") ;
var minMax_ = document.querySelector("#min-max") ;
var search_ = document.querySelector("#search-icon");

updateDate()

searchBar_.addEventListener("keypress", selectQuery)
search_.addEventListener("click", ()=>{
    if(searchBar_.value!="")
        getResults(searchBar_.value);
})

function selectQuery (e){
    if(e.keyCode==13)
    {
        getResults(searchBar_.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then (displayResults)
}


function displayResults (weather){
    console.log(weather)
    loca_.innerText = `${weather.name}, ${weather.sys.country}`;
    curTemp_.innerText = `${Math.round(weather.main.temp - 273.15)}°C`;
    climate_.innerText = `${weather.weather[0].main}`;
    minMax_.innerText = `${Math.round(weather.main.temp_min - 273.15)}°C/${Math.round(weather.main.temp_max - 273.15)}°C`
    searchBar_.value=""
}


function updateDate(){
    let now = new Date();
    let months = ["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

    let day = days[now.getDay()]
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    
    date_.innerText = `${day} ${date} ${month} ${year}`;
}
