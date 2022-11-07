// Import the functions you need from the SDKs you need

// import firebase from 'firebase/compat/app';
// import firebase from 'firebase/app';
// import 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAHbBZtCuvdTEU1tNtaOdsxW0wGr7XLqt0',
  authDomain: 'chat-app-cnm.firebaseapp.com',
  projectId: 'chat-app-cnm',
  storageBucket: 'chat-app-cnm.appspot.com',
  messagingSenderId: '141087802644',
  appId: '1:141087802644:web:e6d69d1ad9badca752ee01',
  measurementId: 'G-JQP510DW6Q',
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   if (typeof window !== 'undefined') {
//     if ('measurementId' in firebaseConfig) {
//       firebase.analytics();
//     }
//   }
// }

const app = initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
// if (!firebase.app.length) {
//   firebase.initializeApp(firebaseConfig);
//   if (typeof window !== 'undefined') {
//     if ('measurementId' in firebaseConfig) {
//       firebase.analytics();
//     }
//   }
// }

// export const register

// export const auth = getAuth();

export const createAuthUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user);
      // getUserId(req, userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const loginAuthByEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // res.emailVerified = userCredential.user.emailVerified;
      if (!userCredential.user.emailVerified) {
        //send verification email
        await sendEmailVerification(userCredential.user).catch((error) => {
          console.log('Lỗi khi gửi email xác nhận: \n' + error);
        });
      }
      // Signed in
    })
    .catch((error) => {
      // return res.status(error.code).json({ message: error.message });
      console.log(error.message);
    });
};

// export const signInAuthUserWithEmailAndPassword = async (
//   email: string,
//   password: string
// ) => {
//   if (!email || !password) return;

//   return await signInWithEmailAndPassword(auth, email, password);
// };

// export const signOutUser = async () => await signOut(auth);

// // function getUserId(req, userCredential) {
// //   const user = userCredential.user;
// //   req.body._id = user.uid;
// // }
