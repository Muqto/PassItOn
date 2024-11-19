import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { Image } from 'expo-image';

import { RouteProp, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import StarRating from 'react-native-star-rating-widget';
import { getReservationsById, ReservationDetails, submitRating, updateTransactionStatus } from "../../api/reservationApi";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { DonorDetails, getUserInfoById, updateItemTransactionStatus, updateReservationTransactionStatus } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { updateTransactionStatusAction } from "../../store/Items/slice";
import { updateUserReservationTransactionStatusAction, updateUserTransactionStatusAction } from "../../store/user/slice";

export const formatDate = (isoString) => {
const date = new Date(isoString);
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = date.getFullYear();
return `${day}/${month}/${year}`;
};

const MyReservationDetails = ({ route }) => {
  const { _id, transactionStatus, itemId } = route.params || {};
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reservation, setReservation] = useState<ReservationDetails | null>(null);
  const [reservationTransactionStatus, setReservationTransactionStatus] = useState<Number>(0);
  const [reservationTransactionStatusString, setReservationTransactionStatusString] = useState<String>('Reserved');
  const [donorInfo, setDonorInfo] = useState<DonorDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isContactDonorModalVisible, setIsContactDonorModalVisible] = useState(false);
  const openImageModal = () => setImageModalVisible(true);
  const closeImageModal = () => setImageModalVisible(false);
  const dispatch = useDispatch();

  const handleSubmitReview = async () => {
    submitRating(donorInfo?._id!, userRating);
    setReviewSubmitted(true);
    dispatch(updateTransactionStatusAction({ itemId, transactionStatus: 3 }));
    dispatch(updateUserTransactionStatusAction({ itemId, transactionStatus: 3 }));
    dispatch(updateUserReservationTransactionStatusAction({ itemId, transactionStatus: 3 }));
    const reserv = await updateReservationTransactionStatus(itemId, 3);
    const res = await updateItemTransactionStatus(itemId, 3);
    setReservationTransactionStatus(3);
  }

  const handleReviewModalClose = async () => {
    // set transaction status of reservation to 3 (review submitted)
    setModalVisible(false);
  }

  useEffect(() => {
    if (reservationTransactionStatus == 0) {
      setReservationTransactionStatusString('Not Reserved');
    } else if (reservationTransactionStatus == 1) {
      setReservationTransactionStatusString('Reserved');
    } else if (reservationTransactionStatus == 2) {
      setReservationTransactionStatusString('Transaction Completed Awaiting Review');
    } else if (reservationTransactionStatus == 3) {
      setReservationTransactionStatusString('Review Submitted');
    }
  }, [reservationTransactionStatus]);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      // if (!itemId) {
      //   setError('No item ID provided.');
      //   setLoading(false);
      //   return;
      // }

      try {
        setLoading(true);
        let res = await getReservationsById(_id); 
        const reservation = res.data;
        setReservation(reservation);
        setReservationTransactionStatus(reservation.transactionStatus);

        // get item donor information
        const donorRes = await getUserInfoById(reservation.itemDonor);
        const donorInfo = donorRes.data;
        setDonorInfo(donorInfo);
      } catch (err: any) {
        console.error('Error fetching reservation details:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchReservationDetails();
  }, []);

  if (loading) {
    return (
      <LoadingScreen size={1}/>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your reservation</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* Image */}
        <TouchableOpacity onPress={openImageModal} disabled={!reservation?.imageDownloadUrl}>
          <View style={styles.imageContainer}>
            {reservation?.imageDownloadUrl ? (
              <Image
                source={{ uri: reservation?.imageDownloadUrl }}
                style={styles.cardImage}
              />
            ) : (
              <View style={[styles.cardImage, { backgroundColor: '#6B6BE1' }]}></View>
            )}
          </View>
        </TouchableOpacity>
        <Modal visible={isImageModalVisible} transparent={true}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeImageModal}>
            <Image
              source={{ uri: reservation?.imageDownloadUrl }}
              style={styles.fullSizeImage}
            />
          </TouchableOpacity>
        </Modal>

        {/* My Reservation Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>{reservation?.itemName}</Text>
          <Text style={styles.itemCategory}>{reservation?.category}</Text>
          <Divider />
          
          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{reservation?.description}</Text>
          </View>

          {/* Details Section */}
          <View style={styles.section}>
            <Text style={styles.detailsTitle}>Details</Text>
            <Divider />
            <Text style={styles.sectionTitle}>Pickup at:</Text>
            <Text style={styles.detailText}>
              {formatDate(reservation?.pickupTime)}
            </Text>
            <Text style={styles.sectionTitle}>Pickup location</Text>
            <Text style={styles.detailText}>
              {reservation?.pickupLocationText}
            </Text>
            <View style={styles.donorSection}>
              <Text style={styles.sectionTitle}>Donor</Text>
              <TouchableOpacity
                style={styles.donorSectionChatIcon}
                onPress={() => {
                  // Future functionality
                  setIsContactDonorModalVisible(true);
                }}
                accessibilityLabel="Contact donor"
              >
                <Text>💬</Text>
              </TouchableOpacity>
              <Modal visible={isContactDonorModalVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={() => setIsContactDonorModalVisible(false)}>
                  <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modalContentContactDonor}>
                        <Text style={styles.modalTitleContactDonor}>Contact the Donor</Text>
                        <Divider style={{ marginBottom: 20 }}/>
                        <Divider style={{ marginBottom: 20 }}/>
                        <Text style={styles.modalText}>
                          Concerns about your reservation? Contact your donor at: 
                        </Text>
                        <Text style={styles.modalTextDonorEmail}>
                          {`${donorInfo?.email}`} 
                        </Text>
                        <TouchableOpacity
                          style={styles.confirmButton}
                          onPress={() => { setIsContactDonorModalVisible(false); }} // Close modal on confirmation
                        >
                          <Text style={styles.confirmButtonText}>
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
            <Text style={styles.detailText}>
              {`${donorInfo?.firstName} ${donorInfo?.lastName} ${donorInfo?.rating !== 0 ? `(${donorInfo?.rating}/5⭐)` : ''} `}
            </Text>
            <Text style={styles.sectionTitle}>Status</Text>
            <Text style={styles.detailText}>
              {reservationTransactionStatusString}
            </Text>
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text>
              <Text style={styles.footerTextBold}>Reserved</Text>{" "}
              <Text style={styles.footerText}>{formatDate(reservation?.startTime)}</Text>
            </Text>
            <Text>
              <Text style={styles.footerTextBold}>Expires</Text>{" "}
              <Text style={styles.footerText}>{formatDate(reservation?.expirationTime)}</Text>
            </Text>
          </View>

          {/* Review Transaction Button */}
          {console.log(transactionStatus)}
          <TouchableOpacity
            style={reservationTransactionStatus != 2 ? styles.disabledButton : styles.completeButton}
            onPress={() => setModalVisible(true)} // Show modal on press
            disabled={reservationTransactionStatus != 2}
          >
            <Text style={reservationTransactionStatus != 2 ? styles.disabledButtonText : styles.completeButtonText}>
              Review Transaction
            </Text>
          </TouchableOpacity>

          {/* Modal for reviewing a transaction */}
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)} // Hide modal on back button press
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  {/* This prevents the modal content from closing when pressed */}
                  {reviewSubmitted ? (
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Review transaction</Text>
                      <Divider style={{ marginBottom: 20 }}/>
                      <Divider style={{ marginBottom: 20 }}/>
                      <Text style={styles.modalText}>
                        Thank you for submitting your review!
                      </Text>
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleReviewModalClose} // Close modal on confirmation
                      >
                        <Text style={styles.confirmButtonText}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Review transaction</Text>
                      <Divider style={{ marginBottom: 20 }}/>
                      <Text style={styles.modalText}>
                        Tell us about your experience with{" "}
                        <Text style={styles.modalItemName}>{donorInfo?.firstName}</Text>.
                      </Text>
                      <StarRating
                        rating={userRating}
                        onChange={setUserRating}
                        color="#6B6BE1"
                        enableHalfStar={false}
                      />
                      <Pressable
                        style={styles.confirmButton}
                        onPress={handleSubmitReview} // Submit review on confirmation
                      >
                        <Text style={styles.confirmButtonText}>
                          Submit Review
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
safeArea: {
  flex: 1,
  backgroundColor: "#fff",
},
container: {
  flex: 1,
  backgroundColor: "#F8F8F8",
  // marginTop: 24,
},
modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  justifyContent: 'center',
  alignItems: 'center',
},
fullSizeImage: {
  width: '90%',
  height: '90%',
  resizeMode: 'contain',
},
cardImage: {
  width: '100%',
  height: '100%',
},
headerContainer: {
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
  // paddingTop: 48,
  backgroundColor: "#fff",
  borderBottomWidth: 1,
  borderBottomColor: "#E0E0E0",
},
headerTitle: {
  fontSize: 20,
  fontWeight: "bold",
  flex: 1,
  marginRight: 15,
  color: "black",
  width: "100%",
  textAlign: "center",
},
imageContainer: {
  height: 255,
  backgroundColor: "#E0E0E0",
  justifyContent: "center",
  alignItems: "center",
},
imagePlaceholder: {
  color: "#808080",
  fontSize: 14,
},
detailsContainer: {
  padding: 26,
  backgroundColor: "#fff",
  flex: 1,
},
itemName: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 4,
},
itemCategory: {
  fontSize: 14,
  color: "#808080",
  marginBottom: 10,
},
section: {
  marginBottom: 16,
},
sectionTitle: {
  fontSize: 16,
  fontWeight: "500",
  marginBottom: 8,
  marginTop: 10,
},
detailsTitle: {
  fontSize: 16,
  fontWeight: "800",
  marginBottom: 8,
  marginTop: 10,
},
sectionText: {
  fontSize: 14,
  color: "#404040",
},
ellipsis: {
  color: "#6E7EFF",
  fontSize: 14,
},
detailText: {
  fontSize: 14,
  color: "#404040",
  marginBottom: 4,
},
footer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 16,
  marginBottom: 16,
},
footerText: {
  fontSize: 14,
  color: "#808080",
},
footerTextBold: {
  fontWeight: "bold",
  color: "#808080",
},
completeButton: {
  backgroundColor: "#6B6BE1",
  paddingVertical: 12,
  alignItems: "center",
  borderRadius: 8,
},
disabledButton: {
  backgroundColor: "#EEEEEE",
  paddingVertical: 12,
  alignItems: "center",
  borderRadius: 8,
},
completeButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
disabledButtonText: {
  color: "#3D404A",
  fontSize: 16,
  fontWeight: "normal",
},
reviewTitle: {
    marginTop: 30,
    height: 50,
    backgroundColor: "#EEEEEE",
    width: "85%",
}, 
reviewContent: {
    marginTop: 20,
    height: 110,
    backgroundColor: "#EEEEEE",
    width: "85%",
},
modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
    height: "45%",
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center"
},
modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 25,
  marginTop: 25,
  textAlign: "center",
  marginLeft: 30,
  marginRight: 30,
},
modalText: {
  fontSize: 20,
  marginBottom: 20,
  marginLeft: 30,
  marginRight: 30,
},
modalItemName: {
  fontWeight: "900",
  fontSize: 20,
  color: "#6B6BE1",
},
modalDescription: {
  fontSize: 14,
  color: "#808080",
  marginBottom: 20,
  marginLeft: 30,
  marginRight: 30,
},
confirmButton: {
  backgroundColor: "#6B6BE1",
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginLeft: 30,
  marginRight: 30,
  marginBottom: 50,
  marginTop: 40,
  width: "80%"
},
confirmButtonText: {
  color: "#fff",
  fontSize: 15,
  fontWeight: "400",
  textAlign: 'center',
},
donorSection: {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
}, 
donorSectionChatIcon: {
  marginLeft: 5
},
modalTextDonorEmail: {
  color: "#6B6BE1",
  fontWeight: "600",
  fontSize: 20,
},
modalContentContactDonor: {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "90%",
  height: "40%",
  backgroundColor: "#fff",
  borderRadius: 8,
  alignItems: "center"
},
modalTitleContactDonor: {
  fontSize: 20,
  fontWeight: "bold",
  marginTop: 50,
  textAlign: "center",
  marginLeft: 30,
  marginRight: 30,
},
});

export default MyReservationDetails;
