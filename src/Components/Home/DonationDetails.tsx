import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteItem, getUserById } from "../../api/userApi";
import { Divider } from "react-native-paper";
import { Image } from 'expo-image';
import { deleteItemAction } from "../../store/Items/slice";
import { useDispatch } from "react-redux";
import { deleteUserDonationAction } from "../../store/user/slice";


export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DonationDetails = ({ route }) => {
  const {
    itemId,
    itemName,
    expirationTime,
    itemType,
    description,
    userId,
    itemStatus,
    imageDownloadUrl,
    pickupLocationText
  } = route.params;
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const dispatch = useDispatch()
  const openImageModal = () => setImageModalVisible(true);
  const closeImageModal = () => setImageModalVisible(false);
  const confirmCompletion = async () => {
    setModalVisible(false);
    navigation.goBack();
    dispatch(deleteItemAction(itemId))
    dispatch(deleteUserDonationAction(itemId))
    const res = await deleteItem(itemId);

  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your donation</Text>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Image Placeholder */}
      <View>
      {/* Main Image Container */}
      <TouchableOpacity onPress={openImageModal}>
        <View style={styles.imageContainer}>
          {imageDownloadUrl ? (
            <Image
              source={{ uri: imageDownloadUrl}}
              style={styles.cardImage}
            />
          ) : (
            <Text style={styles.imagePlaceholder}>
              image of the item here if provided, else placeholder
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Modal for Full-Size Image */}
      <Modal visible={isImageModalVisible} transparent={true}>
        <TouchableOpacity style={styles.modalBackground} onPress={closeImageModal}>
          <Image
            source={{ uri: imageDownloadUrl }}
            style={styles.fullSizeImage}
          />
        </TouchableOpacity>
      </Modal>
    </View>

      {/* Donation Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.itemCategory}>{itemType}</Text>
        <Divider />

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          {isDescriptionExpanded || description.length <= 50 ? (
            <Text style={styles.sectionText}>{description}</Text>
          ) : (
            <Text style={styles.sectionText}>
              {description.slice(0, 50)}
              <Text> </Text>
              <Text onPress={toggleDescription} style={styles.ellipsis}>
                ...
              </Text>
            </Text>
          )}
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.detailsTitle}>Details</Text>
          <Divider />
          <Text style={styles.sectionTitle}>Status</Text>
          <Text style={styles.detailText}>
            {itemStatus ? "Available" : "Unavailable"}
          </Text>
          <Text style={styles.sectionTitle}>Pickup location</Text>
          <Text style={styles.detailText}>
            {pickupLocationText ? pickupLocationText : "Not specified"}
          </Text>
          <Text style={styles.sectionTitle}>Donor</Text>
          <Text style={styles.detailText}>
            Jon Doe
            {/* {fullName ? fullName : "Loading..."} */}
          </Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text>
            <Text style={styles.footerTextBold}>Posted</Text>{" "}
            <Text style={styles.footerText}>03/06/2024</Text>
          </Text>
          <Text>
            <Text style={styles.footerTextBold}>Expires</Text>{" "}
            <Text style={styles.footerText}>{formatDate(expirationTime)}</Text>
          </Text>
        </View>

        {/* Complete Transaction Button */}
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => setModalVisible(true)} // Show modal on press
        >
          <Text style={styles.completeButtonText}>Complete Transaction</Text>
        </TouchableOpacity>

        {/* Modal for transaction completion */}
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
                  <Text style={styles.modalTitle}>Complete transaction</Text>
                  <Divider style={{ marginBottom: 20 }} />
                  <Text style={styles.modalText}>
                    Complete transaction for item:{" "}
                    <Text style={styles.modalItemName}>{itemName}</Text>?
                  </Text>
                  <Text style={styles.modalDescription}>
                    Remember, confirm a transaction only once you've donated
                    your item.
                  </Text>

                  <Pressable
                    style={styles.confirmButton}
                    onPress={confirmCompletion} // Close modal on confirmation
                  >
                    <Text style={styles.confirmButtonText}>
                      Confirm completion
                    </Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScrollView>
  );
};

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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
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
    marginBottom: 10,
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
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default DonationDetails;
