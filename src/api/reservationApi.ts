import axios from "axios";

// require("dotenv").config();

// const LOCALHOST = "http://10.0.0.28:6006/"; // iOS Emulator
const LOCALHOST = "http://10.0.2.2:6006"; // Android Emulator
const API = axios.create({ baseURL: LOCALHOST });

export const addTokenToAPI = (token: string) =>
    (API.defaults.headers.common = { Authorization: "Bearer " + token });

export type ReservationData = {
    userId: string;
    isReserved: boolean;
    startTime: string; // ISO string
    expirationTime: string; // ISO string
    pickUpDate: string; // ISO string
  };
  
  export type CreateReservationResponse = {
    success: boolean;
    reservation: any; // Replace with actual reservation type if available
  };
  
  export const createReservation = (
    itemId: string,
    reservationData: ReservationData
  ): Promise<CreateReservationResponse> => {
    return API.post("/reservation/create", { itemId, reservationData })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error creating reservation:", error);
        throw error;
      });
  };
  
  export default {
    createReservation,
  };