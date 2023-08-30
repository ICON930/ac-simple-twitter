import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

//主頁取得所有推文
export const getTweets = async (token) => {
    try{
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
export const postTweet = async(token,description)=>{
    try{
        const response =await axios.post(`${authURL}/tweets` ,{
            description: description
          },{
            headers:{
                Authorization:"Bearer "+ token
            }
        })
        const {data} =response
        return data
    }catch(error){
        console.log('[post Newtweet is Fail]', error)
        throw error
    }
}

//取得特定貼文
export const getUserTweet = async(token,tweetid)=>{
    try{const response =await axios.get(`${authURL}/tweets/${tweetid}`,{
        headers:{
            Authorization:"Bearer " +token
        }
    })
    const {data} =response
    return data
    }catch(error){
    console.log('[getUserTweet is Fail]',error)
    throw error
    }
}

//取得推文的回覆
export const getTweetReply =async(token,tweetid) =>{
    try{
    const response =await axios.get(`${authURL}/tweets/${tweetid}/replies`,{
        headers:{
            Authorization:"Bearer "+ token
        }
    })
    const {data} =response
    return data
    }catch(error){
    console.log('[get tweetReply is Fail]', error)
    throw error
    }
}


//回覆推文
export const ReplyTweet = async (token, comment, tweetid) => {
    try {
      const response = await axios.post(
        `${authURL}/tweets/${tweetid}/replies`,
        { comment }, 
        {
          headers: {
            Authorization: "Bearer " + token
          },
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.log("[replyTweet is fail]", error);
      throw error;
    }
  };

//使用者查看特定使用者貼文
    export const getUserIdTweet = async (token, id) => {
        try{
            const response =await axios.get(`${authURL}/users/${id}/tweets`,{
                headers:{
                    Authorization:"Bearer "+ token
                }
            })
            const {data} =response
            return data
        }catch(error){
            console.log('[getUserIdTweet is Fail]', error)
            throw error
        }
    }
