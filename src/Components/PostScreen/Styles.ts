import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  postPageContainer: {
    height: "100%",
    width: "100%",
  },
  postHeader: {
    height: "13%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
  },
  donatePageContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  donatePageHeader: {
    fontSize: 25,
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
    height: 60,  // Height adjusted to match typical input field size
    borderRadius: 5,  // Rounded corners for consistency
    backgroundColor: "#EEEEEE",  // Light grey background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  // Center align the content
    flexDirection: "row",  // Row layout for button and text
    paddingHorizontal: 10,  // Horizontal padding for spacing
  },
  
  pickupTimesPreview: {
    position: "absolute",
    left: 20,
  },
  
  addPickupTimeButton: {
    width: "100%",
  },
  
  imageUploadButtonContainer: {
    marginTop: 30,
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
