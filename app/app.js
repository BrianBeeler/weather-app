// Set initial variables

let zipcode = null;
lat = null;
lon = null;
userId = null;
username = null;
userLocations = null;
userWeather = [];

promptUserForZipcode();

// Prompts and validates a zipcode,
// gets location for that zipcode
function promptUserForZipcode () {

    zipcode = prompt('Choose a 5 digit zip code to search the weather.')
    let zipPattern = new  RegExp('^[0-9]{5}$');
    let validZip = zipPattern.test(zipcode);
    if (!validZip) {
        alert("Invalid zipcode, please try again!")
        promptUserForZipCode()
    } else {
        getLocationByZip(zipcode, getLocationSuccess, getLocationFailure)
    }

    function getLocationSuccess(data) {
        lat = data.lat;
        lng = data.lng;
    
        document.querySelector("[name='zipcode']").value = zipcode;
        document.querySelector("[name='city']").value = data.city;
        document.querySelector("[name='state']").value = data.state; 
    }
    
    function getLocationFailure() {
        alert("Unable to get location information for the zipcode. Try again.");
        promptUserForZipcode();
    }
    

}

// Tied to a button click event in #location-buttons div
function getWeather() {
    if (lat && lng) {
        getWeatherMetaData(lat,lng, getWeatherSuccess, getWeatherFailure);
        
        function getWeatherSuccess(data) {
            if (data && data.length > 0) {
                let soonestWeather = data[0];
                document.querySelector("#splash").style.display = "none";
                document.querySelector("#login-container").style.display = "block";   
                document.querySelector('#weather-condition').innerHTML= soonestWeather.shortForecast;
                document.querySelector('#weath-temp').innerHTML= soonestWeather.temperature;
            } else {
                throw Error("No Weather Data");
            }
            
        }

        function getWeatherFailure() {
            alert("Cannot currently get weather for that location.");
        }
    }
}

// Tied to save button
function saveUserName() {
    username = document.querySelector("#userinput").value
    console.log("Button clicked");
    saveUserNameToDB(username,zipcode, saveUserSuccess, saveUserFailure)

    // Append success message, remove error message
    function saveUserSuccess() {
        console.log("Username save");
        document.querySelector("#save-user-success").style.display = "inline-block";
        document.querySelector("#save-user-error").style.display = "none";
    }

    // Append success error message, remove success message
    function saveUserFailure(error) {
        console.log("Error", error);
        document.querySelector("#save-user-success").style.display = "none";
        document.querySelector("#save-user-error").style.display =  "inline-block";
    }
}

// Tied to login button
function login() {
    username = document.querySelector("#userlogin").value
    loginWithUserName(username, success, failure);
    let timeout = true;

    // Bug: login api doesn't return an error for no user
    // should be fixed on api. this is a quick fix.
    setTimeout(()=> {
        if (timeout) {
            alert("Request timed out. Do you have an account?");
        }
    }, 4000)

    function success(data) {
        if (data.id) {
            userId = data.id;
            username = data.username;
            document.querySelector("#signed-in").style.display = "inline"
            document.querySelector("#signed-in-name").append(`${username}`);
            const loginSuccess = new Event('loginSuccess');
            document.dispatchEvent(loginSuccess);
        }
        saveUserLocation(userId, zipcode, lat, lng, successLocSave, failureLocSave)

        function successLocSave(data) {
            timeout = false;
            userLocations = data;
            const UserDataSaved = new Event('user-data-saved');
            document.dispatchEvent(UserDataSaved);
        }

        function failureLocSave() {
            timeout = false;
            alert("Error signing in. Do you have an account?")
        }
    }
    function failure(data) {

    }
}

// When user location data is saved, get weather data for each
// location
document.addEventListener('user-data-saved', async function(e) {
    
        let locations = await getUserLocationsById(userId)
        let weatherPromises = await locations.map(async (location) => {
        let weatherData = await getWeatherMetaData(location.lat, location.lng)

            return { 
                zipcode: location.zipcode,
                lat: location.lat,
                lng:location.lng,
                current:weatherData[0].shortForecast,
                temperature: weatherData[0].temperature
            }
        });

        Promise.all(weatherPromises).then((weatherInfo) => {
            console.log("Weather Info", weatherInfo);
            userWeather = weatherInfo;
            const WeatherInfoSaved = new Event('weather-info-saved');
            document.dispatchEvent(WeatherInfoSaved);
        })

});


// When whether info is saved, update the dom appropriately
document.addEventListener('weather-info-saved', () => {
    document.querySelector('#login-container').style.display = 'none';
    let yourLoc = document.querySelector("#your-locations");
    yourLoc.style.display = 'flex';
    yourLoc.innerHTML = '';
    for (i = 0; i < userWeather.length; i++) {
        yourLoc.innerHTML +=( (`<p>The current weather in ${userWeather[i].zipcode} 
            is: ${userWeather[i].current}, with a temperature of ${userWeather[i].temperature}.`));
    } 
});