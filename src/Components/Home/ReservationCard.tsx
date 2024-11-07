import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { Text } from "react-native-paper";
import styles from "./Styles";
import { ReservationProps } from "./Types";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "./MyReservationDetails";
import { getUserById } from "../../api/userApi";

const ReservationCard = ({
  itemName,
  expirationTime,
  itemType,
  imageDownloadUrl,
  itemStatus,
  userId,
  description,
  pickupLocationText,
}: ReservationProps) => {
  const navigation = useNavigation(); // access navigation
  const getUserName = async () => {
    const user = await getUserById({ id: userId });
    return `${user.data.firstName} ${user.data.lastName}`;
  };
  const fullName = getUserName();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.bodyContainer}>
        <View>
          {imageDownloadUrl !== undefined ? (
            <Image
              source={{ uri: imageDownloadUrl }}
              style={styles.cardImage}
            />
          ) : (
            <View style={styles.cardImagePlaceholder}></View>
          )}
        </View>
        <View style={styles.cardDesc}>
          <View>
            <Text style={styles.itemNameText}>{itemName}</Text>
            <Text style={styles.pickUpText}>
              Pickup:{" "}
              <Text style={styles.pickUpTimeText}>
                {formatDate(expirationTime)}
              </Text>
            </Text>
            <Text style={styles.categoryText}>{itemType}</Text>
          </View>
          <View style={styles.details}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("MyReservationDetails", {
                  itemName,
                  expirationTime,
                  itemType,
                  description,
                  userId,
                  itemStatus,
                  imageDownloadUrl,
                  pickupLocationText,
                })
              }
            >
              <Text style={styles.detailsText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReservationCard;
