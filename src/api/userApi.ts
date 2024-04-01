import { Item, LocationState, Reservation } from "../store/user/slice";
import axios from "axios";
import { LOCALHOST_IP } from "../../env";
// require("dotenv").config();

const LOCALHOST = LOCALHOST_IP;
const API = axios.create({ baseURL: LOCALHOST });

export const addTokenToAPI = (token: string) =>
  (API.defaults.headers.common = { Authorization: "Bearer " + token });
export const getUser = (): Promise<UserRes> => API.get("user/getuser");
export const addUser = (addUserReq: AddUserReq): Promise<UserRes> =>
  API.post("user/adduser", { data: addUserReq });
export const getOrAddUser = (): Promise<UserRes> =>
  API.post("user/getoradduser");

export const uploadDonation = (
  uploadDonationReq: UploadDonationReq
): Promise<ItemRes> =>
  API.post("item/uploadDonation", { data: uploadDonationReq });

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

export type AddUserReq = {
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
