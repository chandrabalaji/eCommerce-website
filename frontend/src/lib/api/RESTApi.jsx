import axios from "axios";
import { SERVER_URL } from "../../constant";

const axiosConfig = axios.create({
  baseURL: SERVER_URL,
});

// interceptor for set token
function setupAxios() {
  axiosConfig.interceptors.request.use(
    function (config) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling errors like unauthorized (401)
  axiosConfig.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Check if the response status is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        // window.location.href = ROUTE_PATHS.LOGIN
        window.location.href = "#/login";
      }

      // Return the error so it can be handled later
      return Promise.reject(error);
    }
  );

  return axiosConfig;
}

export const Axios = setupAxios();
