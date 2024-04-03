import { useDispatch } from "react-redux";
import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react"
import { firebase_auth } from "../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { AddUserReq, addTokenToAPI, addUser, getUser } from "../api/userApi";
import { addUserAction } from "../store/user/slice";
import { Alert } from "react-native";

const useAuthentication = () => {
    const dispatch = useDispatch()
    const auth = firebase_auth
    const [isLoading, setIsLoading] = useState(false)

    const logout = () => {
        auth.signOut()
    }

    const signIn = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            const info = await signInWithEmailAndPassword(auth, email, password)
            const token = await info.user.getIdToken()
            addTokenToAPI(token)
            const res = await getUser()
            dispatch(addUserAction(res.data))
            
        } 

        catch (error) {
            Alert.alert(
                "Login Error", 
                "The email or password you entered is incorrect. Please try again."
            );
        }

        setIsLoading(false)
    }

    const signUp = async (firstName: string, lastName: string, email: string, password: string, confirmedPassword: string, navigation: NavigationProp<any, any>) => {
        if (!firstName || !lastName || !email || !password || !confirmedPassword) {
            Alert.alert(
                "Incomplete Fields",
                "Please fill in all fields to sign up."
            );
            return;
        }
        
        if (password !== confirmedPassword) {
            Alert.alert(
                "Password Mismatch",
                "The passwords you entered do not match. Please make sure that the 'Password' and 'Confirm Password' fields are identical."
            );
            return;
        }
        
        try {
            setIsLoading(true)
            const info = await createUserWithEmailAndPassword(auth, email, password)
            const token = await info.user.getIdToken()
            addTokenToAPI(token)
            const addUserReq : AddUserReq = {
                firstName,
                lastName
            }
            const res = await addUser(addUserReq)
            dispatch(addUserAction(res.data))
            
        } 

        catch (error) {
            if (error.code === 'auth/invalid-email') {
                Alert.alert("Invalid Email", "The email address you entered is not valid.");
            } else if (error.code === 'auth/weak-password') {
                Alert.alert("Weak Password", "The password you entered is too weak. Please use a stronger password.");
            } else {
                Alert.alert("Sign Up Error", "An unexpected error occurred. Please try again later.");
            }
        }

        setIsLoading(false)
      }

    return {signIn, logout, signUp, isLoading}
}

export default useAuthentication