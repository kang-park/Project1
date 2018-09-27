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

//global variables to hold for firebase
let workingUser = '';

// handles signing in 
const signIn = () => {
    if (user) {
        auth.signOut();
    } else {
        let email = $(".email-input").val().trim();
        let password = $(".password-input").val().trim();
        workingUser = email;
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
        auth.signInWithEmailAndPassword(email, password).cath(function (error) {
            //space for handeling errors
            let errorCode = error.code;
            let errorMsg = error.message;
            //lets user know if password is incorrect
            if (errorCode === 'auth/wrong-password') {
                $(".msg").append("Wrong Password.");
            } else {
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
    if (password.length < 6 || password.match(/[A-z]/) || password.match(/[A-Z]/) || password.match(/\d/) ) {
        $(".msg").append("Please enter a password longer than 6 characters, has at least 1 capital letter, and 1 number.");
        return;
    }
    //creates a new user with an email and password
    auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
        let errorCode = error.code;
        let errorMsg = error.message;
        if (errorCode === "auth/weak-password") {
            $(".msg").append("This password is too weak, please create a stronger password");
        } else {
            $(".msg").append(errorMsg);
        }
        emailVerif();
    })
}

// handels sending an email verification
const emailVerif = () => {
    user.sendEmailVerification().then(function() {
        $(".msg").append("Email verification has been sent!");
    })
}

//handels password resets
const passReset = () => {
    let email = $(".email-input").val().trim();
    auth.sendPasswordResetEmail(email).then(function() {
        $(".msg").append("Password reset email has been sent!");
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMsg = error.message;
        if (errorCode === "auth/invalid-email") {
            $(".msg").append("Email is invalid");
            return;
        }
        if (errorCode === "auth/user-not-found") {
            $(".msg").append("Email/user was not found");
            return;
        }
    })
}
//saves recent searches in database for each user
// will create database branch by username, if not already created, then brings up recent searches. only last 5 searches. 
const searchSave = () => {
    let recentSearch = $(".search-input").val().trim();
    db.ref(workingUser).set({
        recents: recentSearch,
    })
}

$(".signIn").on("click", signIn);
$(".signUp").on("click", signUp);
$(".restPass").on("click",passReset);