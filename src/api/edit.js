import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//重新編輯個人資料
export const editPage = async(token, id, formData) => {
    try {
        const response = await axios.put(`${authURL}/users/${id}`, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + token,
            },
        })

        const data = response.data;
        console.log('formData:',formData)
        console.log('response.data:',response.data)
        return data
    } catch (error) {
        console.log("editChange is Fail", error);
                console.log('formData:',formData)
    }
}