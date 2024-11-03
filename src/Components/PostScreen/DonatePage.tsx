import { useState, useRef, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Modal, Image } from "react-native";
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
import * as ImagePicker from 'expo-image-picker';
import {ref as firebaseStorageRef, getDownloadURL, uploadBytes} from "firebase/storage";
import { storage } from "../../config/firebase";

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
  const placesRef = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [imageuri, setImageUri] = useState<string | undefined>(undefined);

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

  const getDistance = (lat1:number, lon1:number, lat2:number, lon2:number) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  const deg2rad = (deg:number) => {
    return deg * (Math.PI/180)
  }

  const postDonation = async () => {
    // calculate distance from user to new donation
    const distance = getDistance(userState.location?.latitude || 0, userState.location?.longitude || 0, location.latitude || 0, location.longitude || 0)
    const storageRef = firebaseStorageRef(storage, "image");

    // upload image blob to firebase storage
    const fileName = `${userState._id}_${Date.now()}`
    const donationImageStorageRef = firebaseStorageRef(storageRef, `${fileName}`);
    // get blob for imageuri 
    const blobRes = await fetch(imageuri!);
    const blob = await blobRes.blob();

    // upload image to firebase, store uri in mongoDB
    await uploadBytes(donationImageStorageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).catch(e => console.log(e));

    const imageDownloadUrl = await getDownloadURL(donationImageStorageRef);
    
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
      },
      distance,
      imageDownloadUrl,
    )
    setDonationItemName("");
    setDonationItemDescription("");
    setCategory("");
    setPickupTimes([])
    setDate(dayjs())
    setLocation({latitude: 0, longitude: 0})
    placesRef.current?.setAddressText("")
    setImageUri(undefined);
  }

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
          ref = {placesRef}
          placeholder="Location *" 
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language:'en'
          }}
          fetchDetails={true}
          keepResultsAfterBlur={true}
          onPress={(data, details = null) => {
            setLocation({latitude:details?.geometry?.location?.lat || 0, longitude:details?.geometry?.location?.lng || 0});
            setPickupLocationText(placesRef.current?.getAddressText() || "");
          }}
        />
      </View>
      <SafeAreaView style={styles.pickupTimesContainer}>
        <Text numberOfLines={1} style={styles.pickupTimesPreview}>
          {pickupTimes.length != 0 ? pickupTimes.map((pickupTime, i) => <Text key={`${pickupTime}_${i}`}>{pickupTime?.toString()}, </Text>) : <Text>Pickup times *</Text>}
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
      {
      imageuri !== undefined ? 
      <View style={styles.uploadedImagePreviewContainer}>
        <Image source={{uri: imageuri}} style={styles.uploadedImagePreview} />
      </View> : 
      <View></View>
      }
      <View style={styles.imageUploadButtonContainer}>
        <Button
          icon="camera"
          mode="outlined"
          onPress={pickImage}
        >
          Upload a picture of your donation
        </Button>
      </View>
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
