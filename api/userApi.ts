import axios from "axios";
// require("dotenv").config();

const API = axios.create({ baseURL: "http://localhost:6006/" });

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