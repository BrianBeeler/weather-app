
import './App.css';

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
    
    // The functions are handed down into components as props
    // to allow page changes
    this.pageChangeHandler = (name) => {
          this.setState({
            showPage: name
          })
    }
    this.login = (userInfo) => {
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

  // Routing is done with simple if statements. Depending on the state 
  // show a  specific component

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
