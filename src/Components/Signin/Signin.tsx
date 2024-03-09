import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styles from "./Styles";
import useAuthentication from "../../Hooks/Authetication";
import { useSelector } from "react-redux";
import { isSessionLoadingSelector } from "../../store/isLoading/selectors";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuthentication(navigation)
  const isSessionLoading = useSelector(isSessionLoadingSelector)
  
  return (
    <View style = {{width: "100%", height: "100%"}}>
    { isSessionLoading ?  <LoadingScreen/> :
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
    </View>}
    </View>
  );
};

export default Signin;

