const request = require('request');

// Create and Save a new Tutorial


// Find a single Tutorial with an id
    exports.getLocationByZip = (req, res) => {
        const zip = req.params.zip;
        zipcode = 42721
        var clientKey = "uIiN6JEncIkxyjKZfYIyVCJ0ycJXmcJAtcPeBRcaCdToVtm8YYm6CvcTXRld1tbo";
        let url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zip + "/radians"

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            res.send(body); 
            }
            else {
                res.error(error);
            }
        });
    }

    exports.getWeatherByPoint = (req, res) => {
        console.log("Get weather by point.");
        const lat = req.params.lat;
        const lon = req.params.lon;
        let url = "https://api.weather.gov/points/"+lat+","+lon;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            res.send(body); 
            }
            else {
                console.log(response.statusCode);
            }
        });
    }

