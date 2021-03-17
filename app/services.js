function getLocationByZip(zipcode, success, failure) {
    
    const reqOptions = {
        "url": "http://localhost:8080/api/external/location/"+"Caneyville",
        "dataType": "json",
        "type": "GET"
    }
    
    $.ajax(reqOptions).done(success).fail(failure);
}

function getWeatherByPoint(lat, lng, success, failure) {
    const requestOptions = {
        "url": "http://localhost:8080/api/external/weather/"+38.8894+"/-77.0352",
        "dataType": "json",
        "type": "GET"
    }

    ajax(requestOptions).done(success).fail(failure);
}



