import React, { useEffect, useState } from "react";
import { Image } from 'expo-image';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {
  createReservation,
  getReservationsById,
} from "../../../api/reservationApi";
import {
  DonorDetails,
  getItemsByIds,
  getUserInfoById,
  UserRes,
} from "../../../api/userApi";
import styles from "./Styles";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../store/user/selectors";
import { Reservation, updateUserReservationAction } from "../../../store/user/slice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface Item {
  _id: string;
  userId: string;
  itemName: string;
  itemType: string;
  description: string;
  postedTime: string;
  expirationTime: string;
  itemStatus: number;
  isRequest: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  pickupLocationText: string;
  pickupTimes: string[];
  reservationInfo: Reservation;
  imageDownloadUrl?: string;
}

interface DonationFocusProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

interface DayAndDate {
  day: string;
  date: number;
  month: number; // 0-11
  year: number;
  fullDate: Date;
}

const DonationFocus: React.FC<DonationFocusProps> = ({ navigation, route }) => {
  const { itemId } = route.params || {};
  const [item, setItem] = useState<Item | null>(null);
  const userState = useSelector(userSelector);
  const userId = userState._id;
  const [donorInfo, setDonorInfo] = useState<UserRes>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<"selection" | "confirmation">(
    "selection"
  );
  const [selectedPickupDate, setSelectedPickupDate] =
    useState<DayAndDate | null>(null);
  const [selectedPickupTime, setSelectedPickupTime] = useState<string | null>(
    null
  );

  const [pickupTimesByDate, setPickupTimesByDate] = useState<{
    [dateString: string]: string[];
  }>({});
  const dispatch = useDispatch();

  const transactionStatusMap = {
    0: "Not Reserved",
    1: "Reserved",
    2: "Transaction Completed",
    3: "Review Submitted",
  };

  // Function to generate the next 7 days including today
  const generateNextSevenDays = (): DayAndDate[] => {
    const daysArray: DayAndDate[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      const daySymbol = currentDate
        .toLocaleDateString("en-US", { weekday: "short" })
        .charAt(0)
        .toUpperCase();
      const dateNumber = currentDate.getDate();
      const month = currentDate.getMonth(); // 0-11
      const year = currentDate.getFullYear();

      daysArray.push({
        day: daySymbol,
        date: dateNumber,
        month,
        year,
        fullDate: new Date(currentDate),
      });
    }

    return daysArray;
  };

  const [daysAndDates, setDaysAndDates] = useState<DayAndDate[]>([]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!itemId) {
        setError("No item ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let res = await getItemsByIds([itemId]);
        const items = res.data.items;
        if (items[0] && items.length === 1) {
          setItem(items[0]);
          const donorInfoRes = await getUserInfoById(items[0].userId);
          setDonorInfo(donorInfoRes);
        } else {
          setError("Item not found.");
        }
      } catch (err: any) {
        console.error("Error fetching item details:", err);
        setError(
          typeof err === "string" ? err : "Failed to fetch item details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  useEffect(() => {
    const generatedDaysAndDates = generateNextSevenDays();
    setDaysAndDates(generatedDaysAndDates);
  }, []);

  const processPickupTimes = () => {
    const timesByDate: { [dateString: string]: string[] } = {};

    if (item && item.pickupTimes) {
      item.pickupTimes.forEach((dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const dateString = dateTime.toDateString(); // e.g., 'Fri Nov 01 2024'
        const timeString = dateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }); // e.g., '01:04 AM'

        if (!timesByDate[dateString]) {
          timesByDate[dateString] = [];
        }
        timesByDate[dateString].push(timeString);
      });
    }

    setPickupTimesByDate(timesByDate);
  };

  useEffect(() => {
    processPickupTimes();
  }, [item]);

  const openModal = () => {
    setModalStep("selection");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalStep("selection");
    setSelectedPickupDate(null);
    setSelectedPickupTime(null);
  };

  // Utility function to get ordinal suffix
  const getOrdinal = (n: number): string => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  // Utility function to format the selected date
  const formatSelectedDate = (dateInfo: DayAndDate): string => {
    const monthName = dateInfo.fullDate.toLocaleDateString("en-US", {
      month: "long",
    });
    const day = dateInfo.date;
    const year = dateInfo.year;
    const ordinal = getOrdinal(day);
    return `${monthName} ${day}${ordinal}, ${year}`;
  };

  const confirmReservation = async () => {
    if (selectedPickupDate && selectedPickupTime) {
      if (!userId) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const today = new Date();
      const pickupDateTime = new Date(selectedPickupDate.fullDate);
      // Parse selectedPickupTime to get hours and minutes
      const [time, modifier] = selectedPickupTime.split(" ");
      let [hours, minutes] = time.split(":");
      let hour = parseInt(hours);

      if (modifier === "PM" && hour !== 12) {
        hour += 12;
      } else if (modifier === "AM" && hour === 12) {
        hour = 0;
      }

      pickupDateTime.setHours(hour);
      pickupDateTime.setMinutes(parseInt(minutes));

      const expirationDate = new Date(pickupDateTime);
      expirationDate.setDate(pickupDateTime.getDate() + 1); // Day after pickup date

      const reservationData = {
        userId: userId,
        isReserved: true,
        startTime: today.toISOString(),
        expirationTime: expirationDate.toISOString(),
        pickUpDate: pickupDateTime.toISOString(),
      };

      try {
        const res = await createReservation(item!._id, reservationData);
        // update user reservations
        dispatch(updateUserReservationAction({ ...res.reservation }));
        console.log(
          `Reservation confirmed for date: ${formatSelectedDate(
            selectedPickupDate
          )} at ${selectedPickupTime}`
        );
        setModalStep("confirmation");
        // Optionally, refetch item details to reflect reservation status
        const updatedItem = await getItemsByIds([item._id]);
        if (updatedItem.data.items.length === 1) {
          setItem(updatedItem.data.items[0]);
        }
      } catch (error: any) {
        console.error("Failed to confirm reservation:", error);
        alert("Failed to reserve donation. Please try again.");
      }
    } else {
      alert("Please select a pickup date and time before confirming.");
    }
  };

  const flagPost = () => {
    navigation.navigate("ReportListing");
  };

  // Utility function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown"; // Check for empty or null string

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const openImageModal = () => setImageModalVisible(true);
  const closeImageModal = () => setImageModalVisible(false);
  const transactionStatus = item?.reservationInfo.transactionStatus;

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.headerText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.headerText}>No donation selected.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back Arrow Icon */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>

          {/* Header Title */}
          <Text style={styles.headerText}>Donation</Text>

          {/* Flag Icon */}
          <TouchableOpacity
            style={styles.flagButton}
            onPress={flagPost}
            accessibilityLabel="Flag post"
          >
            <Icon name="flag" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View>
          {/* Image (Full Width) */}
          <TouchableOpacity onPress={openImageModal}>
            <View>
              {item.imageDownloadUrl ? (
                <Image
                  source={{ uri: item.imageDownloadUrl }}
                  style={styles.imageFullWidth}
                />
              ) : (
                <View style={styles.placeholderFullWidth}>
                  <Text style={styles.placeholderText}>
                    Image not available
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <Modal visible={isImageModalVisible} transparent={true}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={closeImageModal}
            >
              <Image
                source={{ uri: item.imageDownloadUrl }}
                style={{ width: "90%", height: "90%", resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </Modal>
        </View>
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Details */}
          <View>
            {/* Item Title Section */}
            <View style={styles.section}>
              <Text style={styles.modalTitle}>
                {item.itemName || "Unnamed Item"}
              </Text>
              <Text style={styles.modalCategory}>
                {item.itemType || "Unknown Category"}
              </Text>
              <Divider />
            </View>

            {/* Details Section */}
            <View style={styles.section}>
              <View style={styles.subSection}>
                <Text style={styles.subSectionHeader}>Description</Text>
                <Text style={styles.description}>
                  {item.description || "No description provided."}
                </Text>
              </View>
              <Text style={styles.sectionHeader}>Details</Text>
              <Divider />
              <View style={styles.details}>
                <View style={styles.subSection}>
                  <Text style={styles.subSectionHeader}>Status</Text>
                  <Text style={styles.detailText}>
                    {transactionStatusMap[transactionStatus as keyof typeof transactionStatusMap]}
                  </Text>
                </View>
                <View style={styles.subSection}>
                  <Text style={styles.subSectionHeader}>Pickup location</Text>
                  <Text style={styles.detailText}>
                    {item.pickupLocationText || "Location not provided"}
                  </Text>
                </View>
                <View style={styles.subSection}>
                  <Text style={styles.subSectionHeader}>Donor</Text>
                  <Text style={styles.detailText}>
                    {`${donorInfo?.data.firstName} ${donorInfo?.data.lastName}` ||
                      "Unknown Donor"}{" "}
                    {donorInfo?.data.rating !== 0
                      ? `(${donorInfo?.data.rating}/5 ⭐)`
                      : `(N/A ⭐) `}
                  </Text>
                </View>
                <View style={styles.subSection}>
                  <View style={[styles.dates, { flexDirection: "row" }]}>
                    <Text style={[styles.dateText, { flex: 1 }]}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#808080",
                          fontSize: 14,
                        }}
                      >
                        Posted
                      </Text>{" "}
                      <Text style={{ fontSize: 14, color: "#808080" }}>
                        {formatDate(item.postedTime) || "Unknown"}
                      </Text>
                    </Text>
                    <Text style={[styles.dateText, { flex: 1 }]}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#808080",
                          fontSize: 14,
                        }}
                      >
                        Expires
                      </Text>{" "}
                      <Text style={{ fontSize: 14, color: "#808080" }}>
                        {formatDate(item.expirationTime) || "Unknown"}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Reserve Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={openModal}
          >
            Reserve donation
          </Button>
        </View>
      </View>

      {/* Reservation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {modalStep === "selection" ? (
          <View style={styles.modalOverlay}>
            <View style={styles.reservationModalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                {/* Modal Header Title */}
                <Text style={styles.modalHeaderText}>Reserve Donation</Text>

                {/* Close Modal Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                  accessibilityLabel="Close modal"
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>

              {/* Modal Scrollable Content */}
              <ScrollView>
                {/* Details (excluding "Posted" date) */}
                <View>
                  {/* Item Title Section */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalTitle}>
                      {item.itemName || "Unnamed Item"}
                    </Text>
                    <Text style={styles.modalCategory}>
                      {item.itemType || "Unknown Category"}
                    </Text>
                  </View>

                  {/* Description Section */}
                  <View style={styles.modalSection}>
                    <View style={styles.modalSubSection}>
                      <Text style={styles.modalSubSectionHeader}>
                        Description
                      </Text>
                      <Text style={styles.description}>
                        {item.description || "No description provided."}
                      </Text>
                    </View>
                    <View style={styles.modalSubSection}>
                      <Text style={styles.modalSubSectionHeader}>
                        Pickup location
                      </Text>
                      <Text style={styles.detailText}>
                        {item.pickupLocationText || "Location not provided"}
                      </Text>
                    </View>
                    <View style={styles.modalSubSection}>
                      <Text style={styles.modalSubSectionHeader}>Donor</Text>
                      <Text style={styles.detailText}>
                        {`${donorInfo?.data.firstName} ${donorInfo?.data.lastName}` ||
                          "Unknown Donor"}{" "}
                        {donorInfo?.data.rating !== 0
                          ? `(${donorInfo?.data.rating}/5 ⭐)`
                          : `(N/A ⭐) `}
                      </Text>
                    </View>
                    <View style={styles.modalSubSection}>
                      <Text style={[styles.dateText, { flex: 1 }]}>
                        <Text style={styles.modalSubSectionHeader}>
                          Expires
                        </Text>{" "}
                        {formatDate(item.expirationTime) || "Unknown"}
                      </Text>
                    </View>
                  </View>

                  {/* Pickup Time Section */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionHeader}>Pickup Time</Text>
                    <Text style={styles.pickupDescription}>
                      Please select a suitable pickup time from the following
                      options:
                    </Text>
                    <View style={styles.pickupOptionsContainer}>
                      {/* Days of the Week */}
                      <View style={styles.daysContainer}>
                        {daysAndDates.map((dayItem, index) => (
                          <Text key={index} style={styles.dayText}>
                            {dayItem.day}
                          </Text>
                        ))}
                      </View>
                      {/* Dates */}
                      <View style={styles.datesContainer}>
                        {daysAndDates.map((dayItem, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.dateCircle,
                              selectedPickupDate?.fullDate.toDateString() ===
                                dayItem.fullDate.toDateString() &&
                                styles.selectedDateCircle,
                            ]}
                            onPress={() => {
                              setSelectedPickupDate(dayItem);
                              setSelectedPickupTime(null); // Reset selected time when date changes
                            }}
                          >
                            <Text
                              style={[
                                styles.dateTextInCircle,
                                selectedPickupDate?.fullDate.toDateString() ===
                                  dayItem.fullDate.toDateString() &&
                                  styles.selectedDateText,
                              ]}
                            >
                              {dayItem.date}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    {/* Times for selected date */}
                    {selectedPickupDate && (
                      <View style={styles.modalSubSection}>
                        {pickupTimesByDate[
                          selectedPickupDate.fullDate.toDateString()
                        ] ? (
                          <View>
                            <View>
                              <Text style={styles.text}>
                                Please note that each time slot is 15 minutes.
                              </Text>
                            </View>
                            <View style={styles.timesContainer}>
                              {pickupTimesByDate[
                                selectedPickupDate.fullDate.toDateString()
                              ].map((time, index) => (
                                <TouchableOpacity
                                  key={index}
                                  style={[
                                    styles.timeOption,
                                    selectedPickupTime === time &&
                                      styles.selectedTimeOption,
                                  ]}
                                  onPress={() => setSelectedPickupTime(time)}
                                >
                                  <Text
                                    style={[
                                      styles.timeOptionText,
                                      selectedPickupTime === time &&
                                        styles.selectedTimeOptionText,
                                    ]}
                                  >
                                    {time}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          </View>
                        ) : (
                          <Text style={styles.text}>
                            No available times for this date.
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>

              {/* Confirm Reservation Button */}
              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonText}
                onPress={confirmReservation}
              >
                Confirm Reservation
              </Button>
            </View>
          </View>
        ) : (
          // Confirmation Modal Content
          <View style={styles.modalOverlay}>
            <View style={styles.confirmationModalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                {/* Modal Header Title */}
                <Text style={styles.modalHeaderText}>Reserve Donation</Text>
              </View>

              {/* Confirmation Content */}
              <ScrollView>
                {/* Reservation Date */}
                {selectedPickupDate && selectedPickupTime && (
                  <View style={styles.modalSection}>
                    <Text style={styles.confirmationText}>
                      Your reservation is{"\n"}confirmed for:
                    </Text>
                    <Text style={styles.confirmationTextDate}>
                      {formatSelectedDate(selectedPickupDate)} at{" "}
                      {selectedPickupTime}
                    </Text>
                  </View>
                )}

                {/* Reservation Details */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionHeader}>
                    Reservation details
                  </Text>

                  {/* Item */}
                  <View style={styles.modalSubSection}>
                    <Text style={styles.modalSubSectionHeader}>Item</Text>
                    <Text style={styles.reservationDetailText}>
                      {item.itemName || "Unnamed Item"}
                    </Text>
                  </View>

                  {/* Pickup Location */}
                  <View style={styles.modalSubSection}>
                    <Text style={styles.modalSubSectionHeader}>
                      Pickup location
                    </Text>
                    <Text style={styles.reservationDetailText}>
                      {item.pickupLocationText || "Location not provided"}
                    </Text>
                  </View>

                  {/* Contact the Donor */}
                  <View style={styles.modalSubSection}>
                    <Text style={styles.modalSubSectionHeader}>
                      Contact the donor
                    </Text>
                    <View style={styles.contactDonorContainer}>
                      <Text style={styles.donorName}>
                        {item.reservationInfo.userId || "Unknown Donor"}
                      </Text>
                      <TouchableOpacity
                        style={styles.conversationIcon}
                        onPress={() => {
                          // Future functionality
                        }}
                        accessibilityLabel="Contact donor"
                      >
                        <Text style={styles.conversationIconText}>💬</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>

              {/* Close Confirmation Modal Button */}
              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonText}
                onPress={closeModal}
              >
                Close
              </Button>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default DonationFocus;
