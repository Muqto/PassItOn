import { LatLng } from "react-native-maps";

export type HomeProps = {
  userId: string;
  firstName: string;
  lastName: string;
};

export type DonationProps = {
  itemName: string;
  expirationTime: string;
  itemType: string;
  description: string;
  itemStatus: number;
  location: LatLng;
  pickupLocationText: string | undefined;
  userId: string;
  fullName: string;
  imageDownloadUrl: string | undefined;
};

export type ReservationProps = {
  itemName: string;
  expirationTime: string;
  itemType: string;
  description: string;
  itemStatus: number;
  location: LatLng;
  pickupLocationText: string | undefined;
  userId: string;
  fullName: string;
  imageDownloadUrl: string | undefined;
};
