// src/firebase.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'dotenv/config'; // Ensure you have dotenv installed

// Define TypeScript interface for Firebase configuration
interface FirebaseConfig {
apiKey: "process.env.FIREBASE_API_KEY ||",
  authDomain: "process.env.FIREBASE_AUTH_DOMAIN ||",
  projectId: "process.env.FIREBASE_PROJECT_ID || ",
  storageBucket: "process.env.FIREBASE_STORAGE_BUCKET ||",
  messagingSenderId: "process.env.FIREBASE_MESSAGING_SENDER_ID ||",
  appId: "process.env.FIREBASE_APP_ID ||",
  measurementId: "G-J352BSYTES"
}

const firebaseConfig: FirebaseConfig = {
 apiKey: "process.env.FIREBASE_API_KEY ||",
  authDomain: "process.env.FIREBASE_AUTH_DOMAIN ||",
  projectId: "process.env.FIREBASE_PROJECT_ID || ",
  storageBucket: "process.env.FIREBASE_STORAGE_BUCKET ||",
  messagingSenderId: "process.env.FIREBASE_MESSAGING_SENDER_ID ||",
  appId: "process.env.FIREBASE_APP_ID ||",
  measurementId: "G-J352BSYTES"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export initialized firebase instance
export { firebase };

// Export Firebase services with types
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Helper types for Firebase data
export type DocumentData = firebase.firestore.DocumentData;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference<DocumentData>;
export type DocumentReference = firebase.firestore.DocumentReference<DocumentData>;
export type FirebaseUser = firebase.User;
export type Timestamp = firebase.firestore.Timestamp;

