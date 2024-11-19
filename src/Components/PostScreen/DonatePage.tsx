import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import {
  ref as firebaseStorageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import { useSelector } from "react-redux";

import useItem from "../../Hooks/Item";
import { userSelector } from "../../store/user/selectors";
import styles from "./Styles";

import { Calendar } from "react-native-calendars";

const defaultLocation = { latitude: 0, longitude: 0 };

const DonatePage = () => {
  // ---------------------- Hooks ----------------------
  const { donate } = useItem();
  const userState = useSelector(userSelector);

  // ---------------------- State Variables ----------------------
  const [donationItemName, setDonationItemName] = useState("");
  const [donationItemDescription, setDonationItemDescription] = useState("");
  const [category, setCategory] = useState("");

  const categoryList = [
    { label: "Food", value: "Food" },
    { label: "Clothes", value: "Clothes" },
    { label: "Furniture", value: "Furniture" },
    { label: "Book", value: "Book" },
    { label: "Stationery", value: "Stationery" },
    { label: "Other", value: "Other" },
  ];

  const [location, setLocation] = useState(defaultLocation);
  const [date, setDate] = useState(dayjs());
  const [modalStep, setModalStep] = useState<'none' | 'date' | 'time'>('none');

  // Combined Time Slots in 15-minute increments
  const generateTimeSlots = () => {
    const slots = [];
    const startOfDay = dayjs().startOf('day');
    for (let i = 0; i < 96; i++) { // 24 hours * 4 slots per hour
      const time = startOfDay.add(i * 15, 'minute');
      slots.push(time.format('HH:mm'));
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Define separate arrays for start and end time slots
  const startTimeSlots = timeSlots;
  const endTimeSlots = [...timeSlots.slice(1), "00:00"]; // Move "00:00" to the end

  // State for selected start and end times
  const [selectedStartTime, setSelectedStartTime] = useState<string>("00:00");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("00:15");

  const [pickupTimes, setPickupTimes] = useState<string[]>([]);
  const [pickupLocationText, setPickupLocationText] = useState("");
  const placesRef = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [imageuri, setImageUri] = useState<string | undefined>(undefined);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  // ---------------------- Effect Hooks ----------------------
  useEffect(() => {
    resetToDefault();
  }, []);

  // ---------------------- Helper Functions ----------------------
  const resetToDefault = () => {
    const now = dayjs();
    const roundedMinutes = Math.ceil(now.minute() / 15) * 15;
    let nextSlot = now.hour().toString().padStart(2, '0') + ':' + roundedMinutes.toString().padStart(2, '0');
    
    if (roundedMinutes === 60) {
      nextSlot = (now.hour() + 1).toString().padStart(2, '0') + ':00';
    }

    // Find the index of the nextSlot in startTimeSlots
    const startIndex = startTimeSlots.findIndex(slot => slot === nextSlot);
    
    if (startIndex === -1) {
      // If nextSlot is not found (edge case), default to '00:00' and '00:15'
      setSelectedStartTime("00:00");
      setSelectedEndTime("00:15");
    } else {
      setSelectedStartTime(startTimeSlots[startIndex]);
      setSelectedEndTime(startTimeSlots[(startIndex + 1) % startTimeSlots.length]);
    }
  };

  const openDatePicker = () => setModalStep('date'); // Open the date picker modal
  const closeModal = () => {
    setModalStep('none');
    setDate(dayjs()); // Reset date to today
    resetToDefault(); // Reset start and end times to defaults
  };

  const handleDateSelect = () => {
    try {
      if (date) { // Ensure a date is selected
        setModalStep('time'); // Switch to 'time' step
      } else {
        Alert.alert("No Date Selected", "Please select a date before proceeding.");
      }
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  };

  const addPickupTime = () => {
    const startDateTime = dayjs(`${date.format('YYYY-MM-DD')} ${selectedStartTime}`, 'YYYY-MM-DD HH:mm');
    const endDateTime = dayjs(`${date.format('YYYY-MM-DD')} ${selectedEndTime}`, 'YYYY-MM-DD HH:mm');

    // Validation: End time must be after start time
    if (!endDateTime.isAfter(startDateTime)) {
      Alert.alert("Invalid Time Range", "End time must be after start time.");
      return;
    }

    // Validation: Difference must be a multiple of 15 minutes
    const diffMinutes = endDateTime.diff(startDateTime, 'minute');
    if (diffMinutes % 15 !== 0) {
      Alert.alert("Invalid Time Range", "The time range must be in increments of 15 minutes.");
      return;
    }

    // Generate pickup times in 15-minute increments
    const times = [];
    let current = startDateTime;

    while (true) {
      current = current.add(15, 'minute');
      if (current.isBefore(endDateTime) || current.isSame(endDateTime)) {
        const formattedTime = current.format('YYYY-MM-DD HH:mm');
        times.push(formattedTime);
      } else {
        break;
      }
    }

    // Check for duplicates
    const isDuplicate = times.some(t => pickupTimes.includes(t));
    if (isDuplicate) {
      // Alert.alert("Duplicate Pickup Time", "Some of the selected pickup times have already been added.");
      closeModal(); // This will reset date and time selections
      return;
    }

    // Add new times to pickupTimes
    setPickupTimes([...pickupTimes, ...times]);

    // Close the modal and reset selected times
    closeModal(); // This will reset date and time selections
  };

  const groupPickupTimesByDate = () => {
    const sortedPickupTimes = [...pickupTimes].sort((a, b) => dayjs(a, 'YYYY-MM-DD HH:mm').diff(dayjs(b, 'YYYY-MM-DD HH:mm')));

    const grouped = sortedPickupTimes.reduce((acc, timeStr) => {
      const dateFormatted = dayjs(timeStr, 'YYYY-MM-DD HH:mm').format("MMM DD YYYY");
      
      const existingGroup = acc.find(group => group.date === dateFormatted);
      
      if (existingGroup) {
        existingGroup.times.push(timeStr);
      } else {
        acc.push({ date: dateFormatted, times: [timeStr] });
      }
      
      return acc;
    }, [] as { date: string, times: string[] }[]);

    return grouped;
  };

  const removePickupTime = (timeStr: string) => {
    const newPickupTimes = pickupTimes.filter(t => t !== timeStr);
    setPickupTimes(newPickupTimes);
  };

  const openCancelModal = () => {
    if (
      donationItemName ||
      donationItemDescription ||
      category ||
      imageuri ||
      location.latitude !== defaultLocation.latitude ||
      pickupLocationText ||
      pickupTimes.length !== 0
    ) {
      setIsCancelModalVisible(true);
    }
  };
  
  const closeCancelModal = () => {
    setIsCancelModalVisible(false);
  };
  
  const confirmCancelDonation = () => {
    setDonationItemName("");
    setDonationItemDescription("");
    setCategory("");
    setLocation(defaultLocation);
    setPickupLocationText("");
    setPickupTimes([]);
    setImageUri(undefined);
    closeCancelModal();
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  // ---------------------- Main Functions ----------------------
  const postDonation = async () => {
    let alertMsg = "";

    console.log(pickupTimes)

    if (!donationItemName) {
      alertMsg = "Need an item name to post donation!"
    } 
    else if (!category) {
      alertMsg = "Need an item category to post donation!"
    } 
    else if (!location) {
      alertMsg = "Need a location to post donation!"
    } 
    else if (pickupTimes.length === 0) { // Updated condition
      alertMsg = "Need a pick up time to post donation!"
    }

    if (alertMsg !== "") {
      Alert.alert("Alert", alertMsg);
      return;
    }

    try {
      // Calculate distance from user to new donation
      const distance = getDistance(
        userState.location?.latitude || 0,
        userState.location?.longitude || 0,
        location.latitude || 0,
        location.longitude || 0
      );

      let imageDownloadUrl = "";

      // If an image is provided, upload it to Firebase
      if (imageuri) {
        const storageRef = firebaseStorageRef(storage, "image");
        const fileName = `${userState._id}_${Date.now()}`;
        const donationImageStorageRef = firebaseStorageRef(storageRef, `${fileName}`);

        try {
          const blobRes = await fetch(imageuri);
          const blob = await blobRes.blob();

          await uploadBytes(donationImageStorageRef, blob);
          console.log("Uploaded a blob or file!");

          imageDownloadUrl = await getDownloadURL(donationImageStorageRef);
        } catch (error) {
          console.log("Error uploading image:", error);
          // Optionally notify the user about the upload failure
        }
      }

      // Proceed with the donation creation
      await donate(
        userState._id,
        donationItemName,
        category,
        donationItemDescription,
        dayjs().toString(),
        dayjs().add(7, "day").toString(),
        1,
        false,
        location,
        pickupLocationText,
        pickupTimes,
        {
          userId: userState._id,
          isReserved: false,
          startTime: "N/A",
          expirationTime: "N/A",
          pickUpDate: "N/A",
          itemId: 0,
          transactionStatus: 0,
        },
        distance,
        imageDownloadUrl
      );

      // Reset form states
      setDonationItemName("");
      setDonationItemDescription("");
      setCategory("");
      setPickupTimes([]);
      setDate(dayjs());
      setLocation(defaultLocation);
      placesRef.current?.setAddressText("");
      setImageUri(undefined);

      // Show success alert
      Alert.alert("Success", "Your donation has been posted successfully!");

    } catch (error) {
      console.log("Error in postDonation function:", error);
      Alert.alert("Submission Error", "There was an error posting your donation. Please try again.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ---------------------- Time Adjustment Functions ----------------------
  const handleStartTimeChange = (item: any) => {
    const newStartTime = item.value;
    setSelectedStartTime(newStartTime);

    const startIndex = startTimeSlots.findIndex(slot => slot === newStartTime);
    const endIndex = endTimeSlots.findIndex(slot => slot === selectedEndTime);

    if (startIndex === -1) return;

    if (startIndex > endIndex) {
      // Set end time to the next available slot after start time
      const newEndIndex = startIndex;
      if (newEndIndex < endTimeSlots.length) {
        setSelectedEndTime(endTimeSlots[newEndIndex]);
      } else {
        // If start time is the last slot, wrap around or set to the last slot
        setSelectedEndTime(endTimeSlots[endTimeSlots.length - 1]);
      }
    }
  };

  const handleEndTimeChange = (item: any) => {
    const newEndTime = item.value;
    setSelectedEndTime(newEndTime);

    const endIndex = endTimeSlots.findIndex(slot => slot === newEndTime);
    const startIndex = startTimeSlots.findIndex(slot => slot === selectedStartTime);

    if (endIndex === -1) return;

    if (endIndex < startIndex) {
      // Set start time to the previous available slot before end time
      const newStartIndex = endIndex;
      if (newStartIndex >= 0) {
        setSelectedStartTime(startTimeSlots[newStartIndex]);
      } else {
        // If end time is the first slot, set to the first slot
        setSelectedStartTime(startTimeSlots[0]);
      }
    }
  };

  // ---------------------- UI Components ----------------------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.donatePageContainer}>
        <Text style={styles.donatePageHeader}>Donate an item</Text>
        
        <ScrollView
          style={styles.donatePageInfoContainer}
          keyboardShouldPersistTaps={"handled"}
        >

          {/* ---------------------- Item Name ---------------------- */}
          <TextInput
            label="Item name *"
            value={donationItemName}
            onChangeText={setDonationItemName}
            style={styles.donationItemTitle}
            mode="flat"
            activeUnderlineColor="black"
            underlineColor="transparent"
          />

          {/* ---------------------- Description ---------------------- */}
          <TextInput
            label="Description "
            multiline
            value={donationItemDescription}
            onChangeText={setDonationItemDescription}
            style={styles.donationItemDescription}
            mode="flat"
            activeUnderlineColor="black"
            underlineColor="transparent"
          />

          {/* ---------------------- Category ---------------------- */}
          <SafeAreaView style={styles.donationDropdownContainer}>
            <Dropdown
              style={styles.donationDropdown}
              placeholderStyle={styles.donationDropdownPlaceholder}
              selectedTextStyle={styles.donationDropdownSelectedText}
              data={categoryList}
              labelField="label"
              valueField="value"
              placeholder="Category *"
              value={category}
              onChange={(category) => setCategory(category.value)}
            />
          </SafeAreaView>

          {/* ---------------------- Location ---------------------- */}
          <View style={styles.locationInputContainer}>
            <GooglePlacesAutocomplete
              ref={placesRef}
              placeholder="Location *"
              query={{
                key: "AIzaSyA95NKdnduXsF7IoCZ5Je6qAJl7FGQksTQ",
                language: "en",
              }}
              fetchDetails={true}
              onPress={(data, details = null) => {
                setLocation({
                  latitude: details?.geometry?.location?.lat || 0,
                  longitude: details?.geometry?.location?.lng || 0,
                });
                setPickupLocationText(details?.formatted_address || "");
              }}
              textInputProps={{
                placeholderTextColor: "#4A454E",
                returnKeyType: "search",
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: "#EEEEEE",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                },
                textInput: {
                  backgroundColor: "#EEEEEE",
                  height: 50,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: "#333333",
                  borderWidth: 0,
                },
                listView: {
                  backgroundColor: "#FFFFFF",
                  borderRadius: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                },
              }}
            />
          </View>

          {/* ---------------------- Pickup Times ---------------------- */}
          <SafeAreaView style={styles.pickupTimesContainer}>
            {/* Header with Label and Add Button */}
            <View style={styles.pickupTimesHeader}>
              <Text style={styles.pickupTimesLabel}>Pickup times:</Text>
              <IconButton
                icon={() => (
                  <FontAwesomeIcon
                    size={30}
                    icon={faPlusCircle}
                    color={"#6B6BE1"}
                  />
                )}
                onPress={openDatePicker}
              />
            </View>

            {/* Grouped Pickup Times Section */}
            <SafeAreaView style={styles.pickupTimesGridContainer}>
              {groupPickupTimesByDate().map((group) => (
                <View key={group.date} style={styles.pickupTimeGroup}>
                  {/* Date Label */}
                  <Text style={styles.pickupDateLabel}>{group.date}:</Text>

                  {/* Times Grid */}
                  <View style={styles.pickupTimesGrid}>
                    {group.times.map((timeStr) => {
                      const start = dayjs(timeStr, 'YYYY-MM-DD HH:mm').format('HH:mm');
                      const end = dayjs(timeStr, 'YYYY-MM-DD HH:mm').add(15, 'minute').format('HH:mm');
                      const timeRange = `${start} - ${end}`;

                      return (
                        <View key={timeStr} style={styles.pickupTimeItem}>
                          <Text style={styles.pickupTimeText}>{timeRange}</Text>
                          <IconButton
                            icon={() => (
                              <FontAwesomeIcon
                                size={16}
                                icon={faTimes}
                                color={"#FFFFFF"}
                              />
                            )}
                            style={styles.deletePickupTimeButton}
                            onPress={() => removePickupTime(timeStr)}
                            accessibilityLabel="Delete Pickup Time"
                            accessibilityHint="Removes this pickup time from the list"
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}

              {/* If no pickup times are added */}
              {pickupTimes.length === 0 && (
                <Text style={styles.noPickupTimesText}>No pickup times added.</Text>
              )}
            </SafeAreaView>
          </SafeAreaView>

          {/* ---------------------- Picture Upload ---------------------- */}
          {imageuri ? (
            <View style={styles.uploadedImagePreviewContainer}>
              <Image
                source={{ uri: imageuri }}
                style={styles.uploadedImagePreview}
              />
            </View>
          ) : null}

          <View style={styles.imageUploadButtonContainer}>
            <Button icon="camera" mode="outlined" onPress={pickImage}>
              Upload a picture of your donation
            </Button>
          </View>

          {/* ---------------------- Cancel and Post Donation Buttons ---------------------- */}
          <View style={styles.cancelOrPostDonationContainer}>
            <Button
              mode="contained"
              style={styles.cancelDonationButton}
              onPress={openCancelModal}
            >
              Cancel Donation
            </Button>
            <Button
              mode="contained"
              style={styles.postDonationButton}
              onPress={postDonation}
            >
              Post Donation
            </Button>
          </View>

          {/* ---------------------- Confirm Cancellation Modal ---------------------- */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isCancelModalVisible}
            onRequestClose={closeCancelModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Confirm Cancellation</Text>
                <Text style={styles.modalMessage}>
                  Are you sure you want to cancel this donation?
                  This action cannot be undone.
                </Text>
                <View style={styles.modalButtons}>
                  <Button
                    mode="outlined"
                    onPress={closeCancelModal}
                    style={styles.modalCancelButton}
                    textColor="black"
                  >
                    No
                  </Button>
                  <Button
                    mode="contained"
                    onPress={confirmCancelDonation}
                    style={styles.modalConfirmButton}
                  >
                    Yes, Cancel
                  </Button>
                </View>
              </View>
            </View>
          </Modal>

          {/* ---------------------- Disclaimer ---------------------- */}
          <Text style={styles.expirationDisclaimer}>
            Please note that donation posts expire 1 week after latest pickup time.
          </Text>
        </ScrollView>

        {/* ---------------------- Single Modal for Date and Time Picker ---------------------- */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalStep !== 'none'}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Close Button */}
              <Button
                mode="contained-tonal"
                style={styles.closePickupTimeModalButton}
                onPress={closeModal}
              >
                Close
              </Button>

              {/* Conditional Rendering based on modalStep */}
              {modalStep === 'date' && (
                <View style={{ width: '100%', alignItems: 'center' }}>

                  {/* Instruction Text */}
                  <Text style={styles.instructionText}>
                    Please select a date
                  </Text>

                  {/* Calendar Component for Date Selection */}
                  <Calendar
                    onDayPress={(day) => {
                      setDate(dayjs(day.dateString));
                      console.log("Date selected:", day.dateString);
                    }}
                    markedDates={{
                      [date.format('YYYY-MM-DD')]: { selected: true, selectedColor: '#6B6BE1' },
                    }}
                    style={styles.calendar}
                    theme={{
                      selectedDayBackgroundColor: '#6B6BE1',
                      todayTextColor: '#6B6BE1',
                      disabledDayTextColor: '#d9e1e8', // Customize disabled dates color
                    }}
                    minDate={dayjs().format('YYYY-MM-DD')} // Disable past dates
                    maxDate={dayjs().add(14, 'day').format('YYYY-MM-DD')} // Disable dates beyond 2 weeks
                    disableAllTouchEventsForDisabledDays={true} // Prevent interaction with disabled dates
                  />

                  {/* Add Availability For Date Selected Button */}
                  <Button
                    mode="contained"
                    buttonColor="#6B6BE1"
                    style={styles.addPickupTimeButton}
                    onPress={handleDateSelect}
                  >
                    Add availability for date
                  </Button>
                </View>
              )}

              {modalStep === 'time' && (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  {/* Instruction Text */}
                  <Text style={styles.instructionText}>
                    Please select a pickup time range
                  </Text>
                  
                  {/* Start Time Picker */}
                  <Text style={styles.pickerLabel}>Start Time:</Text>
                  <Dropdown
                    style={styles.timePickerDropdown}
                    placeholderStyle={styles.pickupDropdownPlaceholder}
                    selectedTextStyle={styles.pickupDropdownSelectedText}
                    data={startTimeSlots.map(slot => ({ label: slot, value: slot }))}
                    labelField="label"
                    valueField="value"
                    placeholder="Start Time"
                    value={selectedStartTime}
                    onChange={handleStartTimeChange}
                  />
                  
                  {/* End Time Picker */}
                  <Text style={styles.pickerLabel}>End Time:</Text>
                  <Dropdown
                    style={styles.timePickerDropdown}
                    placeholderStyle={styles.pickupDropdownPlaceholder}
                    selectedTextStyle={styles.pickupDropdownSelectedText}
                    data={endTimeSlots.map(slot => ({ label: slot, value: slot }))}
                    labelField="label"
                    valueField="value"
                    placeholder="End Time"
                    value={selectedEndTime}
                    onChange={handleEndTimeChange}
                  />
                  
                  {/* Add Availability Button */}
                  <Button
                    mode="contained"
                    buttonColor="#6B6BE1"
                    style={styles.addPickupTimeButton}
                    onPress={addPickupTime}
                  >
                    Add Availability
                  </Button>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DonatePage;
