
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
      showPage: "splash",
      loggedIn: false,
      userInfo: null
    };
    
    this.pageChangeHandler = (name) => {
        this.setState({
          showPage: name
        })
      }
    this.login = (userInfo) => {

      console.log("userInfo", userInfo);

      this.setState({
        loggedIn: true,
        userInfo: userInfo
      })
      this.pageChangeHandler('locations')
    }
    this.logout = () => {
      this.setState({
        userInfo: null
      })
      this.pageChangeHandler('splash')
    }
      
  }


  render( ) {

  let page;
    
  if (this.state.showPage === "splash") {
    page = <Splash handler={this.pageChangeHandler}></Splash>
  } 

  if (this.state.showPage === "signup") {
    page = <Signup 
            handler={this.pageChangeHandler}
            onLogin={this.login}
          ></Signup>
  } 

  if (this.state.showPage === "locations") {
    page = <MyLocation 
            handler={this.pageChangeHandler}
            userInfo={this.state.userInfo}
            onLogout={this.logout}
          ></MyLocation>
  }



      return page;
  }
}


export default App;
