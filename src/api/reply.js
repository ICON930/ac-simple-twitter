import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//主頁取得所有推文
export const getUserReplyTweet = async (token, id) => {
  console.log("ID is:", id);
    try{
        const response = await axios.get(`${authURL}/users/${id}/replied_tweets`,{
            headers:{
                Authorization:"Bearer " + token,
            }
        })
        const{data} = response
        console.log('Response data:', data);
        return data
    }catch(error){
        console.log('[getUserReplyTweet is Fail]',error)
        console.log('Error Details:', error.response?.data || error.message);
        throw error
    }
}