import axios from "axios";
import { ApiError, handleApiError } from "./api-errors.ts";


export const backendURL = process.env.BACKEND_URL ?? "http://localhost:3001/";
const timeoutApiRequest = 10000;


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

    const tokenResponse = await axios.get("/api/token", {
      withCredentials: true,
    });
    if (tokenResponse.status !== 200) {
      throw new ApiError("Failed to get access token");
    }

    const { token } = tokenResponse.data;
    config.headers.Authorization = `Bearer ${token.accessToken}`;

    return config;
  },
  (error) => handleApiError(error)
);