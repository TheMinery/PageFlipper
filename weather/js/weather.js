function Weather() {
    this.init = function() {
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = this.handleResponse.bind(this);
        this.contTemp = document.getElementById('temperature');
        this.contRealFeel = document.getElementById('realFeel');
        this.contWind = document.getElementById('wind');
        this.contPressure = document.getElementById('pressure');
        this.contHumidity = document.getElementById('humidity');
        this.contUV = document.getElementById('uv');
        this.contCloud = document.getElementById('cloud');
        this.contSkycon = document.getElementById('icon1')
        //this.weatherURL = 'https://api.darksky.net/forecast/c7329eeb25fbeb17e6b06f902ba9575a/40.7127,-74.0059?units=ca';
        this.weatherURL = '/weather/fetch.php';
        this.skyconInit();
        setInterval(this.fetchWeather.bind(this), 1800000);
    }

    this.handleResponse = function(evt) {
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
            this.objWeather = JSON.parse(this.xhr.responseText);
            console.log(this.objWeather.currently.temperature);
            this.contTemp.innerHTML = Math.round(this.objWeather.currently.temperature);
            this.contRealFeel.innerHTML = Math.round(this.objWeather.currently.apparentTemperature);
            this.contWind.innerHTML = Math.round(this.objWeather.currently.windSpeed);
            this.contPressure.innerHTML = Math.round(this.objWeather.currently.pressure);
            this.contHumidity.innerHTML = this.objWeather.currently.humidity * 100;
            this.contUV.innerHTML = this.objWeather.currently.uvIndex;
            this.contCloud.innerHTML = this.objWeather.currently.cloudCover * 100;
            this.setSkycon(this.objWeather.currently.icon)
        }
    }

    this.fetchWeather = function() {
        this.xhr.open('GET', this.weatherURL, true);
        this.xhr.send();
    }

    this.skyconInit = function() {
        this.skycons = new Skycons({"color": "white"});
        this.skycons.add(this.contSkycon, 'fog')
        this.skycons.play();
    }

    this.setSkycon = function(icon) {
        this.skycons.set(this.contSkycon, icon);
    }
}

function init() {
    console.log('foo');
    xWeather = new Weather();
    xWeather.init();
    xWeather.fetchWeather();
}

document.addEventListener('DOMContentLoaded', init, false);