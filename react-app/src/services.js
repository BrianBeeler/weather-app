import $ from "jquery";

// TODO: Refactor promises and callbacks into async/await
let apihost = "localhost:8080";

if (window.document.url === "brainsweatherapp.com") {
    apihost = "brainsweatherapp.com";
}


// TODO: 1. Remove localhost:8080, etc replace with "/"
//       2. Remove CORS, make sure it works       

// Gets a latitude, longitude, and other info based on zipcode
function getLocationByZip(zipcode, success, failure) {
    
    const reqOptions = {
        "url": "http://localhost:8080/api/external/location/"+zipcode,
        "dataType": "json",
        "type": "GET"
    }
    
    return $.ajax(reqOptions)
}

// Poorly named, gets whether info, not metadata
// TODO: rename
function getWeatherMetaData(lat, lng, success, failure) {
    const requestOptions = {
        "url": "http://localhost:8080/api/external/weather/"+lat+"/"+lng,
        "dataType": "json",
        "type": "GET"
    }
    return $.ajax(requestOptions).done(success).fail(failure);
}

// Saves a new user to the database
// TODO: remove "location"
function saveUserNameToDB(username, location, success, failure) {
    const requestOptions = {
        "url": "http://localhost:8080/api/user/",
        "dataType": "json",
        "type": "POST",
        "data": {
            username: username,
        }
    }

    $.ajax(requestOptions).done(success).fail(failure);
}

// Gets userid for unique username as login token
function loginWithUserName(username, success, failure) {
    const requestOptions = {
        "url": "http://localhost:8080/api/user/login/"+username,
        "dataType": "json",
        "type": "POST",
        "data": {
            username: username,
        }
    }

    return $.ajax(requestOptions);
}

// saves a location and the userid that signed in with that location
function saveUserLocation(userid, zipcode, lat, lng, success, failure) {
    const requestOptions = {
        "url": "http://localhost:8080/api/locations/",
        "dataType": "json",
        "type": "POST",
        "data": {
            userid: userid,
            zipcode: zipcode,
            lat: lat,
            lng: lng
        }
    }

    $.ajax(requestOptions).done(success).fail(failure);
}

// gets all locations for a given user, based on userid
function getUserLocationsById(userid, success, failure) {
    const reqOptions = {
        "url": "http://localhost:8080/api/locations/"+userid,
        "dataType": "json",
        "type": "GET",
    }
    return $.ajax(reqOptions).done(success).fail(failure);
}

const Services = {
    getLocationByZip: getLocationByZip,
    getWeatherMetaData: getWeatherMetaData,
    saveUserNameToDB: saveUserNameToDB,
    loginWithUserName: loginWithUserName,
    saveUserLocation: saveUserLocation,
    getUserLocationsById: getUserLocationsById
}

export default Services;


