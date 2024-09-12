import { Region } from "react-native-maps";
import { useDispatch } from "react-redux";
import { uploadDonation } from "../api/userApi";
import { LatLng } from "react-native-maps";
import {
  Reservation,
  updateUserDonationAction,
} from "../store/user/slice";
import { ItemCoord } from "../store/Items/slice";
import { addItemsCoordsAction } from '../store/Items/slice';
import { DateType } from "react-native-ui-datepicker";

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
    pickupLocationText: string,
    pickupTimes: DateType[],
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
        pickupLocationText: pickupLocationText,
        pickupTimes: pickupTimes,
        reservationInfo: reservationInfo,
      };
      const res = await uploadDonation(userReq);
      dispatch(updateUserDonationAction({...res.data, distance: 0}));
      const newItemCoord:ItemCoord = {_id: res.data._id, location: res.data.location, distance: 0, isRequest: isRequest, isSelected: false}
      dispatch(addItemsCoordsAction([newItemCoord]))
    } catch (error) {
      console.log("error uploading donation", error);
    }
  };
  return { donate };
};

export default useItem;
