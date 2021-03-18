let request = require('request');

request = request.defaults({
    headers: {"User-Agent": "BriansWeatherApp"}
});
// Create and Save a new Tutorial


// Find a single Tutorial with an id
    exports.getLocationByZip = (req, res) => {
        const zip = req.params.zip;
        var clientKey = "uIiN6JEncIkxyjKZfYIyVCJ0ycJXmcJAtcPeBRcaCdToVtm8YYm6CvcTXRld1tbo";
        let url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zip + "/degrees";

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body); 
            }
            else {
                console.error("Error!", error)
                res.status(500).json({ error: error });
            }
        });
    }

    exports.getWeatherMetaData = (req, res) => {
        console.log("Get weather by point.");
        const lat = req.params.lat;
        const lng = req.params.lng;
        let url = "https://api.weather.gov/points/"+lat+","+lng;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let parsedBody = JSON.parse(body);
                request(parsedBody.properties.forecast, (error, response, body) => {
                    let pbody = JSON.parse(body);    
                    res.send(pbody.properties.periods);
                })
                
            }
            else {
                console.error("Error!", error)
                res.status(500).json({ error: error });
            }
        
        });
    }

