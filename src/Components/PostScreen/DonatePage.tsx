import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import useItem from "../../Hooks/Item";
import styles from "./Styles";
import { userSelector } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import {Dropdown} from 'react-native-element-dropdown';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../../env';

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
  const postDonation = () => {
    donate(
      userState._id,
      donationItemName,
      category,
      donationItemDescription,
      "posted time here",
      "expiration time here",
      0,
      false,
      location,
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
  }
  return (
    <View style={styles.donatePageContainer}>
      <Text style={styles.donatePageHeader}>Donate an item</Text>
      {/** TODO: Add checks for required fields */}
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
          placeholder="Location *" 
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language:'en'
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setLocation({latitude:details?.geometry?.location?.lat || 0, longitude:details?.geometry?.location?.lng || 0})
          }}
        />
      </View>
      <Text> TODO: ADD PICKUP TIME DATETIME PICKER HERE</Text>
      <Text> TODO: ADD IMAGE UPLOAD OPTION HERE</Text>
      <Button
        mode="contained"
        buttonColor="#6B6BE1"
        style={styles.postDonationButton}
        onPress={postDonation} 
      >
        Donate
      </Button>
    </View>
  );
};

export default DonatePage;
