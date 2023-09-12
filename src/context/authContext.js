import { createContext } from 'react'

export const AuthContext = createContext({
    userCredencial: {},
    setUserCredencial: () => {},
    user_token: "",
    isLogged: false
});