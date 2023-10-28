import axios from "axios";

const authURL =
  "http://twitter-api-dev.ap-northeast-1.elasticbeanstalk.com/api";

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
    console.error("[Signin Failed]:", error);
    return { success: false };
  }
};

//前台註冊
export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
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
    console.error("[Signup Failed]: ", error);
    return error;
  }
};
