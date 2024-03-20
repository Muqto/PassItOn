import { useDispatch } from "react-redux";
import { uploadDonation } from "../api/userApi";
import {
  LocationState,
  Reservation,
  updateUserDonationAction,
} from "../store/user/slice";

const useItem = () => {
  const dispatch = useDispatch();
  const donate = async (
    userId: String,
    itemName: String,
    itemType: String,
    description: String,
    postedTime: String,
    expirationTime: String,
    itemStatus: Number,
    location: LocationState,
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
        location: location,
        reservationInfo: reservationInfo,
      };
      const res = await uploadDonation(userReq);
      dispatch(updateUserDonationAction(res.data));
    } catch (error) {
      console.log("error uploading donation", error);
    }
  };
  return { donate };
};

export default useItem;
