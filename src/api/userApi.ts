import axios from "axios";
// require("dotenv").config();

const LOCALHOST = "http://10.0.0.28:6006/";
const API = axios.create({ baseURL: LOCALHOST });

export const getUser = (getUserReq: GetUserReq) => API.post("user/getuser", { data : getUserReq });
export const addUser = (addUserReq: AddUserReq) => API.post("user/adduser", { data : addUserReq });

export type AddUserReq = {
    _id: String | undefined,
    email: String,
    firstName: String,
    lastName: String,
}

export type GetUserReq = {
    _id: String
}