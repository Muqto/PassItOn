import { StyleSheet } from "react-native";
import { colors } from "../../Colors/Colors";

const styles = StyleSheet.create({
    signInPageContainer: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  
    signInLogoContainer: {
      height: "20%",
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
      height: "80%",
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
      color: colors.primaryPurple,
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

  export default styles