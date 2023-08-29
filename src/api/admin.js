import axios from "axios";

const adminURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

const axiosInstance = axios.create({ adminURL: adminURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//後台登入頁
export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${adminURL}/admin/signin`, {
      account,
      password,
    });
    
    const { token } = data;
    
    if (token) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Admin Signin Failed]:', error);
    return { success: false };
  }
};

//後台主頁
export const adminGetAllTweets = async () => {
  try{
    const {data} = await axiosInstance.get(`${adminURL}/admin/tweets`)
    return data
  } catch (error) {
    console.error('[Admin get all tweets Failed]:', error)
    return error
  }
} 

//後台使用者頁面
export const adminGetAllUsers = async() => {
  try{
    const{data} = await axiosInstance.get(`${adminURL}/admin/users`)
    return data
  } catch (error) {
    console.error('[Admin get all users Failed]:', error)
    return error
  }
}

//後台主頁刪除推文
export const deleteTweet = async (tweetId) => {
  try {
    const { data } = await axiosInstance.delete(`${adminURL}/admin/tweets/${tweetId}`)
    return data
  } catch (error) {
    console.error("[Admin delete tweet failed]:", error);
    return error
  }
};