import './Login.css';
import {auth} from '../firebase-config.js';
import { useState } from "react";
import { signInWithEmailAndPassword,  } from 'firebase/auth';


function Login(){

    const [loginEmail, setLoginEmail]= useState("");
    const [loginPassword, setLoginPassword]= useState("");



    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
    } catch (error){
        console.log(error.message);
    }

    };

   return (
    <div className="form">
    <form>

        <h2>Login</h2>
        <div className="input-cointainer">
            <label >Email:</label>
            <input name="email" id="email" onChange={(event)=>{setLoginEmail(event.target.value)}}/>
        </div>
        <div className="input-container">
            <label >Password:</label>
            <input type="password" name="password" id="password" onChange={(event)=>{setLoginPassword(event.target.value)}}/>
        </div>
        <div id="button_container">
            <button onClick={login}>Login</button>
          
        </div>                
  </form>
  </div>
   )
}


export default Login;