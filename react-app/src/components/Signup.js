import "../styles.css";
import Services from "../services.js";

function saveUserName() {
    let username = document.querySelector("#userinput").value
    Services.saveUserNameToDB(username,  saveUserFailure, saveUserSuccess,)

    // Append success message, remove error message
    function saveUserSuccess() {
        document.querySelector("#save-user-success").style.display = "inline-block";
        document.querySelector("#save-user-error").style.display = "none";
    }

    // Append success error message, remove success message
    function saveUserFailure(error) {
        console.error("Error", error);
        document.querySelector("#save-user-success").style.display = "none";
        document.querySelector("#save-user-error").style.display =  "inline-block";
    }
}

let username,timeout, userLocations, zipcode, lat, lng, userId;

function login() {
    let username = document.querySelector("#userlogin").value
    Services.loginWithUserName(username,  success, failure);

    function success(data) {
        if (data.id) {
            userId = data.id;
            username = data.username;
            document.querySelector("#signed-in").style.display = "inline"
            document.querySelector("#signed-in-name").innerHTML = "";
            document.querySelector("#signed-in-name").append(`${username}`);
            const loginSuccess = new Event('loginSuccess');
            document.dispatchEvent(loginSuccess);
        }
    }
    function failure(data) {
        alert("Login failed, do you have an account?")
    }
}

function Signup(props){

    async function login() {
        let data, username
        username = document.querySelector('#userlogin').value;

        try {
            data = await Services.loginWithUserName(username);
        } catch(e) {
           // Doesn't work, for some reason 
        }
        
        if (data) {
            props.onLogin(data);
        } else {
            console.error("An error occured!");
        }
        
      
    }



    return (    
        <div id="login-container">
            <h1>Brian's Weather App</h1>
            <div id="signinlogin">
                <p>Sign Up Below:</p>
                <fieldset>
                    <label>Username:</label>
                    <input type="text" id="userinput"></input>
                    <button onClick={saveUserName}>Save</button><br/>
                    <p className="success" id="save-user-success">Congrats! You can sign in now!</p>
                    <p className="error" id="save-user-error">Error. You may already have an account. Try signing in.</p>
                </fieldset>
                <fieldset>
                    <label>Login:</label>
                    <input type="text" id="userlogin"></input>
                    <button onClick={login}>Login</button>
                </fieldset>
            </div>
    </div>
  )
}

export default Signup