import { StyleSheet } from "react-native";
import { colors } from "../../Colors/Colors";

const styles = StyleSheet.create({
    signUpPageContainer: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  
    signUpLogoContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },       
    signUpLogoText: {
      fontSize: 50,
      fontWeight: "bold",
    },
  
    signUpContent: {
      height: "80%",
      width: "100%",
      display: "flex",
      paddingBottom: 0,
      paddingTop: 0,
      paddingLeft: 20,
      paddingRight: 20,
    },
  
    signUpHeadingDiv: {
      width: "100%",
      marginBottom: 30,
    },
    signUpText: {
      fontSize: 30,
      fontWeight: "600",
      paddingTop: 10,
    },
    signUpInput: {
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
  
    signUpButtonDiv: {
      height: 56,
      marginTop: 80,
    },
  
    signUpButton: {
      width: "100%",
      borderRadius: 5,
      alignContent: "center",
      fontSize: 50,
    },
  
    signUpName: {
      display: 'flex',
      flexDirection: 'row'
    },
    nameInput: {
      flex: 1,
      marginRight: 4,
    }
  });

  export default styles