import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

/* Util method which converts firestore docs collection from snapshot
 *  to array of flatten Objects with added doc id as id field
 */
export const convertFirestoreCollectionToArray = (collection: any) => {
  const collectionArray = collection.docs.map((doc: any) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return collectionArray;
};
