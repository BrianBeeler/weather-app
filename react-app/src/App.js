
import './App.css';
import GetWeather from './components/GetWeather.js'
import MyLocation from './components/MyLocations.js'
import Signup from './components/Signup.js'
import Splash from './components/Splash.js'
import React from 'react';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      showPage: "splash"
    };
    
    this.pageChangeHandler = (name) => {
        this.setState({
          showPage: name
        })
      }
  }


  render( ) {

    let page;

    if (this.state.showPage === "weather") {
      page = <GetWeather handler={this.pageChangeHandler}></GetWeather>
    }
    if (this.state.showPage === "locations") {
      page = <MyLocation handler={this.pageChangeHandler}></MyLocation>
    }
    if (this.state.showPage === "splash") {
      page = <Splash handler={this.pageChangeHandler}></Splash>
    } 
    if (this.state.showPage === "signup") {
      page = <Signup handler={this.pageChangeHandler}></Signup>
    } 

    return page;
  }
}


export default App;
