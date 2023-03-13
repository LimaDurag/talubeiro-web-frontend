import api from '../config/axios.js';

const userAPI = {
    create: (name, password, email, token) => {
        api
        .post('/User', {
            name: name,
            email: email,
            senha: password,
            token: token
        })
        .then((res) => {
            return res.status;
        })
        .catch((err) => {
            console.log("AXIOS ERR"+err);
            return 0;
        })
    }
}

export default userAPI;