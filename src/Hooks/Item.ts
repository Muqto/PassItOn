import { Region } from "react-native-maps";
import { useDispatch } from "react-redux";
import { uploadDonation } from "../api/userApi";
import { LatLng } from "react-native-maps";
import {
  Reservation,
  updateUserDonationAction,
} from "../store/user/slice";

const useItem = () => {
  const dispatch = useDispatch();
  const donate = async (
    userId: string,
    itemName: string,
    itemType: string,
    description: string,
    postedTime: string,
    expirationTime: string,
    itemStatus: number,
    isRequest: boolean,
    location: Region | LatLng,
    reservationInfo: Reservation
  ) => {
    try {
      const userReq = {
        userId: userId,
        itemName: itemName,
        itemType: itemType,
        description: description,
        postedTime: postedTime,
        expirationTime: expirationTime,
        itemStatus: itemStatus,
        isRequest: isRequest,
        location: location,
        reservationInfo: reservationInfo,
      };
      const res = await uploadDonation(userReq);
      dispatch(updateUserDonationAction({...res.data, distance: 0}));
    } catch (error) {
      console.log("error uploading donation", error);
    }
  };
  return { donate };
};

export default useItem;
