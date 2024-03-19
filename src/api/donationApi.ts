import { Item, LocationState, Reservation } from "../store/user/slice";
import axios from "axios";
// require("dotenv").config();

const LOCALHOST = "http://10.0.0.28:6006/";
const API = axios.create({ baseURL: LOCALHOST });

export const uploadDonation = (
  uploadDonationReq: UploadDonationReq
): Promise<ItemRes> =>
  API.post("item/uploadDonation", { data: uploadDonationReq });

export type AddUserReq = {
  _id: String | undefined;
  email: String;
  firstName: String;
  lastName: String;
};

export type GetUserReq = {
  _id: String;
};

export type UserRes = {
  data: {
    _id: String;
    email: String;
    firstName: String;
    lastName: String;
    rating: Number;
    reservations: Item[];
    donations: Item[];
  };
};

export type UploadDonationReq = {
  userId: String;
  itemName: String;
  itemType: String;
  description: String;
  postedTime: String;
  expirationTime: String;
  itemStatus: Number;
  location: LocationState;
  reservationInfo: Reservation;
};

export type ItemRes = {
  data: {
    _id: String;
    userId: String;
    itemName: String;
    itemType: String;
    description: String;
    postedTime: String;
    expirationTime: String;
    itemStatus: Number;
    location: LocationState;
    reservationInfo: Reservation;
  };
};
