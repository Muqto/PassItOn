import { StyleSheet } from "react-native";
import { colors } from "../../Colors/Colors";

const styles = StyleSheet.create({
  postPageContainer: {
    height: "100%",
    width: "100%",
  },
  postHeader: {
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  donatePageContainer: {
    height: "75%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  donatePageHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  donationItemTitle: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#EEEEEE",
    width: "90%",
  },
  donationItemDescription: {
    marginTop: 20,
    height: 90,
    backgroundColor: "#EEEEEE",
    width: "90%",
  },
  donateOrRequestButton: {
    width: "90%",
  },
  postDonationButton: {
    marginTop: 20,
    width: "90%",
    borderRadius: 5,
    alignContent: "center",
    fontSize: 50,
  },
});

export default styles;
