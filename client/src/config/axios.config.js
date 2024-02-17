import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3000/api",
  // withCredentials: true,
  //   headers: {
  //     "Content-Type": "application/json",
  //   }
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
