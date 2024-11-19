
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ---------------------- Containers ----------------------
  postPageContainer: {
    height: "100%",
    width: "100%",
  },
  donatePageContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  donatePageInfoContainer: {
    width: "100%",
    margin: 10,
    paddingHorizontal: 10,
  },
  donationDropdownContainer: {
    width: "100%",
    marginTop: 10,
  },
  locationInputContainer: {
    width: "100%",
    marginTop: 10,
  },
  pickupTimesContainer: {
    marginTop: 10,
    width: "100%",
  },
  pickupTimesGridContainer: {
    width: '100%'
  },
  pickupTimeGroup: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  cancelOrPostDonationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  // ---------------------- Text Styles ----------------------
  postHeader: {
    height: "13%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  donatePageHeader: {
    fontSize: 25,
    fontWeight: "bold",
  },
  pickupTimesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  pickupTimesLabel: {
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
  pickupDateLabel: {
    fontSize: 16,
    color: '#333333',
    paddingLeft: 10,
    marginBottom: 10, 
  },
  // pickupTimeText: {
  //   color: '#FFFFFF',
  //   fontSize: 14,
  //   textAlign: 'center',
  //   width: '80%',
  // },
  pickupTimeText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: "right",
    // flex: 1, // Allow text to take available space
    // width: 100,
    width: '75%',
    // paddingLeft: 10,
    // backgroundColor: "#A9A9A9",
  },
  deletePickupTimeButton: {
    width: '23%',
    // backgroundColor: "#A9A9A9",
  },
  noPickupTimesText: {
    color: '#4A454E',
    fontSize: 14,
    textAlign: "left",
    width: '100%',
    paddingLeft: 50,
    paddingBottom: 20
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  expirationDisclaimer: {
    fontSize: 14,
    color: "#8a8a8a",
    textAlign: "left",
    fontStyle: "italic",
    paddingTop: 20,
    paddingHorizontal: 10,
  },

  // ---------------------- Input Styles ----------------------
  donationItemTitle: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#EEEEEE",
    width: "100%",
  },
  donationItemDescription: {
    marginTop: 10,
    height: 90,
    backgroundColor: "#EEEEEE",
    width: "100%",
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
  // timePickerRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: '80%',
  //   marginBottom: 20,
  // },
  timePickerDropdown: {
    width: '45%',
    height: 50,
    borderColor: '#6B6BE1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    // paddingBottom: 10,
  },
  pickupDropdownPlaceholder: {
    fontSize: 16,
    color: '#A9A9A9',
    textAlign: 'center',
  },
  pickupDropdownSelectedText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },

  // ---------------------- Button Styles ----------------------
  addPickupTimeButton: {
    width: "100%",
    marginTop: 20,
  },
  closePickupTimeModalButton: {
    marginBottom: 30,
    width: '100%',
  },
  cancelDonationButton: {
    backgroundColor: "#A9A9A9",
    flex: 1,
    marginRight: 8,
    borderRadius: 5,
  },
  postDonationButton: {
    backgroundColor: "#6B6BE1",
    flex: 1,
    borderRadius: 5,
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

  // ---------------------- Image Upload Styles ----------------------
  imageUploadButtonContainer: {
    paddingTop: 10
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

  // ---------------------- Pickup Times Styles ----------------------
  // pickupTimesGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 30,
  // },
  pickupTimesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15, // Reduced padding to allow more space
  },
  // pickupTimeItem: {
  //   backgroundColor: '#6B6BE1',
  //   borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 5,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: '100%',
  // },
  pickupTimeItem: {
    backgroundColor: '#6B6BE1',
    borderRadius: 10,
    paddingVertical: 8, // Reduced vertical padding
    paddingHorizontal: 5, // Reduced horizontal padding
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '48%', // Set width to approximately half for two items per row
    height: 40 // Optional: Set a fixed height
  },

  // ---------------------- Modal Styles ----------------------
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
  },
  instructionText: { 
    paddingBottom: 20, 
    fontSize: 16, 
    textAlign: "center" 
  },
});

export default styles;
