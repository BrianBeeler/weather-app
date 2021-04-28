import $ from "jquery";

// TODO: Refactor promises and callbacks into async/await
let apihost = "http://localhost:8080";

if (window.document.url === "brainsweatherapp.com") {
    apihost = "brainsweatherapp.com";
}
    

// Gets a latitude, longitude, and other info based on zipcode
function getLocationByZip(zipcode, success, failure) {
    
    const reqOptions = {
        "url": apihost+"/api/external/location/"+zipcode,
        "dataType": "json",
        "type": "GET"
    }
    
    return $.ajax(reqOptions)
}

function deleteLocation(zipcode, userid) {
   
    console.log("Is called.");

    const reqOptions = {
        "url": apihost+"/api/locations/",
        "dataType": "json",
        "type": "DELETE",
        "data": {
            zipcode: zipcode,
            userid: userid
        }
    }
    
    return $.ajax(reqOptions)
}

// Poorly named, gets whether info, not metadata
// TODO: rename
function getWeatherMetaData(lat, lng, success, failure) {
    const requestOptions = {
        "url": apihost+"/api/external/weather/"+lat+"/"+lng,
        "dataType": "json",
        "type": "GET"
    }
    return $.ajax(requestOptions).done(success).fail(failure);
}

// Saves a new user to the database
// TODO: remove "location"
function saveUserNameToDB(username) {
    const requestOptions = {
        "url": apihost+"/api/user/",
        "dataType": "json",
        "type": "POST",
        "data": {
            username: username,
        }
    }

    return $.ajax(requestOptions)
}

// Gets userid for unique username as login token
function loginWithUserName(username, success, failure) {
    const requestOptions = {
        "url": apihost+"/api/user/login/"+username,
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
        "url": apihost+"/api/locations/",
        "dataType": "json",
        "type": "POST",
        "data": {
            userid: userid,
            zipcode: zipcode,
            lat: lat,
            lng: lng
        }
    }

    return $.ajax(requestOptions).done(success).fail(failure);
}

// gets all locations for a given user, based on userid
function getUserLocationsById(userid, success, failure) {
    const reqOptions = {
        "url": apihost+"/api/locations/"+userid,
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
    getUserLocationsById: getUserLocationsById,
    deleteLocation: deleteLocation
}

export default Services;


