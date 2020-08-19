import * as React from "react";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBfRGMIIf3Ja9QquvEk4EaA0I9g1p_7zoQ",
    authDomain: "newproject123123-dc2d8.firebaseapp.com",
    databaseURL: "https://newproject123123-dc2d8.firebaseio.com",
    projectId: "newproject123123-dc2d8",
    storageBucket: "newproject123123-dc2d8.appspot.com",
    appId: "1:324925880954:android:290d1228f69e1877dad9c3:ios:b07ef68ae83cd6a3dad9c3",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  };
export const AuthContext = React.createContext();