// TODO: Refactor promises and callbacks into async/await


// Gets a latitude, longitude, and other info based on zipcode
function getLocationByZip(zipcode, success, failure) {
    
    const reqOptions = {
        "url": "http://localhost:8080/api/external/location/"+zipcode,
        "dataType": "json",
        "type": "GET"
    }
    
    $.ajax(reqOptions).done(success).fail(failure);
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
            location: location
        }
    }

    $.ajax(requestOptions).done(success).fail(failure);
}

// Gets userid for unique username as login token
async function loginWithUserName(username, success, failure) {
    const requestOptions = {
        "url": "http://localhost:8080/api/user/login/"+username,
        "dataType": "json",
        "type": "POST",
        "data": {
            username: username,
        }
    }

    $.ajax(requestOptions).done(success).fail(failure);
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




