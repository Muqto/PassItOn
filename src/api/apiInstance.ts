import axios from "axios";

// const LOCALHOST = "http://10.0.0.28:6006/"; // iOS Emulator
const LOCALHOST = "http://10.0.2.2:6006"; // Android Emulator
const API = axios.create({ baseURL: LOCALHOST });

export default API;
