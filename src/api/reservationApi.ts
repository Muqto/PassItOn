import axios from "axios";
import API from "./apiInstance";
import { LOCALHOST_IP } from "../../env";
import { Reservation } from "../store/user/slice";

// require("dotenv").config();

// const LOCALHOST = "http://10.0.0.28:6006/"; // iOS Emulator
const LOCALHOST = "http://10.0.2.2:6006"; // Android Emulator
// const API = axios.create({ baseURL: LOCALHOST });

export const addTokenToAPI = (token: string) =>
    (API.defaults.headers.common = { Authorization: "Bearer " + token });

export type ReservationData = {
    userId: string;
    isReserved: boolean;
    startTime: string;
    expirationTime: string;
    pickUpDate: string;
  };

export type ReservationDetails = {
    itemName: string;
    category: string,
    description: string,
    pickupLocationText: string,
    itemDonor: string,
    imageDownloadUrl: string,
    pickupTime: string,
    startTime: string,
    expirationTime: string,
    transactionStatus: Number
  };
  
  export type CreateReservationResponse = {
    success: boolean;
    reservation: any; // Replace with actual reservation type
  };
  
  export type UpdateUserRatingRes = {
    rating: Number;
  };

  export type UpdateTransactionStatusRes = {
    transactionStatus: Number;
  };

  export const createReservation = (
    itemId: string,
    reservationData: ReservationData
  ): Promise<CreateReservationResponse> => {
    return API.post("reservation/createReservation", { itemId, reservationData })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error creating reservation:", error);
        throw error;
      });
  };

  export type GetReservationDetailsByIdRes = {
    data: ReservationDetails
  }

  export const getReservationsById = (reservationId: string): Promise<GetReservationDetailsByIdRes> => API.post("reservation/getReservationDetailsById", { data : reservationId })
  
  export const submitRating = (userId: String, rating: Number): Promise<UpdateUserRatingRes> => API.post("user/updaterating", { data : {userId, rating} })
  
  export const updateTransactionStatus = (reservationId: String, transactionStatus: Number): Promise<UpdateTransactionStatusRes> => API.post("/reservation/updateReservationTransactionStatus", { data : {reservationId, transactionStatus} })
  
  export default {
    createReservation,
  };