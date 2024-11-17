import { useState } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import styles from "./Styles";
import { NavigationProp } from "@react-navigation/native";
import useAuthentication from "../../Hooks/Authentication";
import { colors } from "../../Colors/Colors";
import { Platform } from "react-native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signUp, isLoading } = useAuthentication()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >      
      <View style={styles.signUpPageContainer}>
        <View style={styles.signUpLogoContainer}>
          <Text style={styles.signUpLogoText}>PassItOn</Text>
        </View>
        <ScrollView
          style={styles.signUpPageInfoContainer}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.signUpContent}>
            <View style={styles.signUpHeadingDiv}>
              <Text style={styles.signUpText}>Sign up</Text>
            </View>
            <View>
              <View style = {styles.signUpName}>
                <TextInput
                  label="First Name"
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  mode="flat"
                  activeUnderlineColor="black"
                  style={styles.firstNameInput}
                />
                <TextInput
                  label="Last Name"
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  mode="flat"
                  activeUnderlineColor="black"
                  style={styles.lastNameInput}
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
                style={styles.signUpInput}
                mode="flat"
                activeUnderlineColor="black"
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.signUpInput}
                mode="flat"
                activeUnderlineColor="black"
                secureTextEntry={!showConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
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
                  onPress={() => signUp(firstName, lastName, email, password, navigation)}
                >
                  Sign up
                </Button>}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
