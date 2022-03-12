import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Add the Firebase Firestore service
import 'firebase/compat/auth'; // firebase.auth()
import { firebaseOptions } from '@/config/defaultsConfig';

// Initialize Firebase
firebase.initializeApp(firebaseOptions);

// function to create a user
export const createUserProfileDocument = async (
  userAuth: any,
  additionalData?: any
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error: any) {
      console.log('error creating user', error.message as string);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// Google auth provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// Facebook auth provider
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

// Github auth provider
const githubProvider = new firebase.auth.GithubAuthProvider();
export const signInWithGithub = () => auth.signInWithPopup(githubProvider);

// Twitter auth provider
const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);

// export useFirebase
export default firebase;
