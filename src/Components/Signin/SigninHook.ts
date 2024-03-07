import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import HomeProps from "../Home/Types";
import UserPool from "../../Hooks/UserPool";
import { GetUserReq, getUser } from "../../api/userApi";

const useSignIn = () => {
    const signIn = (email: string, password: string, navigation) => {
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        })
    
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        })
    
        user.authenticateUser(authDetails, {
            onSuccess: async (data) => {
                const userReq: GetUserReq = {
                    _id: data.getIdToken().payload.sub
                }
                const res = await getUser(userReq)
                const user = res.data
                console.log("onSuccess: ", user)

                navigation.navigate("TabNavigation")
            
            },
            onFailure: (err) => {
                console.log("onFailure: ", err)
    
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data)
            }
        })
        }
    return {signIn}
}

export default useSignIn