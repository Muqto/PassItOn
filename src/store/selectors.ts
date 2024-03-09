import { RootState } from "./store";

export const userSelector = (state: RootState) => state.user
export const userDonationsSelector = (state: RootState) => state.user.donations