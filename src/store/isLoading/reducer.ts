import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "./slice";

export const setSessionReducer = (state: LoadingState, action: PayloadAction<Boolean>) => {
    // https://stackoverflow.com/questions/66807172/what-exactly-should-you-return-from-a-redux-slice-reducer
    // explains how to update the state in store properly and what not to do
    state.isSessionLoading = action.payload
}