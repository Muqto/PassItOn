import API from "./apiInstance";

export type ReservationData = {
    userId: string;
    isReserved: boolean;
    startTime: string;
    expirationTime: string;
    pickUpDate: string;
  };
  
  export type CreateReservationResponse = {
    success: boolean;
    reservation: any; // Replace with actual reservation type
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
  
  export default {
    createReservation,
  };