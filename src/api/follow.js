import axios from "axios";

const authURL =
  "http://twitter-api-dev.ap-northeast-1.elasticbeanstalk.com/api";

//取得追隨者清單
export const getFollower = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/followers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log("[getFollower is Fail]", error);
    throw error;
  }
};
//追隨中清單

export const getFollowing = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/followings`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log("[getFollowing is Fail]", error);
    throw error;
  }
};
//追蹤
export const AddFollow = async (token, id) => {
  try {
    console.log(token, id);
    const response = await axios.post(
      `${authURL}/followships`,
      { id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(id);
    console.log("[follow fail]", error);
    throw error;
  }
};
//取消追蹤
export const UnFollow = async (token, id) => {
  try {
    const response = await axios.delete(`${authURL}/followships/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(id);
    console.log("[unFollow fail]", error);
    throw error;
  }
};
