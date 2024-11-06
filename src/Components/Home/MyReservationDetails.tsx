import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Pressable,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import StarRating from 'react-native-star-rating-widget';
import { getReservationsById, ReservationDetails } from "../../api/reservationApi";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { DonorDetails, getUser, getUserInfoById } from "../../api/userApi";
// import { Image } from 'expo-image';

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const MyReservationDetails = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [userRating, setUserRating] = useState(0);
    const [reservation, setReservation] = useState<ReservationDetails | null>(null);
    const [donorInfo, setDonorInfo] = useState<DonorDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchReservationDetails = async () => {
        // if (!itemId) {
        //   setError('No item ID provided.');
        //   setLoading(false);
        //   return;
        // }
  
        try {
          setLoading(true);
          let res = await getReservationsById('672a339bf55e8e9bf34657a2'); // HARDCODED RESERVATION ID FOR NOW
          const reservation = res.data;
          setReservation(reservation);

          // get item donor information
          const donorRes = await getUserInfoById(reservation.itemDonor)
          const donorInfo = donorRes.data
          setDonorInfo(donorInfo)
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
        <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your reservation</Text>
            <TouchableOpacity>
            <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
            {reservation?.imageDownloadUrl ? (
              <Image 
                source={{uri: reservation?.imageDownloadUrl}} 
                style={styles.cardImage}
              />
          ) : (
            <Text style={styles.imagePlaceholder}>
              image of the item here if provided, else placeholder
            </Text>
          )}
        </View>

        {/* My Reservation Details */}
        <View style={styles.detailsContainer}>
            <Text style={styles.itemName}>{reservation?.itemName}</Text>
            <Text style={styles.itemCategory}>{reservation?.category}</Text>
            <Divider />

            {/* Description Section */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{reservation?.description}</Text>
            {/* {isDescriptionExpanded || description.length <= 50 ? (
                <Text style={styles.sectionText}>{description}</Text>
            ) : (
                <Text style={styles.sectionText}>
                {description.slice(0, 50)}
                <Text> </Text>
                <Text onPress={toggleDescription} style={styles.ellipsis}>
                    ...
                </Text>
                </Text>
            )} */}
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
            <Text style={styles.sectionTitle}>Donor</Text>
            <Text style={styles.detailText}>
                {`${donorInfo?.firstName} ${donorInfo?.lastName}`}
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
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => setModalVisible(true)} // Show modal on press
        >
          <Text style={styles.completeButtonText}>Review Transaction</Text>
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
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Review transaction</Text>
                  <Divider style={{marginBottom: 20}}/>
                  <Text style={styles.modalText}>
                    Tell us about your experience with{" "}
                    <Text style={styles.modalItemName}>{donorInfo?.firstName}</Text>.
                  </Text>
                  <StarRating
                    rating={userRating}
                    onChange={setUserRating}
                    color="#6B6BE1"
                  />
                  <TextInput
                    label="Title of Review *"
                    value={reviewTitle}
                    onChangeText={(text) => setReviewTitle(text)}
                    style={styles.reviewTitle}
                    mode="flat"
                    activeUnderlineColor="black"
                />
                <TextInput
                    label="Describe your experience *"
                    multiline
                    value={reviewContent}
                    onChangeText={(text) => setReviewContent(text)}
                    style={styles.reviewContent}
                    mode="flat"
                    activeUnderlineColor="black"
                />
                  <Pressable
                    style={styles.confirmButton}
                    onPress={() => setModalVisible(false)} // Close modal on confirmation
                  >
                    <Text style={styles.confirmButtonText}>
                      Submit Review
                    </Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      paddingTop: 48,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
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
    completeButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
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
        height: "65%",
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
});

export default MyReservationDetails