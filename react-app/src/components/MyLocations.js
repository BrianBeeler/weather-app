import "../styles.css";

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

    console.log(props);

    return (    
        <div id="signed-in">
            <h2>Congrats! You are signed with username: <span id="signed-in-name">{props.userInfo.username}</span>.</h2> 
            <div id="location-info">
                Zip: <input type="text" name="zipcode" readOnly /><br />
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