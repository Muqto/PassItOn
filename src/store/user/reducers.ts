import { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./slice";
import { Region } from "react-native-maps";

export const addUserReducer = (state: UserState, action: PayloadAction<UserState>) => {
    // https://stackoverflow.com/questions/66807172/what-exactly-should-you-return-from-a-redux-slice-reducer
    // explains how to update the state in store properly and what not to do
    return {...state, ...action.payload} 
}

export const addUserLocationReducer = (state: UserState, action: PayloadAction<Region>) => {
    state.location = action.payload
}
