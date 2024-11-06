import axios from "axios";
import { LOCALHOST_IP } from "../../env";

// const LOCALHOST = "http://10.0.0.28:6006/"; // iOS Emulator
// const LOCALHOST = "http://10.0.2.2:6006"; // Android Emulator
const LOCALHOST = LOCALHOST_IP
const API = axios.create({ baseURL: LOCALHOST });

export default API;
