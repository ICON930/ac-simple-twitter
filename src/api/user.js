import axios from "axios";

const baseURL =
  "http://twitter-api-dev.ap-northeast-1.elasticbeanstalk.com/api";

const axiosInstance = axios.create({ baseURL: baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//推薦跟隨
export const getTopUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`${baseURL}/users/?top=10`);
    return data;
  } catch (error) {
    console.error("[Get top users Failed]:", error);
    return error;
  }
};
