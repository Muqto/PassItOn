import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../Hooks/UserPool";
import HomeProps from "../Home/Types";

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
            onSuccess: (data) => {
            const homeProps : HomeProps = {
                userId: data.getIdToken().payload["cognito:username"],
                firstName: data.getIdToken().payload.given_name,
                lastName: data.getIdToken().payload.family_name
            }
            navigation.navigate("TabNavigation", homeProps)
            console.log("onSuccess: ", data)
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