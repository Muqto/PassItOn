import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js";
const poolData: ICognitoUserPoolData = {
    UserPoolId: "us-east-1_TcK6ICrfQ",
    ClientId: "7idueteuc2pobb9b02vkgq2rfk"
}

export default new CognitoUserPool(poolData);