import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // =========================================================
  // Layout Containers
  // =========================================================
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16, // Applies to content inside ScrollView
    paddingBottom: 20,
  },
  
  // =========================================================
  // Header Styles
  // =========================================================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures space between back button and flag button
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 10,
  },
  flagButton: {
    padding: 15, // Matches backButton padding
    justifyContent: 'center', // Centers the icon vertically
    alignItems: 'center',     // Centers the icon horizontally
    minWidth: 44,  // Ensures a minimum touchable width
    minHeight: 44, // Ensures a minimum touchable height
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Allows the text to take available space
  },

  // =========================================================
  // Content Styles
  // =========================================================
  imageFullWidth: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  placeholderFullWidth: {
    width: '100%',
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    marginBottom: 16,
  },
  placeholderText: {
    color: "#999",
    fontSize: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    fontSize: 18,
    color: "#888",
  },
  section: {
    marginBottom: 28, // Overall gap between sections
  },
  subSection: {
    marginBottom: 14, // Overall gap between sub-sections
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8, // Gap between header and content
  },
  subSectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4, // Gap between sub-header and content
  },
  description: {
    fontSize: 18,
    color: "#333",
    // No additional margin since it's under the "Description" header
  },
  details: {
    marginTop: 8, // Gap between header and details
  },
  detailText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  dates: {
    marginTop: 8, // Gap between header and dates
  },
  dateText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  
  // =========================================================
  // Button Styles
  // =========================================================
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#6B6BE1",
    borderRadius: 5,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 24,
  },
  
  // =========================================================
  // Modal Styles
  // =========================================================
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Allows the text to take available space
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    backgroundColor: '#6B6BE1',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservationModalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    position: 'absolute',
    top: 80,
  },
  confirmationModalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    position: 'absolute',
    top: 80,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalCategory: {
    fontSize: 18,
    color: "#888",
  },
  modalSection: {
    marginBottom: 28, // Overall gap between sections
  },
  modalSubSection: {
    marginBottom: 14, // Overall gap between sub-sections
  },
  modalSectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8, // Gap between header and content
  },
  modalSubSectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4, // Gap between sub-header and content
  },
  pickupDescription: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  pickupOptionsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    width: '14%', // Evenly distribute over 7 days
    textAlign: 'center',
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },
  dateCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6B6BE1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateCircle: {
    backgroundColor: '#6B6BE1',
  },
  dateTextInCircle: {
    fontSize: 16,
    color: '#6B6BE1',
  },
  selectedDateText: {
    color: '#fff',
  },

  // =========================================================
  // Time Options Styles
  // =========================================================
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeOption: {
    width: 90,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedTimeOption: {
    backgroundColor: '#6B6BE1',
  },
  timeOptionText: {
    color: '#333',
    fontSize: 16,
  },
  selectedTimeOptionText: {
    color: '#fff',
  },
  noTimesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },

  // =========================================================
  // Confirmation Modal Styles
  // =========================================================
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  confirmationTextDate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B6BE1',
    textAlign: 'left',
  },
  reservationDetailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  reservationDetailHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reservationDetailText: {
    fontSize: 18,
    color: "#333",
  },
  contactDonorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  donorName: {
    fontSize: 18,
    color: "#333",
    marginRight: 10,
  },
  conversationIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#6B6BE1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // =========================================================
  // Miscellaneous Styles
  // =========================================================
  // (Add any additional styles here as needed)
});

export default styles;
