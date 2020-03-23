import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyATcogpt-D3fKhvkpjPih5Ribw5X66klRU",
    authDomain: "todo-list-f7917.firebaseapp.com",
    databaseURL: "https://todo-list-f7917.firebaseio.com",
    projectId: "todo-list-f7917",
    storageBucket: "todo-list-f7917.appspot.com",
    messagingSenderId: "447705694413",
    appId: "1:447705694413:web:ce3551ef19d73ec03b6984",
    measurementId: "G-42EMNM363X"
};


firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();


