// Initialize Firebase

import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCuYzyPBPAU3bGQ3YQy11fnYWeaaO1-_8w",
  authDomain: "superflow-7aa26.firebaseapp.com",
  databaseURL: "https://superflow-7aa26.firebaseio.com",
  projectId: "superflow-7aa26",
  storageBucket: "superflow-7aa26.appspot.com",
  messagingSenderId: "392075844363"
};
firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider();
let fbLogin = firebase.auth()

export {
    provider, fbLogin
}