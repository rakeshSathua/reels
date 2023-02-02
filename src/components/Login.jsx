import React from 'react';
import { useEffect } from 'react';
import { auth} from '../firebase';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";

function Login() {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [user, setUser] = React.useState(null);
    let [loader, setLoader] = React.useState(false);
    let [error, setError] = React.useState("");
    // let [mainLoader, setMainLoader] = React.useState(true);

    const trackEmail = function(e){
        setEmail(e.target.value);
    }
    

    const trackPassword = function(e){
        setPassword(e.target.value);
    }

    const printDetail = async function() {
        try{
            //alert(email+" " + password);
            setLoader(true);
            let userCred = await signInWithEmailAndPassword(auth, email, password);
            //console.log(userCred.user);
            setUser(userCred.user);

        } catch (err){
            setError(err.message);
            setTimeout(() => {
                setError("")
            }, 2000)
        }
        

        setLoader(false)
        
    }
    const signout = async function(){
        //
        await signOut(auth);
        setUser(null);
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if (user){
                setUser(user);
            } else {
                setUser(null);
            }
            
        })
    }, [])
    
    return (
        <>
            {
                error != "" ? <h1>ERROR is {error}</h1>:
                    loader == true ? <h1>....Loading</h1>:
                        user != null ?
                        <>
                        <button onClick={signout}>Sign out</button> 
                        <h1>user is {user.uid}</h1> 
                        </>
                        :
                        <>
                            <input type="email" onChange={trackEmail} value={email} placeholder="Email / Username">
                            </input>
                            <br></br>
                            <input type="password" onChange={trackPassword} value={password} placeholder="PASSWORD">
                            </input>
                            <br></br>
                            <button type="click" onClick={printDetail}>Login</button>
                        </>
            }
        </>
    
    )
}

export default Login;