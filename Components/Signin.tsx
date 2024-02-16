import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../Hooks/UserPool";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (email: string, password: string) => {
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
  return (
    <View style={styles.signInPageContainer}>
      <View style={styles.signInLogoContainer}>
        <Text style={styles.signInLogoText}>PassItOn</Text>
      </View>
      <View style={styles.signInContent}>
        <View style={styles.signInHeadingDiv}>
          <Text style={styles.signInText}>Sign in</Text>
        </View>
        <View>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="flat"
            activeUnderlineColor="black"
            style={styles.signInInput}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.signInInput}
            mode="flat"
            activeUnderlineColor="black"
          />
          <Text style={styles.signUpCTA}>
            Don't have an account?{" "}
            <Text style={styles.signUpCTALink} onPress = {() => navigation.navigate("SignUp")}>Sign up</Text>
          </Text>
          <View style={styles.signInButtonDiv}>
            <Button
              mode="contained"
              buttonColor="#6B6BE1"
              style={styles.signInButton}
              onPress={() => signIn(email, password)}
            >
              Sign In
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  signInPageContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  signInLogoContainer: {
    height: "40%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
  signInLogoText: {
    fontSize: 50,
    fontWeight: "bold",
  },

  signInContent: {
    height: "60%",
    width: "100%",
    display: "flex",
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },

  signInHeadingDiv: {
    width: "100%",
    marginBottom: 30,
  },
  signInText: {
    fontSize: 30,
    fontWeight: "600",
  },
  signInInput: {
    marginBottom: 20,
    height: 56,
    backgroundColor: "#EEEEEE",
  },
  signUpCTA: {
    fontWeight: "300",
  },
  signUpCTALink: {
    fontWeight: "600",
    color: "#6B6BE1",
  },

  signInButtonDiv: {
    height: 56,
    marginTop: 80,
  },

  signInButton: {
    width: "100%",
    borderRadius: 5,
    alignContent: "center",
    fontSize: 50,
  },
});
export default Signin;
