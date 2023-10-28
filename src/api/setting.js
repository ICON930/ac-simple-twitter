import axios from "axios";

const authURL =
  "http://twitter-api-dev.ap-northeast-1.elasticbeanstalk.com/api";

//取得ID資料
export const getUserInfo = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = response.data;

    return data;
  } catch (error) {
    console.log("getUserid is Fail", error);
  }
};
//重新設定帳戶資料
export const settingPage = async (
  token,
  id,
  { account, name, email, password, checkPassword }
) => {
  console.log("Setting API Call:", token, id, account, name, email);
  try {
    const response = await axios.put(
      `${authURL}/users/${id}`,
      {
        account,
        name,
        email,
        password,
        checkPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = response.data;
    console.log("[setting is OK]");
    return data;
  } catch (error) {
    console.log("[settingChange is Fail]", error);
    return { error };
  }
};
