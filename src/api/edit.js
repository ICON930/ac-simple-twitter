import axios from "axios";

const authURL =
  "http://twitter-api-dev.ap-northeast-1.elasticbeanstalk.com/api";

//重新編輯個人資料
export const editPage = async (token, id, formData) => {
  try {
    const response = await axios.put(`${authURL}/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.log("editChange is Fail", error);
  }
};
