import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//重新編輯個人資料
export const editPage = async(token, id, {name, introduction, avatar, cover}) => {
    try {
        const response = await axios.put(`${authURL}/users/${id}`, {
            name,
            introduction,
            avatar,
            cover
        },
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })


        const data = response.data;
        return data
    } catch (error) {
        console.log("editChange is Fail", error);
    }
}
