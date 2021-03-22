import logo from './sun_image.png';
import './App.css';

function App() {
  return (
    <div className="Weather-App">
      <header className="App-header">
        <h1>Brian's Weather App</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Find the weather in all your favorite locations.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in or sign up now!
        </a>
      </header>
    </div>
  );
}

export default App;
