import { StyleSheet } from "react-native";
import { colors } from "../../Colors/Colors";

const styles = StyleSheet.create({
  signUpPageContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  signUpPageInfoContainer: {
    width: "100%",
    margin: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  signUpLogoContainer: {
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
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
    paddingTop: 60,
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
  firstNameInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#EEEEEE",
    marginBottom: 20,
  },
  lastNameInput: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#EEEEEE",
    marginBottom: 20,
  },
});

export default styles