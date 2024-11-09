import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addUserLocationReducer,
  addUserReducer,
  deleteUserDonation,
  updateUserDonations,
  updateUserItemStatusReducer,
  updateUserReservations,
  updateUserTransactionStatusReducer,
} from "./reducers";
import { Region } from "react-native-maps";

export interface Reservation {
  _id: string;
  userId: String;
  isReserved: Boolean;
  startTime: String;
  expirationTime: String;
  pickUpDate: String;
  itemId: any;
  transactionStatus?: Number;
}

export interface Item {
  _id: string;
  itemName: string;
  itemType: string;
  distance: number;
  description: string;
  postedTime: string;
  expirationTime: string;
  itemStatus: number;
  isRequest?: boolean;
  location: Region;
  reservationInfo: Reservation;
  imageDownloadUrl?: string;
  pickupTimes?: string[];
  pickupLocationText?: string;
  userId: string;
}

export interface UserState {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  donations: Item[];
  reservations: Reservation[];
  location?: Region;
}

export const mtlRegionCoord: Region = {
  latitude: 45.5019,
  longitude: 73.5674,
  longitudeDelta: 0.01,
  latitudeDelta: 0.01,
};
export const initialUserState: UserState = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  rating: 0,
  donations: [],
  reservations: [],
  location: mtlRegionCoord,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    addUserAction: addUserReducer,
    addUserLocationAction: addUserLocationReducer,
    updateUserDonationAction: updateUserDonations,
    deleteUserDonationAction: deleteUserDonation,
    updateUserReservationAction: updateUserReservations,
    updateUserItemStatusAction: updateUserItemStatusReducer,
    updateUserTransactionStatusAction: updateUserTransactionStatusReducer,
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserAction,
  addUserLocationAction,
  updateUserDonationAction,
  setToken,
  clearToken,
  updateUserReservationAction,
  updateUserItemStatusAction,
  deleteUserDonationAction,
  updateUserTransactionStatusAction
} = userSlice.actions;

export default userSlice.reducer;
