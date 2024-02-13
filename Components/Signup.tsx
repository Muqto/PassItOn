import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <View style={styles.signInPageContainer}>
      <View style={styles.signInLogoContainer}>
        <Text style={styles.signInLogoText}>PassItOn</Text>
      </View>
      <View style={styles.signInContent}>
        <View style={styles.signInHeadingDiv}>
          <Text style={styles.signInText}>Sign up</Text>
        </View>
        <View>
          <View style = {styles.signUpName}>
            <TextInput
              label="First Name"
              value={email}
              onChangeText={(text) => setFirstName(text)}
              mode="flat"
              activeUnderlineColor="black"
              style={styles.signInInput}
            />
            <TextInput
              label="Last Name"
              value={email}
              onChangeText={(text) => setLastName(text)}
              mode="flat"
              activeUnderlineColor="black"
              style={styles.signInInput}
            />
          </View>
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
          <TextInput
            label="Confirm Password"
            value={password}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.signInInput}
            mode="flat"
            activeUnderlineColor="black"
          />
          <Text style={styles.signUpCTA}>
            Already have an account?{" "}
            <Text style={styles.signUpCTALink} onPress = {() => navigation.navigate("SignIn")} >Sign in</Text>
          </Text>
          <View style={styles.signInButtonDiv}>
            <Button
              mode="contained"
              buttonColor="#6B6BE1"
              style={styles.signInButton}
            >
              Sign up
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

  signUpName: {
    display: 'flex',
    flexDirection: 'row'
  }
});
export default Signin;
