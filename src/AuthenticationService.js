import firebaseSystem from './firebase.config';
import firebase from 'firebase';

const auth = firebaseSystem.auth;

export default class AuthenticationService {
    static async signInUser (email, password) {
     let result = await auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("signing...");
    console.log(userCredential);
    return "success";
    // ...
  })
  .catch((error) => {
      console.log("error")
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    return errorMessage;
  });
return result;

    }
}

