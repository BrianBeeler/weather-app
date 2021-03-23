import "../styles.css";
import Services from "../services.js"
import React from "react";

function saveUserName() {

}

function login() {

}

class Locations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userWeather: []
        }
        this.locationInfo = null;
        this.debounceOut = false;
        this.zipTimeout = null;
        this.zipChange = () => {
            if (this.zipTimeout) {
                clearTimeout(this.zipTimeout);
            }
            this.zipTimeout = setTimeout(()=> {
                let zip = document.querySelector("input[name='zipcode']").value;
                this.getLocationInfo(zip);
            },2000);
        };
        this.getLocationInfo = async function getLocationInfo(zipcode) {
            console.log(zipcode);
            let zipPattern = new  RegExp('^[0-9]{5}$');
            let validZip = zipPattern.test(zipcode);
            if (!validZip) {
                alert("Please enter a valid zipcode")
            } else {
                this.locationInfo = await Services.getLocationByZip(zipcode);
                this.locationInfo.zipcode = zipcode;
                console.log(this.locationInfo);
                document.querySelector("input[name='city']").value = this.locationInfo.city;
                document.querySelector("input[name='state']").value = this.locationInfo.state;
            }
        }
        this.getWeatherForAllLocations =   async function getWeatherForAllLocations() {

            let locations = await Services.getUserLocationsById(props.userInfo.id)
            let weatherPromises = await locations.map(async (location) => {
            let weatherData = await Services.getWeatherMetaData(location.lat, location.lng)
        
            console.log("locations", locations);

                return { 
                    city: location.city,
                    zipcode: location.zipcode,
                    lat: location.lat,
                    lng:location.lng,
                    current:weatherData[0].shortForecast,
                    temperature: weatherData[0].temperature
                }
            });
        
            let res = await Promise.all(weatherPromises);
            console.log("res", res);
            this.setState({
                userWeather: res
            })
        }
        this.saveLocation = async ()=> {
            if (this.props.userInfo) {
                let savedLocation = await Services.saveUserLocation(this.props.userInfo.id, this.locationInfo.zipcode, this.locationInfo.lat, this.locationInfo.lng);
                this.getWeatherForAllLocations();
            } else {
                prompt("Please try that again.")
            }
 
        }
    }


    componentDidMount() {
        this.getWeatherForAllLocations();
    }

    render() {
 
        

        return (
        <div id="signed-in">
            <h2>Congrats! You are signed with username: <span id="signed-in-name">{this.props.userInfo.username}</span>.</h2> 
            <div id="location-info">
                Zip: <input type="text" name="zipcode" onChange={this.zipChange} /><br />
                City: <input type="text" name="city" readOnly /><br />
                State: <input type="text" name="state" readOnly /><br />
                <br/>      
            </div>
            <div id="location-buttons">
                <label>Is this the location you meant?</label>
                <button className="btn fourth" onClick={ () => {
                    this.saveLocation()
                }}>Yes, check weather!</button><br/>
            </div>
            <div>
                <h3>Your Saved Locations</h3>
                {this.state.userWeather.map((value, index) => {
                    return <p key={index}>The weather in zipcode: {value.zipcode} is {value.current} with a temperature of {value.temperature}</p>
                })}
                <p> - You currently have no saved locations.</p>

            </div>
        </div>)
    }
}

export default Locations