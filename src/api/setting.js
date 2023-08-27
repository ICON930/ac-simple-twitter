import axios from "axios";

const authURL = "https://thawing-beach-07124-5fd4697aa480.herokuapp.com/api";

export const settingPage = async(token,id{account ,name, email, password,passwordCheck })=>{
    try{
        const {data}=await axios.put(`${authURL}api/users/:id`, {
            account,
            name,
            email,
            password,
            passwordCheck
          });
    }catch(error){
        console.log("[settingChange is Fail]",error)
        return{success:false}
    }
}