import { PayloadAction } from "@reduxjs/toolkit";
import { Region } from "react-native-maps";
import { Item, Reservation, UserState } from "./slice";

export const addUserReducer = (state: UserState, action: PayloadAction<UserState>) => {
    // https://stackoverflow.com/questions/66807172/what-exactly-should-you-return-from-a-redux-slice-reducer
    // explains how to update the state in store properly and what not to do
    return {...state, ...action.payload} 
}

export const addUserLocationReducer = (state: UserState, action: PayloadAction<Region>) => {
  state.location = action.payload
}

export const updateUserDonations = (
  state: UserState,
  action: PayloadAction<Item>
) => {
  state.donations.push(action.payload);
};

export const updateUserReservations = (
  state: UserState,
  action: PayloadAction<Reservation>
) => {
  state.reservations.push(action.payload);
};

export const updateUserReservationTransactionStatus = (
  state: UserState,
  action: PayloadAction<{ itemId: string; transactionStatus: number }>
) => {
  const { itemId, transactionStatus } = action.payload;

  // Find the reservation in the user's state using the itemId
  const reservation = state.reservations.find(
    (reservation) => reservation.itemId === itemId
  );

  // If the reservation is found, update its transactionStatus
  if (reservation) {
    reservation.transactionStatus = transactionStatus;
  }
};


export const deleteUserDonation = (
  state: UserState,
  action: PayloadAction<string>
) => {
  state.donations = state.donations.filter(
    (donation) => donation._id !== action.payload
  );
}

export const updateUserItemStatusReducer = ( 
  state: UserState,
  action: PayloadAction<{ itemId: string, itemStatus: number }>
) => {
  state.donations = state.donations.map((donation) => {
    if (donation._id === action.payload.itemId) {
      donation.itemStatus = action.payload.itemStatus;
    }
    return donation;
  });
}

export const updateUserTransactionStatusReducer = ( 
  state: UserState,
  action: PayloadAction<{ itemId: string, transactionStatus: number }>
) => {
  state.donations = state.donations.map((donation) => {
    if (donation._id === action.payload.itemId) {
      donation.reservationInfo.transactionStatus = action.payload.transactionStatus;
    }
    return donation;
  });
}