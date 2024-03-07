import UserPool from "../../Hooks/UserPool"
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { addUser, AddUserReq } from "../../api/userApi";

const useSignUp = () => {
    const signUp = (firstName: string, lastName: string, email: string, password: string) => {
        let attributeList = [];
        attributeList.push(new CognitoUserAttribute({Name: 'given_name', Value: firstName}));
        attributeList.push(new CognitoUserAttribute({Name: 'family_name', Value: lastName}));
        UserPool.signUp(email, password, attributeList, null, async (err, data) => {
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
          }
        })
      }
    return { signUp }
}


  export default useSignUp