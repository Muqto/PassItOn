import { Item } from '../store/slice';
import axios from "axios";
// require("dotenv").config();

const LOCALHOST = "http://10.0.0.28:6006/";
const API = axios.create({ baseURL: LOCALHOST });

export const getUser = (getUserReq: GetUserReq): Promise<UserRes> => API.post("user/getuser", { data : getUserReq });
export const addUser = (addUserReq: AddUserReq): Promise<UserRes> => API.post("user/adduser", { data : addUserReq });

export type AddUserReq = {
    _id: String | undefined,
    email: String,
    firstName: String,
    lastName: String,
}

export type GetUserReq = {
    _id: String
}

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