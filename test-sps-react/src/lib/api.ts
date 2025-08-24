import axios from "axios";
import { ApiError, handleApiError } from "./api-errors.ts";
import { JwtManager } from "../utils/jwtManager.ts";


export const backendURL = process.env.BACKEND_URL ?? "http://localhost:3001/";
const timeoutApiRequest = 10000;
const jwtManager = new JwtManager();


export const apiPublic = axios.create({
  baseURL: backendURL,
  timeout: timeoutApiRequest,
});

export const apiPrivate = axios.create({
  baseURL: backendURL,
  timeout: timeoutApiRequest,
});

apiPrivate.interceptors.request.use(
  async (config) => {
    if (config.headers.Authorization) {
      return config;
    }

    const token = jwtManager.getTokenFromCookies();
    
    if (!token) {
      throw new ApiError("No authentication token found");
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => handleApiError(error)
);