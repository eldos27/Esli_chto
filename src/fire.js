import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAruC5exKHhn27uAe1i5gE78bbwxyoa2_c",
  authDomain: "login-e054f.firebaseapp.com",
  projectId: "login-e054f",
  storageBucket: "login-e054f.appspot.com",
  messagingSenderId: "586858779828",
  appId: "1:586858779828:web:71416bbf2c7d833ed3b3e1",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
