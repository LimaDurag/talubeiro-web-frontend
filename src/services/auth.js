import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
auth.useDeviceLanguage();
const googleProvider = GoogleAuthProvider();

const authFirebase = {
    register: (email, password, ...props) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredencial) => {
            const user = userCredencial.user;
            console.log("USER CREATED:");
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log("ERRO AO CRIAR USUÁRIO: ERROR CODE:"+errorCode+" ERROR MESSAGE: "+errorMessage);
        })
    },
    singin: (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredencial) => {
            const user = userCredencial.user;
            console.log("USER LOGGED:");
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log("ERRO AO FAZER LOGIN: ERROR CODE:"+errorCode+" ERROR MESSAGE: "+errorMessage);
        })
    },
    singinWithGoogle: () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log("USER CREATED W/ GOOGLE:");
            console.log(user)
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log("ERRO AO FAZER LOGIN: ERROR CODE:"+errorCode+" ERROR MESSAGE: "+errorMessage);
        });
    }
}

export default authFirebase;