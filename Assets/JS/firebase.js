  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCCcpjeBHxB_vr3Jfk4PG4Hckyn179uBIU",
    authDomain: "allwaysevermirai-652d7.firebaseapp.com",
    projectId: "allwaysevermirai-652d7",
    storageBucket: "allwaysevermirai-652d7.firebasestorage.app",
    messagingSenderId: "981268844844",
    appId: "1:981268844844:web:91741b4e2df1d88d499c89",
    measurementId: "G-VB7N79YCN8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);