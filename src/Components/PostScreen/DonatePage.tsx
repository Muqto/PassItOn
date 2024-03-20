import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import useItem from "../../Hooks/Item";
import styles from "./Styles";
import { userSelector } from "../../store/user/selectors";
import { useSelector } from "react-redux";

const DonatePage = () => {
  const { donate } = useItem();
  const userState = useSelector(userSelector);
  const [donationItemName, setDonationItemName] = useState("");
  const [donationItemDescription, setDonationItemDescription] = useState("");
  return (
    <View style={styles.donatePageContainer}>
      <Text style={styles.donatePageHeader}>Donate an item</Text>
      <TextInput
        label="Item name"
        value={donationItemName}
        onChangeText={(text) => setDonationItemName(text)}
        style={styles.donationItemTitle}
        mode="flat"
        activeUnderlineColor="black"
      />
      <TextInput
        label="Description"
        multiline
        value={donationItemDescription}
        onChangeText={(text) => setDonationItemDescription(text)}
        style={styles.donationItemDescription}
        mode="flat"
        activeUnderlineColor="black"
      />
      <Button
        mode="contained"
        buttonColor="#6B6BE1"
        style={styles.postDonationButton}
        onPress={() =>
          donate(
            userState._id,
            donationItemName,
            "Item Type",
            donationItemDescription,
            "posted time here",
            "expiration time here",
            0,
            { lattitude: 0, longitude: 0, geoHash: "geohash location" },
            {
              userId: userState._id,
              isReserved: false,
              startTime: "N/A",
              expirationTime: "N/A",
              pickUpDate: "N/A",
            }
          )
        } 
      >
        Donate
      </Button>
    </View>
  );
};

export default DonatePage;
