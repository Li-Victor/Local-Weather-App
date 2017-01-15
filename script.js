"use strict";
$(document).ready(function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $("#data").append("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
        });
    }
})
