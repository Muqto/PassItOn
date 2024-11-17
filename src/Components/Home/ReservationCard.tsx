import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { Text } from "react-native-paper";
import styles from "./Styles";
import { ReservationProps } from "./Types";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "./MyReservationDetails";
import { DonorDetails, getUserById, getUserInfoById } from "../../api/userApi";
import { useEffect, useState } from "react";
import {
  getReservationsById,
  ReservationDetails,
} from "../../api/reservationApi";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";

const ReservationCard = ({
  _id,
  userId,
  isReserved,
  startTime,
  expirationTime,
  pickUpDate,
  itemId,
  transactionStatus,
}: ReservationProps) => {
  const navigation = useNavigation(); // access navigation
  const getUserName = async () => {
    const user = await getUserById(userId);
    return `${user.data.firstName} ${user.data.lastName}`;
  };
  const fullName = getUserName();
  const [donorInfo, setDonorInfo] = useState<DonorDetails | null>(null);
  const [reservation, setReservation] = useState<ReservationDetails | null>(
    null
  );

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        let res = await getReservationsById(_id);
        const reservation = res.data;
        setReservation(reservation);
        // setReservationTransactionStatus(reservation.transactionStatus);

        // get item donor information
        const donorRes = await getUserInfoById(reservation.itemDonor);
        const donorInfo = donorRes.data;
        setDonorInfo(donorInfo);
      } catch (err: any) {
        console.error("Error fetching reservation details:", err);
      } finally {
        // setLoading(false);
      }
    };
    fetchReservationDetails();
  }, []);
  // Define icons based on transactionStatus
  const getIconForTransactionStatus = (status: number | undefined) => {
    switch (status) {
      case 1:
        return (
          <FontAwesomeIcon size={16} icon={faHourglassStart} color="#FFCC99" />
        );
      case 2:
        return (
          <FontAwesomeIcon size={16} icon={faCircleCheck} color={"#5cb85c"} />
        ); //success green
      default:
        return null;
    }
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.bodyContainer}>
        <View>
          {reservation?.imageDownloadUrl !== undefined ? (
            <Image
              source={{ uri: reservation.imageDownloadUrl }}
              style={styles.cardImage}
            />
          ) : (
            <View style={styles.cardImagePlaceholder}></View>
          )}
        </View>
        <View style={styles.cardDesc}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.itemNameText}>{reservation?.itemName}</Text>
              <View style={styles.statusIcon}>
                {getIconForTransactionStatus(
                  Number(reservation?.transactionStatus)
                )}
              </View>
            </View>
            <Text style={styles.pickUpText}>
              Pickup:{" "}
              <Text style={styles.pickUpTimeText}>
                {formatDate(expirationTime)}
              </Text>
            </Text>
            <Text style={styles.categoryText}>{reservation?.category}</Text>
          </View>
          <View style={styles.details}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("MyReservationDetails", {
                  _id,
                  transactionStatus,
                  itemId,
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
