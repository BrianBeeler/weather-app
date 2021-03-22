import "../styles.css";
import Services from "../services.js"

function saveUserName() {

}

function login() {

}

function Signup(props){

    function login() {
        // Do stuff
        props.handler('locations');
    }
    function getWeather() {

    }
    function promptUserForZipcode() {

    }

    let debounceOut= false
    let zipTimeout = null

    function zipChange() {
        if (zipTimeout) {
            clearTimeout(zipTimeout);
        }
        zipTimeout = setTimeout(()=> {
            let zip = document.querySelector("input[name='zipcode']").value;
            getLocationInfo(zip);
        },2000)
    }

    async function getLocationInfo(zipcode) {
        console.log(zipcode);
        let zipPattern = new  RegExp('^[0-9]{5}$');
        let validZip = zipPattern.test(zipcode);
        if (!validZip) {
            alert("Please enter a valid zipcode")
        } else {
            let locationInfo = await Services.getLocationByZip(zipcode);
            console.log(locationInfo);
            document.querySelector("input[name='city']").value = locationInfo.city;
            document.querySelector("input[name='state']").value = locationInfo.state;
        }
    }

   

    console.log(props);

    return (    
        <div id="signed-in">
            <h2>Congrats! You are signed with username: <span id="signed-in-name">{props.userInfo.username}</span>.</h2> 
            <div id="location-info">
                Zip: <input type="text" name="zipcode" onChange={zipChange} /><br />
                City: <input type="text" name="city" readOnly /><br />
                State: <input type="text" name="state" readOnly /><br />
                <br/>      
            </div>
            <div id="location-buttons">
                <label>Is this the location you meant?</label>
                <button className="btn fourth" onClick={getWeather}>Yes, check weather!</button><br/>
            </div>
            <h3>Your Saved Locations</h3>
            <p> - You currently have no saved locations.</p>
        </div>
  )
}

export default Signup