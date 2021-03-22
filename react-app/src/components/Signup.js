import "../styles.css";
import Services from "../services.js";

function saveUserName() {
    let username = document.querySelector("#userinput").value
    let zipcode;
    Services.saveUserNameToDB(username, zipcode, saveUserSuccess, saveUserFailure)

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

function login() {

}

function Signup(props){

    function login() {
        // Do stuff
        props.handler('locations');
    }


    return (    
        <div id="login-container">
            <h1>Brian's Weather App</h1>
            <div id="signinlogin">
                <p>Sign Up Below:</p>
                <fieldset>
                    <label>Username:</label>
                    <input type="text" id="userinput"></input>
                    <button onClick={saveUserName}>Save</button>
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