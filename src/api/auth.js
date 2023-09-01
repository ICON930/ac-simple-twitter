import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//前台登入
export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/signin`, {
      account,
      password,
    });

    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Signin Failed]:', error);
    return { success: false };
  }
};

//前台註冊
export const register = async ({ account, name, email, password, checkPassword }) => {
  try {
    const { data }  = await axios.post(`${authURL}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
  
    const { token } = data;

    if (token) {
      return { success: true, ...data };
    } 

    return data;
  } catch (error) {
    console.error('[Signup Failed]: ', error);
    return error;
  }
};