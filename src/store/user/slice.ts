<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addUserLocationReducer, addUserReducer, updateUserDonations } from './reducers'
import { Region } from 'react-native-maps'
=======
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addUserLocationReducer,
  addUserReducer,
  updateUserDonations,
} from "./reducers";
import { getOrAddUser } from "../../api/userApi";
import { LatLng, Region } from "react-native-maps";
>>>>>>> 8fe6857211188d71a166f1baa7b3d015d4f0870e

export interface Reservation {
  userId: String;
  isReserved: Boolean;
  startTime: String;
  expirationTime: String;
  pickUpDate: String;
  itemId: any;
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
}

export interface UserState {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  donations: Item[];
  reservations: Item[];
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
<<<<<<< HEAD
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
=======
>>>>>>> 8fe6857211188d71a166f1baa7b3d015d4f0870e
  },
});

// Action creators are generated for each case reducer function
<<<<<<< HEAD
export const { addUserAction, addUserLocationAction, updateUserDonationAction, setToken, clearToken } = userSlice.actions;
=======
export const {
  addUserAction,
  addUserLocationAction,
  updateUserDonationAction,
} = userSlice.actions;
>>>>>>> 8fe6857211188d71a166f1baa7b3d015d4f0870e

export default userSlice.reducer;
