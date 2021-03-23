
// This files contains calls to external apis

let request = require('request');

// A User-Agent (any) is needed for weather.gov api
request = request.defaults({
    headers: {"User-Agent": "BriansWeatherApp"}
});

// Zipcode api returns location information for zipcodes
// Docs: https://www.zipcodeapi.com/API#zipToLoc
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

// gets metadata first, then uses a url from that to
// get forcast data
exports.getWeatherMetaData = (req, res) => {
    const lat = req.params.lat;
    const lng = req.params.lng;
    let url = "https://api.weather.gov/points/"+lat+","+lng;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parsedBody = JSON.parse(body);
            let nextUrl = parsedBody.properties.forecast;
            console.log("nextUrl", nextUrl);
            request(nextUrl, (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    console.log("error",error)
                    res.status(response.statusCode).json(error);
                } else {
                    let pbody = JSON.parse(body);    
                    res.send(pbody.properties.periods);
                }
            })   
        }
        else {
            console.error("Error!", error)
            res.status(500).json({ error: error });
        }    
    });
}



