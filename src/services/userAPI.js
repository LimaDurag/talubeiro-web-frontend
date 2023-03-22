import api from '../config/axios.js';
import { storage } from "../config/firebase.js";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const userAPI = {
    create: (name, email, token) => {
        return api
        .post('/User', {
            name: name,
            email: email,
            token: token
        })
        .then((res) => {
            return res.status;
        })
        .catch((err) => {
            console.log("AXIOS ERR"+err);
            return 0;
        })
    },
    getByToken: (token) => {
        return api
        .get('User/'+token)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("AXIOS ERR"+err);
            return 0;
        })
    },
    update: (name, email, token, avatar_link) => {
        api
        .put('/User', {
            name: name,
            email: email,
            token: token,
            avatar_link: avatar_link
        })
        .then((res) => {
            return res.status;
        })
        .catch((err) => {
            console.log("AXIOS ERR"+err);
            return 0;
        })
    },
    setAvatar: (userToken, file) => {
        const userAvatarRef = ref(storage, "user-avatar/"+userToken);
        const metadata = {
            contentType: 'image/jpeg'
          };
          const uploadTask = uploadBytesResumable(userAvatarRef, file, metadata);

          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  console.log("// User doesn't have permission to access the object")
                  break;
                case 'storage/canceled':
                  console.log("// User canceled the upload")
                  break;
                case 'storage/unknown':
                  console.log("// Unknown error occurred, inspect error.serverResponse")
                  break;
              }
            }, 
            async () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
               try {
                    console.log('File available at', downloadURL);
                    const user = await userAPI.getByToken(userToken)
                    user.avatar_link = downloadURL; 
                    userAPI.update(user.name, user.email, user.token, user.avatar_link)
               } catch (error) {
                    console.log(error);
                    return 0 
               }
              });
            }
          );
    },
    setNickName: async (nickname, userToken) => {
        try {
            const user = await userAPI.getByToken(userToken)
            user.name = nickname; 
            userAPI.update(user.name, user.email, user.token, user.avatar_link);
            return 200;
        } catch (error) {
            console.log(error);
            return 0
        }
    },
    deactivateUser: async (userToken) => {
        try{
            const user = await userAPI.getByToken(userToken)
            api
            .put(`User/${user.id}/deactivate`)
            .then((res) => {
                return res.status;
            })
            .catch((err) => {
                console.log("AXIOS ERR"+err);
                return 0;
            })
        }catch(error){
            console.log(error);
            return 0;
        }
    }
}

export default userAPI;