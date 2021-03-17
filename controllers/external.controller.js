let request = require('request');

request = request.defaults({
    headers: {"User-Agent": "BriansWeatherApp"}
});
// Create and Save a new Tutorial


// Find a single Tutorial with an id
    exports.getLocationByZip = (req, res) => {
        const zip = req.params.zip;
        zipcode = 42721
        var clientKey = "uIiN6JEncIkxyjKZfYIyVCJ0ycJXmcJAtcPeBRcaCdToVtm8YYm6CvcTXRld1tbo";
        let url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/degrees"
        console.log(url)

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Success:",body);
                res.send(body); 
            }
            else {
                console.log("Error", body)
                res.send(body);
            }
        });
    }

    exports.getWeatherByPoint = (req, res) => {
        console.log("Get weather by point.");
        const lat = req.params.lat;
        const lng = req.params.lng;
        let url = "https://api.weather.gov/points/"+lat+","+lng;
        console.log(url);

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Success:",body);
                res.send(body); 
            }
            else {
                console.log("Error", body)
                res.send(body);
            }
        
        });
    }

