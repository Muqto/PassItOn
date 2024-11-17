import axios from "axios";
import { HOST } from "../../env";

const API = axios.create({ baseURL: HOST });

export default API;
