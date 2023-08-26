import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

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

export const register = async ({ account, name, email, password, passwordCheck }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/signup`, {
      account,
      name,
      email,
      password,
      passwordCheck,
    });
    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Signup Failed]: ', error);
    return { success: false };
  }
};