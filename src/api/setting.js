import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";


//取得ID資料
export const getUserInfo =async(token, id)=>{
    try{
        const response = await axios.get(`${authURL}/users/${id}`,{
            headers:{
                Authorization:"Beaer" +token,
            }
        })
        const data = response.data
        return data
    }catch(error){
        console.log('getUserid is Fail',error)
    }
} 
//重新設定帳戶資料
export const settingPage = async(token,id, {account ,name, email, password,passwordCheck })=>{
    try{
        const response =await axios.put(`${authURL}/users/${id}`, {
            account,
            name,
            email,
            password,
            passwordCheck
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = response.data;
    return data;
    }catch(error){
        console.log("[settingChange is Fail]",error)
        return{success:false}
    }
}