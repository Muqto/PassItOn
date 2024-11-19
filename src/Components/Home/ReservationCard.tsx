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
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyReservationDetails", {
          _id,
          transactionStatus,
          itemId,
        })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.bodyContainer}>
          <View>
            {reservation?.imageDownloadUrl ? (
              <Image
                source={{ uri: reservation.imageDownloadUrl }}
                style={styles.cardImage}
              />
            ) : (
              <View
                style={[styles.cardImage, { backgroundColor: "#d0d0fa" }]}
              ></View>            )}
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
                {reservation?.itemName}
              </Text>
              <View style={styles.statusIcon}>
                {getIconForTransactionStatus(
                  Number(reservation?.transactionStatus)
                )}
              </View>
            </View>

            {/* Transaction Status Row */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.pickUpText}>
                {reservation?.transactionStatus === 0 ? (
                  "Awaiting Reservation"
                ) : (
                  <Text>
                    <Text style={styles.pickUpText}>Pickup:</Text>{" "}
                    <Text style={styles.pickUpTimeText}>
                      {formatDate(expirationTime)}
                    </Text>
                  </Text>
                )}
              </Text>
            </View>

            {/* Item Type */}
            <Text style={styles.categoryText}>{reservation?.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReservationCard;
