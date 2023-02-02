import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import {auth, db    } from '../firebase';
import {collection, addDoc, setDoc, doc} from "firebase/firestore";
 



function Signup() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState("");
  let [user, setUser] = useState("");

  async function processSignup() {
    try{
      setLoader(true);
      let userCred = await createUserWithEmailAndPassword(auth, email, password);
      const docRef = await setDoc(doc(db, "users", userCred.user.uid),{
        email,
        name,
        reelsIds:[],
        profileImgUrl: "",
        userId: userCred.user.uid
      });
      setUser(userCred.user);

    } catch (err){
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000)
    }
    setLoader(false);

  }
  
  return (
    <>
      {error != "" ? <h1>Error is {error}</h1>:
        loader == true ? <h1>...Loading</h1> :
          user != "" ? 
            <h1>user is {user.uid} </h1> 
          :
          <>
          <input type="email" onChange={(e) => {
            setEmail(e.target.value)
          }} value={email} placeholder="Email / Username">
          
          </input>
          <br></br>
  
          <input type="password" onChange={(e) => {
            setPassword(e.target.value)
          }} value={password} placeholder="PASSWORD">
          
          </input>
          <br></br>
  
          <input type="text" onChange={(e) => {
            setName(e.target.value)
          }} value={name} placeholder="Full Name">
          
          </input>
          <br></br>
  
          <button type="click" onClick={processSignup} >Sign In</button>
      </>

      }
    </>
  )
}
    
  

export default Signup;