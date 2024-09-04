import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";
import useItem from "../../Hooks/Item";
import styles from "./Styles";
import { userSelector } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import {Dropdown} from 'react-native-element-dropdown';

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
  ];
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
      {latitude: 45.5048, longitude: -73.5772},
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
