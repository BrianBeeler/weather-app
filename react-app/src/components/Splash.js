import logo from '../sun_image.png';

function Splash(props){
    return (    
        <div className="App">
            <header className="App-header">
                <h1>Brian's Weather App</h1>
                <img src={logo} className="App-logo" alt="logo" />
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