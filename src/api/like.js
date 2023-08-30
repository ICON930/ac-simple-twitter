import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//主頁取得所有推文
export const getUserLikeTweet = async (token, id) => {
  console.log("ID is:", id);
    try{
        const response = await axios.get(`${authURL}/users/${id}/likes`,{
            headers:{
                Authorization:"Bearer " + token,
            }
        })
        const{data} = response
        console.log('Response data:', data);
        return data
    }catch(error){
        console.log('[getUserLikeTweet is Fail]',error)
        throw error
    }
}