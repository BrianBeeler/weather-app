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

        // Set up some initial variables
        this.locationInfo = null;
        this.debounceOut = false;
        this.zipTimeout = null;

        // Function runs after key stroke in zip field.
        // Function is debounced by 2 seconds
        this.zipChange = () => {
            if (this.zipTimeout) {
                clearTimeout(this.zipTimeout);
            }
            this.zipTimeout = setTimeout(()=> {
                let zip = document.querySelector("input[name='zipcode']").value;
                this.getLocationInfo(zip);
            },2000);
        };

        // Api call to get city, state, lat, and lng from zipcode
        this.getLocationInfo = async function getLocationInfo(zipcode) {
            console.log(zipcode);
            let zipPattern = new  RegExp('^[0-9]{5}$');
            let validZip = zipPattern.test(zipcode);
            if (!validZip) {
                alert("Please enter a valid zipcode")
            } else {
                try {
                    this.locationInfo = await Services.getLocationByZip(zipcode);
                } catch {
                    console.error("No location returned for zipcode.")
                } 
                
                if (this.locationInfo) {
                    this.locationInfo.zipcode = zipcode;
                    this.setState({
                        locationData: this.locationInfo
                    })
                    console.log(this.locationInfo);
                    document.querySelector("input[name='city']").value = this.locationInfo.city;
                    document.querySelector("input[name='state']").value = this.locationInfo.state;
                } else {
                    alert("This zip did not return a location.")
                }

            }
        }

        // Gets weather for all user locations, updates react state
        this.getWeatherForAllLocations =   async function getWeatherForAllLocations() {

            let locations = await Services.getUserLocationsById(props.userInfo.id)
            let weatherPromises = await locations.map(async (location) => {
                let weatherData = await Services.getWeatherMetaData(location.lat, location.lng)
            
                let forcast = weatherData[0].shortForecast
                forcast = forcast.charAt(0) + forcast.substring(1).toLowerCase();

                return { 
                    city: location.city,
                    zipcode: location.zipcode,
                    lat: location.lat,
                    lng:location.lng,
                    current:forcast,
                    temperature: weatherData[0].temperature
                }
            });
        
            let res = await Promise.all(weatherPromises);
            this.setState({
                userWeather: res
            })
        }

        // Saves a location with a username to the database
        this.saveLocation = async ()=> {
            if (this.props.userInfo) {
                let savedLocation = await Services.saveUserLocation(this.props.userInfo.id, this.locationInfo.zipcode, this.locationInfo.lat, this.locationInfo.lng);
                this.getWeatherForAllLocations();
            } else {
                prompt("Please try that again.")
            }
 
        }
        this.deleteLocation = (index) => {
            let zipcode = this.state.userWeather[index].zipcode;
            Services.deleteLocation(zipcode, props.userInfo.id);
        }
    }

    // When component loads/mounts, get all of that users locations
    componentDidMount() {
        this.getWeatherForAllLocations();
    }

    render() {
 
        return (
        <div id="signed-in">
            <h2>Congrats!</h2> 
            <h3>You are signed with username: <span id="signed-in-name">{this.props.userInfo.username}</span>.</h3> 
            <div id="location-info">
                Zip: <input type="text" name="zipcode" onChange={this.zipChange} /><br />
                City: <input type="text" name="city" readOnly /><br />
                State: <input type="text" name="state" readOnly /><br />
                <br/>      
            </div>
            {(this.state.locationData && this.state.locationData.zipcode) ? <div id="location-buttons">
                <button className="btn fourth" 
                        onClick={ () => {
                            this.saveLocation()
                        } }
                        disabled={ (this.state.locationData && this.state.locationData.zipcode) ? false: true}
                >Add this location</button><br/>
            </div> : ""}
            <div>
                <h3>My Locations</h3>
                {this.state.userWeather.map((value, index) => {
                    return <p key={index}> <span className="location-item">{value.zipcode}: {value.current}, with a temperature of {value.temperature}.</span>
                    <span className="delete" 
                        onClick={   () => {
                            this.deleteLocation(index)
                    }}></span></p>
                })}
                {(!this.state.userWeather || this.state.userWeather.length === 0) ? <p> - You currently have no saved locations.</p> : ''}

            </div>
            <div id="logout-container">
                <button className="btn fourth" onClick={this.props.onLogout}>Logout</button>
            </div>
        </div>)
    }
}

export default Locations