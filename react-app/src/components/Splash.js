import weatherPhoto from '../weather_photo.JPG';

// This is a simple component, redirects traffic to the login page
function Splash(props){
    return (    
        <div className="App">
            <header className="App-header">
                <img src={weatherPhoto} className="weather-photo" alt="logo" />
                <h1 className="app-title">Brian's Weather App</h1>
                <button
                    id="sign-up-link"
                    className="App-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={()=> {
                        props.handler("signup")
                    }}
                >
                Sign Up
                </button>
            </header>
        </div>
  )
}

export default Splash