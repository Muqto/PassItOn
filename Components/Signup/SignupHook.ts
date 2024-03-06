import UserPool from "../../Hooks/UserPool"
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const useSignUp = () => {
    const signUp = (firstName: string, lastName: string, email: string, password: string) => {
        let attributeList = [];
        attributeList.push(new CognitoUserAttribute({Name: 'given_name', Value: firstName}));
        attributeList.push(new CognitoUserAttribute({Name: 'family_name', Value: lastName}));
        UserPool.signUp(email, password, attributeList, null, (err, data) => {
          if (err) {
            console.log(err)
          }
          console.log(data)
        })
      }
    return {signUp}
}


  export default useSignUp