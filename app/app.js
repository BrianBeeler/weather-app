// let myProgramFLow = () => {
//     let zipcode = prompt('Choose a 5 digit zip code to search the weather.')
//     let zipPattern = new  RegExp('^[0-9]{5}$');
//     let validZip = zipPattern.test(zipcode);
//     let lat = null;
//     let lng = null;



// const { getLocationByZip } = require("../controllers/external.controller");


//     if (validZip) {
//         getLocationByZip(zipcode, (data)=>{

//             console.log("Data", data);

//             lat = data.lat;
//             lng = data.lng;

//             document.querySelector("[name='zipcode']").value = zipcode;
//             document.querySelector("[name='city']").value = data.city;
//             document.querySelector("[name='state']").value = data.state; 



//             // Success flow
            
//             // display location data
//             // ask if correct
//             // render check whether and try again buttons

//         }, (error) => {
//             console.log("Error")

//             // render: there was an error
//             // render: try again button

//         })

//     } else {
//         console.log("Invalid zip");
//         // render improper zipcode message with try again button
//         alert("Not a valid zip code, please try again");
//         programFLow();
//     }

//     let getWeather = () => {
//         getWeatherMetaData(lat,lng, (data)=> {
//             console.log("Weather Data:", data);
//         }, (error)=> {
        
//         })
//     }

// }



// myProgramFLow();

let zipcode = null;
lat = null;
lon = null;
userId = null;
username = null;
userLocations = null;
userWeather = [];
promptUserForZipcode();

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

function getWeather() {
    console.log("Test")
    if (lat && lng) {
        getWeatherMetaData(lat,lng, getWeatherSuccess, getWeatherFailure);
    }
}

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

function saveUserName() {
    username = document.querySelector("#userinput").value
    console.log("Button clicked");
    saveUserNameToDB(username,zipcode, saveUserSuccess, saveUserFailure)

    function saveUserSuccess() {
        console.log("Username save");
        document.querySelector("#save-user-success").style.display = "inline-block";
        document.querySelector("#save-user-error").style.display = "none";
        // Append success message
    }
    function saveUserFailure(error) {
        console.log("Error", error);
        document.querySelector("#save-user-success").style.display = "none";
        document.querySelector("#save-user-error").style.display =  "inline-block";
        // Append error message
    }
}

function login() {
    username = document.querySelector("#userlogin").value
    loginWithUserName(username, success, failure);

    function success(data) {
        if (data.id) {
            console.log("Logged in with username: "+data.username);
            userId = data.id;
            username = data.username;
            document.querySelector("#signed-in").style.display = "inline"
            document.querySelector("#signed-in-name").append(`${username}`);
            const loginSuccess = new Event('loginSuccess');
            document.dispatchEvent(loginSuccess);
        }
        saveUserLocation(userId, zipcode, lat, lng, successLocSave, failureLocSave)

        function successLocSave(data) {
            console.log("Location saved too", data)
            userLocations = data;
            const UserDataSaved = new Event('user-data-saved');
            document.dispatchEvent(UserDataSaved);
        }

        function failureLocSave() {
            console.log("Locations not saved")
        }
    }
    function failure(data) {

    }
}

function getUserLocations() {
    getUserLocationsById(userId, (data)=> {
        console.log("the location for this user are: ", data )
    }, () => {
        console.log("Unable to get locations for this user.")
    })
}

function onSignedIn() {
    console.log("On Signed In Called.");
}


document.addEventListener('loginSuccess', function(e) {
    console.log("DID LOGIN!!!!");
});

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
            console.log("Weather Info: ", weatherInfo);
        })

        

});