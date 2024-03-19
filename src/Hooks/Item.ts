import { uploadDonation } from "../api/donationApi";
import { LocationState, Reservation } from "../store/user/slice";

const useItem = () => {
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
      //   const user = res.data;
      //   dispatch(addUserAction(user));
    } catch (error) {
      console.log("error uploading donation", error);
    }
  };
  return { donate };
};

export default useItem;
