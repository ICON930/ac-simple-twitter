import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";


// 更新個人資料名字跟介紹
export const editTextInfo = async (token, id, { name, introduction }) => {
  try {
    const response = await axios.put(
      `${authURL}/users/${id}`,
      {
        name,
        introduction
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Failed to edit text info", error);
    throw error;
  }
};

// 上傳個人照片跟背景
export const uploadFiles = async (token, id, { avatar, cover }) => {
  const formData = new FormData();
  if (avatar) {
    formData.append('avatar', avatar);
  }
  if (cover) {
    formData.append('cover', cover);
  }
  try {
    const response = await axios.put(
      `${authURL}/users/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Failed to upload files", error);
    throw error;
  }
};