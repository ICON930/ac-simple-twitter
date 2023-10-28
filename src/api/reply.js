import axios from "axios";

const authURL =
  "http://twitter-api-dev.ap-northeast-1.elasticbeanstalk.com/api";

//主頁取得所有推文
export const getUserReplyTweet = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/replied_tweets`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log("[getUserReplyTweet is Fail]", error);
    console.log("Error Details:", error.response?.data || error.message);
    throw error;
  }
};
