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
let user = firebase.auth().currentUser;

// handles signing in 
const signIn = () => {
    if (user) {
        auth.signOut();
    }else{
        let email = $(".email-input").val().trim();
        let password = $(".password-input").val().trim();
        //if email is too short or not correct or input
        if (email.length < 5) {
            $(".msg").append("Please enter an email address.");
            return;
        }
        //if password length is not correct or input
        if (password.length < 6) {
            $(".msg").append("Please enter a password.");
            return;
        }
        //starting the sign in process
        auth.signInWithEmailAndPassword(email, password).cath(function(error){
            //space for handeling errors
            let errorCode = error.code;
            let errorMsg = error.message;
            //lets user know if password is incorrect
            if (errorCode === 'auth/wrong-password'){
                $(".msg").append("Wrong Password.");
            }else{
                $(".msg").append(errorMsg);
            }
        })

    }
}

// handles when a user is signing up for the first time
const signUp = () => {
    let email = $(".email-input").val().trim();
    let password = $(".password-input").val().trim();
    // what to do when an email address is not entered or short
    if (email.lenght < 5) {
        $(".msg").append("Please enter an email address");
        return;
    }
    // what to do when a password is not entered or too short
    if (password.length < 6) {
        $(".msg").append("Please enter a password longer than 6 characters");
        return;
    }
    //creates a new user with an email and password
    auth.createUserWithEmailAndPassword(email, password).catch(function(error){
        let errorCode = error.code;
        let errorMsg = error.message;
        if (errorCode === "auth/weak-password") {
            $(".msg").append("This password is too weak, please create a stronger password");
        }else{
            $(".msg").append(errorMsg);
        }
    })
}

// handels sending an email verification
const emailVerif = () => {
    
}