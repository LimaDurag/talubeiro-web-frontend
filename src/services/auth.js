//import firebase from 'firebase';
import { app } from '../config/firebase.js';
import userAPI from './userAPI.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const auth = getAuth(app);
auth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();

const authFirebase = {
  register: (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredencial) => {
        const user = userCredencial.user;
        console.log('USER AUTHENTICATED:');
        console.log(user);

        //CREATE USER ON DATABASE
        userAPI.create(name, email, user.uid);

        return userCredencial;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(
          'ERRO AO CRIAR USUÁRIO: ERROR CODE:' +
            errorCode +
            ' ERROR MESSAGE: ' +
            errorMessage
        );

        return 0;
      });
  },
  singin: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        const user = userCredencial.user;
        console.log('USER LOGGED:');
        console.log(user);
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(
          'ERRO AO FAZER LOGIN: ERROR CODE:' +
            errorCode +
            ' ERROR MESSAGE: ' +
            errorMessage
        );
        return 0;
      });
  },
  singinWithGoogle: async () => {
    return signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // const token = credential.accessToken;
        const user = result.user;

        console.log('USER CREATED W/ GOOGLE:');
        console.log(user);

        if (userAPI.getByToken(user.uid) === 0) {
          userAPI.create(user.displayName, user.email, user.uid);
          const userDb = await userAPI.getByToken(user.uid);
          userAPI.update(
            userDb.id,
            userDb.name,
            userDb.email,
            userDb.token,
            user.photoURL
          );
        }

        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(
          'ERRO AO FAZER LOGIN: ERROR CODE:' +
            errorCode +
            ' ERROR MESSAGE: ' +
            errorMessage
        );

        return 0;
      });
  },
  sendRecoverEmail: (email) => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        return 200;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          'ERRO AO FAZER LOGIN: ERROR CODE:' +
            errorCode +
            ' ERROR MESSAGE: ' +
            errorMessage
        );
      });
  },
  singOutUser: () => {
    localStorage.setItem('user', '');
    localStorage.setItem('info', '');
    signOut(auth)
      .then(() => {
        console.log('DESLOGADO');
      })
      .catch((error) => {
        console.log('ERRO AO DESLOGAR: ' + error);
      });
  },
};

export default authFirebase;
