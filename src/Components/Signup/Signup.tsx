import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import styles from "./Styles";
import { NavigationProp } from "@react-navigation/native";
import useAuthentication from "../../Hooks/Authetication";
import { colors } from "../../Colors/Colors";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signUp, isLoading } = useAuthentication()

  return (
    <View style = {{width: "100%", height: "100%"}}>

      <View style={styles.signUpPageContainer}>
        <View style={styles.signUpLogoContainer}>
          <Text style={styles.signUpLogoText}>PassItOn</Text>
        </View>
        <View style={styles.signUpContent}>
          <View style={styles.signUpHeadingDiv}>
            <Text style={styles.signUpText}>Sign up</Text>
          </View>
          <View>
            <View style={styles.signUpName}>
              <TextInput
                label="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                mode="flat"
                activeUnderlineColor="black"
                style={[styles.signUpInput, styles.nameInput]}
              />
              <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                mode="flat"
                activeUnderlineColor="black"
                style={[styles.signUpInput, styles.nameInput]}
              />
            </View>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="flat"
              activeUnderlineColor="black"
              style={styles.signUpInput}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.signUpInput}
              mode="flat"
              activeUnderlineColor="black"
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              style={styles.signUpInput}
              mode="flat"
              activeUnderlineColor="black"
            />
            <Text style={styles.signUpCTA}>
              Already have an account?{" "}
              <Text style={styles.signUpCTALink} onPress = {() => navigation.navigate("SignIn")} >Sign in</Text>
            </Text>
            <View style={styles.signUpButtonDiv}>
              {isLoading ? <ActivityIndicator size={30} animating={true} color={colors.primaryPurple}/> : <Button
                mode="contained"
                buttonColor= {colors.primaryPurple}
                style={styles.signUpButton}
                onPress={() => signUp(firstName, lastName, email, password, confirmPassword, navigation)}
              >
                Sign up
              </Button>}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
