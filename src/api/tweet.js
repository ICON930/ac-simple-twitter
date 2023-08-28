import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//主頁取得所有推文
export const getTweets = async (token) => {
    try{
        console.log('Requesting with token:', token);
        const response = await axios.get(`${authURL}/tweets`,{
            headers:{
                Authorization:"Bearer " + token,
            }
        })
        const{data} = response
        console.log('Response data:', data);
        return data
    }catch(error){
        console.log('[getTweets is Fail]',error)
        throw error
    }
}
//發文
