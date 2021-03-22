import "../styles.css";

function saveUserName() {

}

function login() {

}

function Signup(props){
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