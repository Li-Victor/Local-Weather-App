"use strict";
$(document).ready(function() {
    //browsers geolocation
    if(navigator.geolocation) {
        var URL = 'http://api.openweathermap.org/data/2.5/weather?appid=307bb89abee478e231ee1dba858e80b4';

        navigator.geolocation.getCurrentPosition(function(position) {
            getUserLocation(position.coords.latitude, position.coords.longitude);
        });

        function getUserLocation(latitude, longitude) {

            var jqxhr = $.getJSON(URL + '&lat=' + latitude +
                            '&lon=' + longitude + '&units=imperial')
                .done(function(response) {
                    displayLocationWeather(response.name, response.weather[0].main, response.main.temp);

                })
                .fail(function(response) {
                    $('#data').html('Something has gone wrong');
                });

        }

        var cityName;
        var cityWeather;
        var Ftemp;
        var Ctemp;
        var imperial;
        function displayLocationWeather(city, weather, temperature) {
            $('#data').html(city + ' ' + weather + ' temperature is ' + temperature + ' Fahrenheit');
            cityName = city;
            cityWeather = weather;
            Ftemp = temperature;
            Ctemp = (temperature - 32) * 5 / 9;
            imperial = true;
        }

        $('#switch').on('click', function() {
            imperial = !imperial;
            if(imperial) {
                $('#data').html(cityName + ' ' + cityWeather + ' temperature is ' + Ftemp + ' Fahrenheit');
            } else {
                $('#data').html(cityName + ' ' + cityWeather + ' temperature is ' + Ctemp + ' Celcius');
            }
        })

    } else {
        $('#data').html('Please share location');
    }

})
