import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import './Login.css';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);
    
const Login = () => {
     const [loggedInUser,setLoggedInUser] = useContext(userContext);
      const history = useHistory();
      const location = useLocation();
      let { from } = location.state || { from: { pathname: "/" } };
    const handleGoogleSignIn = ()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var {displayName,email} = result.user;
            const signedInUser = {name:displayName,email};
            setLoggedInUser(signedInUser);
            storeAuthToken();
            history.replace(from);

            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    const storeAuthToken = () =>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token',idToken);
            // Send token to your backend via HTTPS
            // ...
          }).catch(function(error) {
            // Handle error
          });
    } 
    return (   
        <div>
            <button onClick={handleGoogleSignIn} >
                <div className="googlesignin-btn" >
                <img src="https://news-cdn.softpedia.com/images/news2/the-new-google-logo-is-a-lesson-in-modern-design-490648-3.jpg"  alt=""/>   
               <span className="g-text">Sign in using Google  </span> 
                </div>
                
            </button>
        </div>
    );
};

export default Login;