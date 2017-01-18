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
                    displayLocationWeather(response.name, response.weather[0].main, response.main.temp, response.weather[0].icon);

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
        var weatherName;
        function displayLocationWeather(city, weather, temperature, iconID) {
            cityName = city;
            cityWeather = weather;
            Ftemp = parseFloat(temperature).toFixed(2);
            Ctemp = parseFloat((temperature - 32) * 5 / 9).toFixed(2);
            imperial = true;
            weatherName = weather;

            $('h1#city').html(city);
            $('h2#temperature').html(Ftemp + '&#176;F ' + weather);
            $('#data').append('<img src="http://openweathermap.org/img/w/' + iconID + '.png" alt="weather icon">')

        }

        $('h2#temperature').click(function() {
            imperial = !imperial;
            if(imperial) {
                $('h2#temperature').html(Ftemp + '&#176;F ' + weatherName);
            } else {
                $('h2#temperature').html(Ctemp + '&#176;C ' + weatherName);
            }
        })

    } else {
        $('#data').html('Please share location');
    }

})
