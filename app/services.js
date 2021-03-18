function getLocationByZip(zipcode, success, failure) {
    
    const reqOptions = {
        "url": "http://localhost:8080/api/external/location/"+zipcode,
        "dataType": "json",
        "type": "GET"
    }
    
    $.ajax(reqOptions).done(success).fail(failure);
}

function getWeatherMetaData(lat, lng, success, failure) {
    const requestOptions = {
        "url": "http://localhost:8080/api/external/weather/"+lat+"/"+lng,
        "dataType": "json",
        "type": "GET"
    }
    $.ajax(requestOptions).done(success).fail(failure);
}


function saveUserNameToDB(username, location, success, failure) {
    console.log("saving user name in service")
    const requestOptions = {
        "url": "http://localhost:8080/api/user/",
        "dataType": "json",
        "type": "POST",
        "data": {
            username: username,
            location: location
        }
    }

    console.log(requestOptions, success, failure)

    $.ajax(requestOptions).done(success).fail(failure);
}


// function getWeatherData(url, success, failure) {
//     const requestOptions = {
//         "url": "http://localhost:8080/api/external/weather/"+url
//         "dataType": "json",
//         "type": "POST"
//     }
//     $.ajax(requestOptions).done(success).fail(failure);
// }



