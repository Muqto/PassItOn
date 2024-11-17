import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons"; // Replace with the appropriate icon library you're using
import { useSelector } from "react-redux";
import {
  userDonationsSelector,
  userReservationsSelector,
  userSelector,
} from "../../store/user/selectors";
import { Item } from "../../store/user/slice";
import { Image } from "expo-image";
import { getItemsByIds } from "../../api/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGifts, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const History = ({ navigation }) => {
  // Example data for recent transactions
  const transactions = [
    { id: "1", name: "Item 1", status: "Picked up", icon: "📦" },
    { id: "2", name: "Another Item", status: "Donated", icon: "🌱" },
    { id: "3", name: "Item 2", status: "Picked up", icon: "📦" },
    { id: "4", name: "Item 3", status: "Picked up", icon: "📦" },
    { id: "5", name: "Another Item", status: "Donated", icon: "🌱" },
    { id: "6", name: "Another Item", status: "Donated", icon: "🌱" },
    { id: "7", name: "Another Item", status: "Donated", icon: "🌱" },
    { id: "8", name: "Another Item", status: "Donated", icon: "🌱" },
  ];
  const user = useSelector(userSelector);
  const completedDonations = useSelector(userDonationsSelector).filter(
    (donation) => Number(donation.reservationInfo.transactionStatus) >= 2
  );
  const completedReservations = useSelector(userReservationsSelector).filter(
    (reservation) => Number(reservation.transactionStatus) >= 2
  );
  const [itemsPickedUp, setItemsPickedUp] = useState<Item[]>([]);
  const allTransactions = [...itemsPickedUp, ...completedDonations];
  const sortedTransactions = allTransactions.sort((a: Item, b: Item) => {
    const dateA = new Date(a.reservationInfo.pickUpDate as string).getTime();
    const dateB = new Date(b.reservationInfo.pickUpDate as string).getTime();
    return dateB - dateA; // Descending order
  });
  type ItemObject = {
    item: Item;
  };
  const getReservations = async () => {
    let resIds = completedReservations.map((item) => item.itemId);
    let res = await getItemsByIds(resIds);
    setItemsPickedUp(res.data.items);
  };

  useEffect(() => {
    getReservations();
  }, []);

  const renderTransaction = ({ item }: ItemObject) => {
    const isDonated = user._id === item.userId;
    return (
      <Pressable
        style={styles.transactionItem}
        onPress={() =>
            navigation.navigate("DonationDetails", { ...item, fromHistory: true })
        }
      >
        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Image
            source={{ uri: item.imageDownloadUrl }}
            style={styles.imageIcon}
          />
        </View>
        {/* Item Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <View
            style={{
              backgroundColor: "rgba(107, 176, 225, 0.1)",
              display: "flex",
              flexDirection: "row",
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 4,
              borderRadius: 10,
              
            }}
          >
            <Text
              style={[
                styles.itemStatus,
                isDonated ? styles.statusDonated : styles.statusPicked,
              ]}
            >
              {isDonated ? "Donated" : "Picked up"}
            </Text>
            <FontAwesomeIcon
              size={20}
              icon={isDonated ? faHandHoldingHeart : faGifts}
              color={
                isDonated
                  ? styles.statusDonated.color
                  : styles.statusPicked.color
              }
            />
          </View>
        </View>
        {/* Arrow Icon */}
        <Text style={styles.arrow}>➔</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Centered Title */}
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>History</Text>
        {/* Spacer to keep the title centered */}
        <View style={styles.backButton} />
      </View>
      <Text style={styles.subHeader}>Your recent transactions</Text>
      <FlatList
        data={sortedTransactions}
        keyExtractor={(item) => item._id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  backButton: {
    width: 40, // Same width as the icon to maintain alignment
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 35,
  },
  listContainer: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#E0E7FF", // Light purple
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  imageIcon: {
    height: 100,
    width: 100,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  itemStatus: {
    fontSize: 14,
    marginRight: 8,
  },
  statusPicked: {
    color: "#6BB0E1", // Blue for "Picked up"
  },
  statusDonated: {
    color: "#00DC16", // Green for "Donated"
  },
  arrow: {
    fontSize: 16,
    color: "#666",
  },
});

export default History;
