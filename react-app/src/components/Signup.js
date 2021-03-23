import "../styles.css";
import Services from "../services.js";
import React from "react";

async function saveUserName() {
    let username = document.querySelector("#userinput").value;
    let data;

    try {
        data = await Services.saveUserNameToDB(username);
    } catch(e) {
        console.log("Error caught", e.responseText);
    }

    if (data) {
        this.setState({
            signupSuccess : true,
            signupFailure : false
        })
    
    } else {
        this.setState({
            signupFailure : true,
            signupSuccess : false
        })
 
    }
}

async function login() {
    let data, username
    username = document.querySelector('#userlogin').value;

    try {
        data = await Services.loginWithUserName(username);
    } catch(e) {
       // Doesn't work, for some reason 
    }
    
    if (data) {
        this.setState({
            loginSuccess: true,
            loginFailure: false
        })
        this.props.onLogin(data);
    } else {
        this.setState({
            loginSuccess: false,
            loginFailure: true
        })
        
    }
}





class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signupSuccess: false,
            signupFailure: false,
            loginSuccess: false,
            loginFailure: false
        }
        this.methods = {
            login: login.bind(this),
            saveUserName: saveUserName.bind(this)
        }
    }

    render() {
        return (    
            <div id="login-container">
                <h1>Brian's Weather App</h1>
                <div id="signinlogin">
                    <p>Sign Up Below:</p>
                    <fieldset>
                        <label>Username:</label>
                        <input type="text" id="userinput"></input>
                        <button onClick={this.methods.saveUserName}>Save</button><br/>
                        {(this.state.signupSuccess) ? <p className="success" id="save-user-success">Congrats! You can sign in now!</p> : ''}
                        {(this.state.signupFailure) ?  <p className="error" id="save-user-error">Error. You may already have an account. Try signing in.</p> : '' }                   
                    </fieldset>
                    <fieldset>
                        <label>Login:</label>
                        <input type="text" id="userlogin"></input>
                        <button onClick={this.methods.login}>Login</button>
                        {(this.state.loginFailure) ?  <p className="error" id="save-user-error">Error. Have you signed up?</p> : '' }  
                    </fieldset>
                </div>
        </div>
            )
        }
}

export default Signup