const { regexp } = require("sequelize/types/lib/operators");
const { getWeatherByPoint } = require("../controllers/external.controller");

let zipcode = prompt('Choose a 5 digit zip code to search the weather.')
let zipPattern = new regexp('^\d{5}$')
let validZip = zipPattern.test(zipcode);

if (validZip) {
    getLocationByZip(zip, (data)=>{
        // Success flow
        
        // disaplay location data
        // ask if correct
        // render check whether and try again buttons

    }, () => {
        // render: there was an error
        // render: try again button

    })

} else {
    // render improper zipcode message with try again button
}


let onCheckWeather() => {
    getWeatherByPoint()
}


getLocationByZip(zip, (data) {
    //Success
    console.log("Success", data.lat, data.lng);

}, (data) => {
    //Failure
    console.log(data);
})