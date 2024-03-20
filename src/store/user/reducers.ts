import { PayloadAction } from "@reduxjs/toolkit";
import { Item, UserState } from "./slice";

export const addUserReducer = (
  state: UserState,
  action: PayloadAction<UserState>
) => {
  // https://stackoverflow.com/questions/66807172/what-exactly-should-you-return-from-a-redux-slice-reducer
  // explains how to update the state in store properly and what not to do
  return { ...action.payload };
};

export const updateUserDonations = (
  state: UserState,
  action: PayloadAction<Item>
) => {
  state.donations.push(action.payload);
};
