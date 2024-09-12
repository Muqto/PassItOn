import { useState, useRef } from "react";
import { View, Text, SafeAreaView, ScrollView, Modal } from "react-native";
import { Button, TextInput } from "react-native-paper";
import useItem from "../../Hooks/Item";
import styles from "./Styles";
import { userSelector } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import {Dropdown} from 'react-native-element-dropdown';
import {GooglePlacesAutocomplete, GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../../env';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const DonatePage = () => {
  const { donate } = useItem();
  const userState = useSelector(userSelector);
  const [donationItemName, setDonationItemName] = useState("");
  const [donationItemDescription, setDonationItemDescription] = useState("");
  const [category, setCategory] = useState("");
  const categoryList = [
    { label: "Food", value: "Food",},
    { label: "Clothes", value: "Clothes",},
    { label: "Furniture", value: "Furniture",},
    { label: "Book", value: "Book",},
    { label: "Stationery",value: "Stationery",},
    { label: "Other",value: "Other",},
  ];
  const [location, setLocation] = useState({latitude: 0, longitude: 0})
  const [date, setDate] = useState(dayjs())
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)
  const [pickupTimes, setPickupTimes] = useState<DateType[]>([])
  const [pickupLocationText, setPickupLocationText] = useState("")
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const openDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  }
  const handleClosePickupTimeModal = () => {
    setIsDateTimePickerVisible(false);
  }
  const handleDateChange = (params:any) => {
    setDate(params.date);
  }
  const addPickupTime = () => {
    setIsDateTimePickerVisible(false);
    setPickupTimes([...pickupTimes, date])
  }
  const postDonation = () => {
    donate(
      userState._id,
      donationItemName,
      category,
      donationItemDescription,
      dayjs().toString(),
      dayjs().add(7, 'day').toString(),
      0,
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
      }
    )
    setDonationItemName("");
    setDonationItemDescription("");
    setCategory("");
    setPickupTimes([])
    setDate(dayjs())
    setLocation({latitude: 0, longitude: 0})
    ref.current?.setAddressText("")
  }
  return (
    <View style={styles.donatePageContainer}>
      <Text style={styles.donatePageHeader}>Donate an item</Text>
      <ScrollView style={styles.donatePageInfoContainer} >
      <TextInput
        label="Item name *"
        value={donationItemName}
        onChangeText={(text) => setDonationItemName(text)}
        style={styles.donationItemTitle}
        mode="flat"
        activeUnderlineColor="black"
      />
      <TextInput
        label="Description *"
        multiline
        value={donationItemDescription}
        onChangeText={(text) => setDonationItemDescription(text)}
        style={styles.donationItemDescription}
        mode="flat"
        activeUnderlineColor="black"
      />
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
      <View style={styles.locationInputContainer}>
        <GooglePlacesAutocomplete 
          ref = {ref}
          placeholder="Location *" 
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language:'en'
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setLocation({latitude:details?.geometry?.location?.lat || 0, longitude:details?.geometry?.location?.lng || 0});
            setPickupLocationText(ref.current?.getAddressText() || "");
          }}
        />
      </View>
      <SafeAreaView style={styles.pickupTimesContainer}>
        <Text numberOfLines={1} style={styles.pickupTimesPreview}>
          {pickupTimes.length != 0 ? pickupTimes.map((pickupTime) => <Text>{pickupTime?.toString()}, </Text>) : <Text>Pickup times *</Text>}
        </Text>
        <View style={styles.openDateTimePickerButtonContainer}>
        <Button 
          mode="contained"
          buttonColor="#6B6BE1"
          style={styles.openDateTimePickerButton}
          onPress={openDateTimePicker}>
        +
        </Button>
        </View>
      </SafeAreaView>
      <Modal animationType="slide" visible={isDateTimePickerVisible}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center', padding: 20,}}>  
            <Button 
              mode="contained-tonal"
              style={styles.closePickupTimeModalButton}
              onPress={handleClosePickupTimeModal}>
            Close Modal
            </Button>
            <Text style={{paddingBottom: 40, fontSize: 18, textAlign: "center"}}>Please select a pickup time during which you are available for 15 minutes</Text>
            <DateTimePicker 
              mode="single" 
              timePicker 
              date={date} 
              minDate={dayjs()}
              maxDate={dayjs().add(7, 'day')}
              onChange={handleDateChange}
            />
            <Button 
              mode="contained"
              buttonColor="#6B6BE1"
              style={styles.addPickupTimeButton}
              onPress={addPickupTime}>
            Add Availability
            </Button>
          </View>
        </View>
      </Modal>
      <Button
        mode="contained"
        buttonColor="#6B6BE1"
        style={styles.postDonationButton}
        onPress={postDonation} 
      >
        Donate
      </Button>
      <Text> Please note that your donation posting will expire in 1 week. </Text>
      </ScrollView>
    </View>
  );
};

export default DonatePage;
