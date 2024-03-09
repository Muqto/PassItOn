import { AddUserReq, addUser, getUser } from "../api/userApi";
import { useDispatch } from "react-redux";
import { UserState, addUserAction } from "../store/user/slice";
import { NavigationProp } from "@react-navigation/native";
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useEffect } from "react"
import Pool from "./UserPool";
import { setSessionLoadingAction } from "../store/isLoading/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserPool from "./UserPool";

const useAuthentication = (navigation: NavigationProp<any, any>) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCachedSession = async () => {
            const token = await getSessionToken()
            await new Promise(resolve => setTimeout(resolve, 3000)); // fake load time
            if (token) {
                console.log("found a session\n", JSON.parse(token))
                logInWithSession(JSON.parse(token).idToken.payload.sub) // gotta make authentication better by validating the token
                navigation.navigate("TabNavigation")
            }

            else {
                console.log("no session found")
            }
            
            dispatch(setSessionLoadingAction(false))
        }
        getCachedSession()

    }, [])

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            navigation.navigate("SignIn")

        } catch (error) {
            console.error("error logging out", error)
        }
        
    }

    const authenticate = async (Username: string, Password: string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool })
    
            const authDetails = new AuthenticationDetails({ Username, Password })
        
            user.authenticateUser(authDetails, {
                onSuccess: async (data) => {
                    console.log("onSuccess: ", data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.log("onFailure: ", err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data)
                    resolve(data)
                }
            })
            })
    }

    const signIn = async (email: string, password: string) => {
            try {
                const dataTokens: any = await authenticate(email, password)
                const userReq = {
                    _id: dataTokens.getIdToken().payload.sub
                }
                const res = await getUser(userReq)
                await setSessionToken(dataTokens)
                const user = res.data
                dispatch(addUserAction(user))
                navigation.navigate("TabNavigation")
            } 
            catch (error) {
                console.log("error logging in", error)
            }
            
    }

    const setSessionToken = async (data: any) => {
        await AsyncStorage.setItem('token', JSON.stringify(data))
    }
    
    const getSessionToken = async () => {
        const token = await AsyncStorage.getItem('token')
        return token
    }

    const logInWithSession = async (id: String) => {
        try {
            const userReq = {
                _id: id
            }
            const res = await getUser(userReq)
            const user = res.data
            dispatch(addUserAction(user))
        } 
        catch (error) {
            console.log("error logging in", error)
        }
        
    }

    const signUp = (firstName: string, lastName: string, email: string, password: string, navigation: NavigationProp<any, any>) => {
        let attributeList = [];
        attributeList.push(new CognitoUserAttribute({Name: 'given_name', Value: firstName}));
        attributeList.push(new CognitoUserAttribute({Name: 'family_name', Value: lastName}));
        UserPool.signUp(email, password, attributeList, null as any, async (err, data) => {
          if (err) {
            console.log(err)
          }
          else {
            const userReq: AddUserReq = {
              _id: data?.userSub,
              email: data ? data.user.getUsername() : email,
              firstName,
              lastName
            }
            const res = await addUser(userReq)
            const newUser = res.data
            dispatch(addUserAction(newUser as UserState))
            navigation.navigate("TabNavigation")
          }
        })
      }

    return {signIn, logInWithSession, logout, setSessionToken, signUp}
}

export default useAuthentication