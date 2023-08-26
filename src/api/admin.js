import axios from "axios";

const adminURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

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