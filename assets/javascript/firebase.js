//test
console.log('firebase');
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

  $(document).ready(function(){

  //DOM get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnSignOut');

  btnLogin.addEventListener('click', e=>{
      //get email & pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //sign in
  const promise = auth.signInWithEmailAndPassword(email,pass); 
  promise.catch(e=> console.log(e.message));
  $("body").find(".signIn")
  $("body").removeClass("signIn");
  $("#sign-in").hide();
  $("nav").show('slow');
  })

  btnSignUp.addEventListener('click', e=>{
    //get email & pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign up
const promise = auth.createUserWithEmailAndPassword(email,pass);
promise.catch(e=> console.log(e.message));
$("body").find(".signIn")
$("body").removeClass("signIn");
$("#sign-in").hide();
$("nav").show('slow');
})

firebase.auth().onAuthStateChanged(firebaseUser=>{
    if(firebaseUser){
        console.log(firebaseUser);
    }else{
        console.log('not logged in')
    }
})
  })
