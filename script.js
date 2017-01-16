"use strict";
$(document).ready(function() {
    var URL = 'http://api.openweathermap.org/data/2.5/weather?appid=307bb89abee478e231ee1dba858e80b4';

    //browsers geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            URL += '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
            //default temperature is in fahrenheit
            var FahrenUrl = URL + '&units=imperial';
            var jqxhr = $.getJSON(FahrenUrl)
                .done(function(response) {
                    $('#data').append(response.name + ' ' + response.weather[0].main + ' temperature is ' + response.main.temp );
                })
                .fail(function(response) {
                    $('#data').append('Something has gone wrong');
                })


        });
    }

})
