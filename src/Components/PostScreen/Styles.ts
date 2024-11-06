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
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  donatePageHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  donatePageInfoContainer: {
    width: "100%",
    margin: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  donationItemTitle: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#EEEEEE",
    width: "100%",
  },
  donationItemDescription: {
    marginTop: 20,
    height: 90,
    backgroundColor: "#EEEEEE",
    width: "100%",
  },
  donationItemLocation: {
    marginTop: 20,
    height: 60,
    backgroundColor: "#EEEEEE",
    width: "100%",
  },
  donationDropdownContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  donationDropdown: {
    height: 60,
    backgroundColor: '#EEEEEE',
  },
  donationDropdownPlaceholder: {
    marginLeft: 15,
    color: "rgb(74, 69, 78)"
  },
  donationDropdownSelectedText:{
    marginLeft: 15,
    color: "rgb(29, 27, 30)"
  },
  donateOrRequestButton: {
    width: "90%",
  },
  postDonationButton: {
    marginTop: 20,
    width: "100%",
    borderRadius: 5,
    alignContent: "center",
    fontSize: 50,
  },
  locationInputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  closePickupTimeModalButton: {
    marginBottom: 30,
  },
  pickupTimesContainer: {
    width: "100%",
    height: 35,
    borderRadius: 3,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  pickupTimesPreview: {
    width: "80%",
    height: "100%",
  },
  openDateTimePickerButtonContainer: {
    width: "20%",
    height: "100%",
    flex: 1,
    justifyContent: "center"
  },
  openDateTimePickerButton: {
    width: "100%",
    height: "100%",
  },
  addPickupTimeButton: {
    width: "100%",
  },
  imageUploadButtonContainer: {
    marginTop: 10,
  },
  uploadedImagePreviewContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  uploadedImagePreview: {
    height: 100,
    width: 130
  }
});

export default styles;
