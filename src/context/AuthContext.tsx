import React, { useEffect } from "react"
import * as firebase from "firebase";
import { createContext, useContext } from "react"
import { initBase } from "../model/initBase";

type AuthContextType = {
    isSignedIn: boolean,
    user?: firebase.User;
    register: (email:string, password:string) => Promise<void>;
    signIn: (email:string, password:string) => Promise<void>;
    signOut: () => void;
}

const defaultAuthState = {
    isSignedIn: false,
    register: async () => undefined,
    signIn: async () => undefined,
    signOut: async () => undefined,
}

const AuthContext = createContext<AuthContextType>(defaultAuthState)

export const AuthContextProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = React.useState<{ isSignedIn: boolean; user?: firebase.User }>({
        isSignedIn: false
    })

    const register = async (email: string, password: string) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    const signIn = async (email: string, password: string) => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    }

    const signOut = async () => {
        await firebase.auth().signOut()
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((_user) => {
            if (_user) {
                initBase(_user)
                setAuth({
                    user: _user,
                    isSignedIn: true
                })
            } else {
                // user is logged out
                setAuth({
                    user: undefined,
                    isSignedIn: false
                })
            }
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isSignedIn: auth.isSignedIn,
                user: auth.user,
                register,
                signIn,
                signOut
            }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}
