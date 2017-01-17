"use strict";
$(document).ready(function() {
    //browsers geolocation
    if(navigator.geolocation) {
        var URL = 'http://api.openweathermap.org/data/2.5/weather?appid=307bb89abee478e231ee1dba858e80b4';
        var imperialTemp = true;

        function getLocationURL(imperaialTemp) {
            if(imperialTemp) {
                return URL + '&units=imperial';
            }
            return URL + '&units=metric';
        }

        function displayLocationWeather() {
            navigator.geolocation.getCurrentPosition(function(position) {
                var finalURL = getLocationURL() + '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;

                var jqxhr = $.getJSON(finalURL)
                    .done(function(response) {
                        $('#data').html(response.name + ' ' + response.weather[0].main + ' temperature is ' + response.main.temp );
                    })
                    .fail(function(response) {
                        $('#data').html('Something has gone wrong');
                    });
            })
        }

        displayLocationWeather();

        $('#switch').on('click', function() {
            imperialTemp = !imperialTemp;
            displayLocationWeather();
        });

    } else {
        $('#data').html('Please share location');
    }

})
