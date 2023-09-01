import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//主頁取得喜歡的所有推文
export const getUserLikeTweet = async (token, id) => {
    try {
        const response = await axios.get(`${authURL}/users/${id}/likes`,{
            headers:{
                Authorization:"Bearer " + token,
            }
        })
        const {data} = response
        return data
    } catch(error) {
        console.log('[getUserLikeTweet is Fail]',error)
        throw error
    }
}

//使用者點擊喜歡的貼文

export const getUserAddLikeTweet = async (token, tweetid) => {
    try {
        const response = await axios.post(`${authURL}/tweets/${tweetid}/like`,{}, 
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
      const {data} = response
      return data
    } catch(error) {
      console.log('[getUserAddLikeTweet is Fail]',error)
      throw error
    }
}
//使用者刪除喜歡的貼文

export const getUserDelLikeTweet = async (token, tweetid) => {
    try {
        const response = await axios.post(`${authURL}/tweets/${tweetid}/unlike`,{},
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
      const {data} = response
      return data
    } catch(error) {
      console.log('[getUserDelLikeTweet is Fail]',error)
      throw error
    }
}
