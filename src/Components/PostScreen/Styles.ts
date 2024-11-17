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
  // Title
  donationItemTitle: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#EEEEEE",
    width: "100%",
  },
  // Description
  donationItemDescription: {
    marginTop: 10,
    height: 90,
    backgroundColor: "#EEEEEE",
    width: "100%",
  },
  // Category
  donationDropdownContainer: {
    width: "100%",
    marginTop: 10,
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
  // Location
  locationInputContainer: {
    width: "100%",
    // marginBottom: 20,
    marginTop: 10,
  },
  donationItemLocation: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#EEEEEE",
    width: "100%",
  },
  // Pick up times
  pickupTimesContainer: {
    marginTop: 10,
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
  closePickupTimeModalButton: {
    marginBottom: 30,
  },
  // Upload picture
  imageUploadButtonContainer: {
    paddingTop: 20
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
  },
  // Cancel or Post Donation Buttons
  cancelOrPostDonationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
  },
  cancelDonationButton: {
    backgroundColor: "#A9A9A9",
    flex: 1,
    marginRight: 8,
    borderRadius: 5,
    fontSize: 50,
  },
  postDonationButton: {
    backgroundColor: "#6B6BE1",
    flex: 1,
    borderRadius: 5,
    fontSize: 50,
  },
  // Cancel Donation Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    flex: 1,
    marginRight: 8,
  },
  modalConfirmButton: {
    backgroundColor: "#6B6BE1",
    flex: 1,
  },  
  // Disclaimer
  expirationDisclaimer: {
    fontSize: 14, // Slightly smaller text for a note
    color: "#8a8a8a", // Neutral gray color
    textAlign: "left",
    fontStyle: "italic",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});

export default styles;
