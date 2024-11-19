import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Example: Using MaterialIcons

import styles from "./Styles";
import { DonationProps } from "./Types";
import { useNavigation } from "@react-navigation/native";
import { formatDate, formatDateWithTime } from "./DonationDetails";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClockRotateLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../Colors/Colors";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";

const DonationCard = ({
  itemId,
  itemName,
  expirationTime,
  itemType,
  imageDownloadUrl,
  itemStatus,
  userId,
  description,
  pickupLocationText,
  reservationInfo,
}: DonationProps) => {
  const navigation = useNavigation(); // Access navigation

  // Define icons based on transactionStatus
  const getIconForTransactionStatus = (status: number | undefined) => {
    switch (status) {
      case 0:
        return (
          <FontAwesomeIcon size={20} icon={faClockRotateLeft} color="#FFCC99" />
        );
      case 1:
        return (
          <FontAwesomeIcon size={20} icon={faHandshake} color={"#5cb85c"} />
        ); //success green
      case 2:
        return (
          <FontAwesomeIcon
            size={20}
            icon={faLocationDot}
            color={colors.primaryPurple}
          />
        );
      case 3:
        return (
          <FontAwesomeIcon
            size={20}
            icon={faLocationDot}
            color={colors.primaryPurple}
          />
        );
      default:
        return null;
    }
  };


  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DonationDetails", {
          itemId,
          itemName,
          expirationTime,
          itemType,
          description,
          userId,
          itemStatus,
          imageDownloadUrl,
          pickupLocationText,
          reservationInfo,
        })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.bodyContainer}>
          <View>
            {imageDownloadUrl ? (
              <Image
                source={{ uri: imageDownloadUrl }}
                style={styles.cardImage}
              />
            ) : (
              <View
                style={[styles.cardImage, { backgroundColor: "#6B6BE1" }]}
              ></View>
            )}
          </View>

          <View style={styles.cardDesc}>
            {/* Title Row */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between", // Aligns title and icon horizontally
                width: "100%",
              }}
            >
              <Text
                style={styles.itemNameText}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {itemName}
              </Text>
              <View style={styles.statusIcon}>
                {getIconForTransactionStatus(
                  Number(reservationInfo.transactionStatus)
                )}
              </View>
            </View>

            {/* Transaction Status Row */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.pickUpText}>
                {reservationInfo.transactionStatus === 0 ? (
                  "Awaiting Reservation"
                ) : (
                  <Text>
                    <Text style={styles.pickUpText}>Pickup:</Text>{" "}
                    <Text style={styles.pickUpTimeText}>
                      {formatDateWithTime(expirationTime)}
                    </Text>
                  </Text>
                )}
              </Text>
            </View>

            {/* Item Type */}
            <Text style={styles.categoryText}>{itemType}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );  
};

export default DonationCard;
