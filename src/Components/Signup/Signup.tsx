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
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              mode="flat"
              activeUnderlineColor="black"
              style={styles.signInInput}
            />
            <TextInput
              label="Last Name"
              value={lastName}
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
            value={confirmPassword}
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
            {isLoading ? <ActivityIndicator size={30} animating={true} color={colors.primaryPurple}/> : <Button
              mode="contained"
              buttonColor= {colors.primaryPurple}
              style={styles.signInButton}
              onPress={() => signUp(firstName, lastName, email, password, navigation)}
            >
              Sign up
            </Button>}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
