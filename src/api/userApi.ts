import API from "./apiInstance";
import { LatLng, Region } from 'react-native-maps';
import { Item, Reservation } from '../store/user/slice';
import { ItemCoord } from '../store/Items/slice';
import { DateType } from 'react-native-ui-datepicker';

export const addTokenToAPI = (token: string) =>
  (API.defaults.headers.common = { Authorization: "Bearer " + token });

export const getUser = (): Promise<UserRes> => API.get("user/getuser")
  .then(res => 
    {console.log('Response from user/getuser', res);
      return res
    })
  .catch(e => {return e});

export const getUserInfoById = (userId: String): Promise<UserRes> => API.post("user/getUserInfoById", {data: userId})
.then(res => 
  {console.log('Response from user/getUserInfoById', res);
    return res
  })
.catch(e => {return e});

export const addUser = (addUserReq: AddUserReq): Promise<UserRes | void> =>
  API.post("user/adduser", { data: addUserReq })
    .then(res => {console.log('Response from user/adduser', res)})
    .catch(e => console.error(e));
    
export const getOrAddUser = (): Promise<UserRes> =>
  API.post("user/getoradduser")
    .then((res) => {
      console.log("Response from user/getoradduser", res);
      return res;
    })
    .catch((e) => {
      return e;
    });

export const uploadDonation = (
  uploadDonationReq: UploadDonationReq
): Promise<ItemRes> =>
  API.post("item/uploadDonation", { data: uploadDonationReq })
    .then((res) => {
      console.log("Response from item/uploadDonation", res);
      return res;
    })
    .catch((e) => {
      return e;
    });

export const getUserById = (userId: string): Promise<UserRes> =>
  API.get(`user/getuserbyid/${userId}`);

export const getItemsCoord = (
  currentLocation: LatLng
): Promise<getItemsCoordRes> =>
  API.post("item/getitemscoord", { data: currentLocation });
  
export const getItemsByIds = (itemIds: string[]): Promise<GetItemsByIdsRes> =>
  API.post("item/itemsbyids", { data: itemIds });

export const deleteItem = (itemId: string): Promise<void> => {
  return API.delete(`/item/${itemId}`);
}

export const updateItemStatus = (itemId: string, itemStatus: number): Promise<Item> => {
  return API.post(`/item/updateStatus`, { itemId, itemStatus });
}
export const updateItemTransactionStatus = (itemId: string, transactionStatus: number): Promise<Item> => {
  return API.post(`/item/updateTransactionStatus`, { itemId, transactionStatus });
}
export type UploadDonationReq = {
  userId: string;
  itemName: string;
  itemType: string;
  description: string;
  postedTime: string;
  expirationTime: string;
  itemStatus: number;
  isRequest: boolean;
  location: Region | LatLng;
  pickupLocationText: string;
  pickupTimes: DateType[];
  reservationInfo: Reservation;
  imageDownloadUrl: string;
};

export type ItemRes = {
  data: {
    _id: string;
    userId: string;
    itemName: string;
    itemType: string;
    description: string;
    postedTime: string;
    expirationTime: string;
    itemStatus: number;
    location: Region;
    reservationInfo: Reservation;
  };
};

export type AddUserReq = {
  firstName: String;
  lastName: String;
};

export type GetUserReq = {
  id: string;
};

export type DonorDetails = {
  _id: String;
  email: String;
  firstName: String;
  lastName: String;
  rating: Number;
}

export type GetItemsByIdsRes = {
  data: {
    items: Item[];
  };
};

export type getItemsCoordRes = {
  data: {
    itemsCoords: ItemCoord[];
  };
};
export type UserRes = {
  data:
  {
    _id: String,
    email: String,
    firstName: String,
    lastName: String,
    rating: Number
    reservations: Item[],
    donations: Item[]
  }
}
