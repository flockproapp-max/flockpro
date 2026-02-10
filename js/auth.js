// js/auth.js - Authentication Module
import { firebaseConfig, RECAPTCHA_SITE_KEY } from './config.js';

let auth;
let appCheck;

export async function initAuth() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Initialize App Check
    appCheck = firebase.appCheck();
    appCheck.activate(RECAPTCHA_SITE_KEY, true);
    
    auth = firebase.auth();
    return auth;
}

export function getCurrentUser() {
    return auth.currentUser;
}

export async function signIn(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
}

export async function signUp(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
}

export async function signOut() {
    return await auth.signOut();
}

export function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}
