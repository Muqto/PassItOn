import { Item } from "../store/user/slice";
import axios from "axios";
// require("dotenv").config();

const LOCALHOST = "http://10.0.2.2:6006/";
const API = axios.create({ baseURL: LOCALHOST });

export const addTokenToAPI = (token: string) => API.defaults.headers.common = {'Authorization': 'Bearer ' + token};
export const getUser = (): Promise<UserRes> => API.get("user/getuser");
export const addUser = (addUserReq: AddUserReq): Promise<UserRes> => API.post("user/adduser", { data : addUserReq });
export const getOrAddUser = (): Promise<UserRes> => API.post("user/getoradduser");

export type AddUserReq = {
    firstName: String,
    lastName: String,
}

export type GetUserReq = {
  _id: String;
};

export type UserRes = {
  data: {
    _id: String;
    email: String;
    firstName: String;
    lastName: String;
    rating: Number;
    reservations: Item[];
    donations: Item[];
  };
};
