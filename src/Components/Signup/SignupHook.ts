import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../../Hooks/UserPool";
import { AddUserReq, addUser } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { UserState, addUserAction } from "../../store/slice";
import { NavigationProp } from "@react-navigation/native";
const useSignUp = () => {
    const signUp = (firstName: string, lastName: string, email: string, password: string, navigation: NavigationProp<any, any>) => {
        const dispatch = useDispatch()
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
    return { signUp }
}


  export default useSignUp