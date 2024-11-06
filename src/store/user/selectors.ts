import { RootState } from "../store";

export const userSelector = (state: RootState) => state.user;
export const userDonationsSelector = (state: RootState) => state.user.donations;
export const userReservationsSelector = (state: RootState) =>
  state.user.reservations;
export const firstNameSelector = (state: RootState) => state.user.firstName;
export const locationSelector = (state: RootState) => state.user.location;
