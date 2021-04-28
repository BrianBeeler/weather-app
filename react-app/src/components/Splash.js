import weatherPhoto from '../weather_photo.JPG';
import logo from "../sun_image.png";
// This is a simple component, redirects traffic to the login page
function Splash(props){
    return (    
        <div className="App">
            <header className="App-header">
                <img src={weatherPhoto} className="weather-photo" alt="logo" />
                <h1 className="app-title">Brian's Weather App</h1>
                <a
                    id="sign-up-link"
                    className="App-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={()=> {
                        props.handler("signup")
                    }}
                >
                Sign Up
                </a>
            </header>
        </div>
  )
}

export default Splash