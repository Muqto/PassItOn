import { useState } from "react";
import { View, Text, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import styles from "./Styles";
import useAuthentication from "../../Hooks/Authentication";
import { useSelector } from "react-redux";
import { isSessionLoadingSelector } from "../../store/isLoading/selectors";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { firebase_auth } from "../../config/firebase";
import { colors } from "../../Colors/Colors";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading } = useAuthentication()
  const isSessionLoading = useSelector(isSessionLoadingSelector)
  const auth = firebase_auth

  const signInAttempt = async (email: string, password: string) => {
    try {
      await signIn(email, password)
    } catch (error) {
      console.log("caught error")
      if (error instanceof Error) {
        Alert.alert("Sign in error", "Email or Password is incorrect. Please try again.")
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.signInPageContainer}>
        <View style={styles.signInLogoContainer}>
          <Text style={styles.signInLogoText}>PassItOn</Text>
        </View>
        <ScrollView
          style={styles.signInPageInfoContainer}
          keyboardShouldPersistTaps={"handled"}
        >
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
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              <Text style={styles.signUpCTA}>
                Don't have an account?{" "}
                <Text style={styles.signUpCTALink} onPress = {() => navigation.navigate("SignUp")}>Sign up</Text>
              </Text>
              <View style={styles.signInButtonDiv}>
                {isLoading ? <ActivityIndicator size={30} animating={true} color={colors.primaryPurple}/> : <Button
                  mode="contained"
                  buttonColor="#6B6BE1"
                  style={styles.signInButton}
                  onPress={() => signInAttempt(email, password)}
                >
                  Sign In
                </Button>}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signin;

