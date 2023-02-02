import React from 'react';
import "./profile.css";
import { useState , useContext} from 'react';
// import {useContext} from 'react';
import {AuthContext} from "../AuthContext";
import { useEffect } from 'react';
import { db } from '../firebase';
import { getDoc , doc} from 'firebase/firestore';

function Profile() {
  //useCase to give me uid
  let cUser = useContext(AuthContext);
  let[user, setUser] = useState();
  let [pageLoading, setPageLoading] = useState(true); 

  useEffect(function fun(){ 
    (async function(){
      
      //version ---> 8 
      //db.collection("users").doc(user.uid);
      //await docRef.get();
      var docRef = doc(db, "users", cUser.uid);
      var userObj = await getDoc(docRef);
      
      console.log("DOCUMENT DATA :" , userObj.data());
      setUser(userObj.data());
      setPageLoading(false);
    }
    )()


  }, [])

  return (
    <>
      {pageLoading == true ? 
        <div>Loading ....</div> :
        <>
          <div className="header"></div>
          <div className="main">
            <div className="pimg_container">
              <img src={user.profileImgUrl} alt=""
              className="pimg"/>
            </div>
            <div className="details">
              <div className="content"> {user.name} </div>
              <div className="content"> No. of posts : 
                <span className="bold_text"> Posts </span>
              </div>
              <div className="content"> Email : 
                <span className="bold_text">Email.com</span>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Profile;