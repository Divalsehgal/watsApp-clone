import firebase from "firebase";
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBImx0EzBfY6jvaFeLfNBqZeWWF7t7SIrQ",
  authDomain: "watsapp-clone-255d0.firebaseapp.com",
  databaseURL: "https://watsapp-clone-255d0.firebaseio.com",
  projectId: "watsapp-clone-255d0",
  storageBucket: "watsapp-clone-255d0.appspot.com",
  messagingSenderId: "751604617411",
  appId: "1:751604617411:web:c0663183b40d8964cf1276",
  measurementId: "G-K54ELJ9NTB",
});

 const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();
const storage = firebaseConfig.storage();
const provider = new firebase.auth.GoogleAuthProvider()
 export { db, auth, storage,provider };
export default db