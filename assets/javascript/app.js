 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDVrSkm_KDrlSCH0KDWo3pQIKfW5xRRWJk",
    authDomain: "cravings-e8497.firebaseapp.com",
    databaseURL: "https://cravings-e8497.firebaseio.com",
    projectId: "cravings-e8497",
    storageBucket: "cravings-e8497.appspot.com",
    messagingSenderId: "938938502432"
  };
  firebase.initializeApp(config);

//firebase database reference
let auth = firebase.auth();
let dB = firebase.database();
