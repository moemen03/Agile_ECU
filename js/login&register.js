import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyA96E10la34g-MmjgmLBCb3_eDIcaBbSSg",
    authDomain: "lms-agile.firebaseapp.com",
    projectId: "lms-agile",
    storageBucket: "lms-agile.appspot.com",
    messagingSenderId: "824772985103",
    appId: "1:824772985103:web:0a3f0c599fbdbb2cd73e7a",
    measurementId: "G-PCC1RS2L9B"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

const analytics = getAnalytics(app);
// ^^^^^^^^^^^^^^

if(localStorage.getItem("uid")){
    window.location.href = "./index.html";
}

// ^^^^^^^^^^^^^^
let username_signup = document.getElementById("username_signup");
let userId_signup = document.getElementById("userId_signup");
let email_signup = document.getElementById("email_signup");
let birthdate_signup = document.getElementById("birthdate_signup");
let password_signup = document.getElementById("password_signup");


let email_login = document.getElementById("email_login");
let password_login = document.getElementById("password_login");


let signUpBtn = document.getElementById("signup-btn");
let loginBtn = document.getElementById("login-btn");

// ^^^^^^^^^^^^^^^
let RegisterUser = evt=>{
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email_signup.value, password_signup.value)
    .then((credential) => {
        console.log(credential);
        alert("Sign Up successful");
        set(ref(db, 'UserAuthList/' + credential.user.uid), {
            fullname: username_signup.value,
            userId: userId_signup.value,
            email: email_signup.value,
            birthdate: birthdate_signup.value
        })

    })
    .catch((error) => {
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

signUpBtn.addEventListener('click', RegisterUser);



let LoginUser = evt=>{
    evt.preventDefault();
    signInWithEmailAndPassword(auth, email_login.value, password_login.value)
    .then((credential) => {
        console.log(credential);
        localStorage.setItem("uid", credential.user.uid);
        window.location.href = "./index.html";
        
    })
    .catch((error) => {
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

loginBtn.addEventListener('click', LoginUser);



// ^^^^^^^^^^^^^
