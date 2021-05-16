let appID = "ffef04950778b391aa42fc2198990ed3";

let units = 'metric';
let searchMethod = 'q';

function searchWeather(searchTearm) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTearm}&appid=${appID}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){
    switch (resultFromServer.weather[0].main){
        case 'Clear':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/clear.jpg")';
            break;
        case 'Thunderstorm':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/storm.jpg")';
            break;

        case 'Haze':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/haze.jpg")';
            break;

        case 'Drizzle':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("")';
            break;

        case 'Rain':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/rain.jpg")';
            break;

        case 'Snow':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/snow.jpg")';
            break;
        
        case 'Mist':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/rain.jpg")';
            break;
        
        case 'Clouds':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/cloudy.jpg")';
            break;

        default:
            document.getElementById("weatherContainer").style.backgroundImage = 'url("./images/default.jpg")';
            break
    
    }

    let weatherDiscriptionHeader = document.getElementById("weatherDescriptionContainer");
    let temperatureElement = document.getElementById("temperature");
    let humidityElement = document.getElementById("humidity");
    let cityHeader = document.getElementById("cityHeader");
    let weatherIcon = document.getElementById("documentImg");
    let windSpeedElement = document.getElementById("windSpeed");

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';
    let resultDescription = resultFromServer.weather[0].description;
    weatherDiscriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + `&#8451`;
    windSpeedElement.innerHTML = 'Winds at ' + resultFromServer.wind.speed+'m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity Levels at ' + resultFromServer.main.humidity+'%';

    setPossitionforInfo();
}

function setPossitionforInfo() {
    let weatherContainer = document.getElementById("weatherContainer");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('serachBtn').addEventListener('click', () => {
    let searchTearm = document.getElementById('searchInput').value;
    if(searchTearm)
        searchWeather(searchTearm);
})