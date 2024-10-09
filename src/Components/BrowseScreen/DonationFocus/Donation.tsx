import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Item } from '../../../store/user/slice';

interface DonationPageProps {
  item?: Item; 
}

const DonationFocus: React.FC<DonationPageProps> = ({ item }) => {
  const [donation, setDonation] = useState<Item>({
    _id: "",
    itemName: "",
    itemType: "",
    distance: 0,
    description: "",
    postedTime: "",
    expirationTime: "",
    itemStatus: 0,
    isRequest: false,
    location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    reservationInfo: {
      userId: "",
      isReserved: false,
      startTime: "",
      expirationTime: "",
      pickUpDate: "",
    },
    imageDownloadUrl: "",
    pickupTimes: [],
    pickupLocationText: "",
  });

  useEffect(() => {
    if (item) {
      setDonation(item);
    }
  }, [item]);

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Available";
      case 1:
        return "Reserved";
      case 2:
        return "Expired";
      default:
        return "Unknown";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Donation Text */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Donation</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image */}
        {donation.imageDownloadUrl ? (
          <Image source={{ uri: donation.imageDownloadUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Image not available</Text>
          </View>
        )}

        {/* Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{donation.itemName || "Unnamed Item"}</Text>
          <Text style={styles.category}>{donation.itemType || "Unknown Category"}</Text>
          <Text style={styles.description}>
            {donation.description || "No description provided."}
          </Text>

          <View style={styles.details}>
            <Text>Status: {getStatusText(donation.itemStatus)}</Text>
            <Text>
              Pickup location: {donation.pickupLocationText || "Location not provided"}
            </Text>
            <Text>
              Donor: {donation.reservationInfo.userId || "Unknown Donor"}{" "}
              {donation.reservationInfo.isReserved ? "(Reserved)" : ""}
            </Text>
          </View>

          <View style={styles.dates}>
            <Text>Posted: {donation.postedTime || "Unknown"}</Text>
            <Text>Expires: {donation.expirationTime || "Unknown"}</Text>
          </View>

          <Button
            mode="contained"
            style={styles.reserveButton}
            onPress={() => {
              // Logic for reserving the donation
            }}
          >
            Reserve donation
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  placeholder: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  placeholderText: {
    color: "#999",
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  category: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  dates: {
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: "#6B6BE1",
    paddingVertical: 10,
  },
});

export default DonationFocus;
