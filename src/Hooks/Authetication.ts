import { useDispatch } from "react-redux";
import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react"
import { firebase_auth } from "../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { AddUserReq, addUser, getUser } from "../api/userApi";
import { addUserAction } from "../store/user/slice";

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
            const response = await signInWithEmailAndPassword(auth, email, password)
            const res = await getUser({ _id: response.user.uid })
            dispatch(addUserAction(res.data))
            
        } 

        catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    const signUp = async (firstName: string, lastName: string, email: string, password: string, navigation: NavigationProp<any, any>) => {
        try {
            setIsLoading(true)
            const response = await createUserWithEmailAndPassword(auth, email, password)

            const addUserReq : AddUserReq = {
                _id: response.user.uid,
                email,
                firstName,
                lastName
            }
            const res = await addUser(addUserReq)
            dispatch(addUserAction(res.data))
            
        } 

        catch (error) {
            console.error(error)
        }

        setIsLoading(false)
      }

    const getSessionUid = () => {
        return auth.currentUser?.uid
    }

    return {signIn, logout, signUp, getSessionUid, isLoading}
}

export default useAuthentication