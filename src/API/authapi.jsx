import axios from "axios";

const api= "https://free-chat-backend-rbgc5ig92-arjunksoni.vercel.app/";

export const login=async(Email,Password)=>{
    const response=await axios.post(api+"user/login",{Email,Password});
    const data=response.data;
    if(data.token){
        return data.token;
    }
    else{
        alert("User does not exist");
    }
}

export const signup=async(User,Email,Password)=>{
    const response=await axios.post(api+"user/signup",{User,Email,Password});
    const data=response.data;
    if(data.status){
        return data.status;
    }
    else{
        alert("Account not created");
    }
}

export const createchatroom=async(Name)=>{
    const response=await axios.post(api+"chatroom/create",{Name});
    const data=response.data;
    if(data.message){
        console.log(data.message);
        alert("Chatroom Created")
    }
    else{
        alert("Chatroom not created");
    }
}

export const getallchatroom=async()=>{
    const response=await axios.post(api+"chatroom/getallchatroom");
    const data=response.data;
    if(data.chatroom){
        return data.chatroom;
    }
    else{
        alert("Account not created");
    }
}
export const getallmesages=async(id)=>{
    const response=await axios.post(api+"chatroom/getallmesages",{id});
    const data=response.data;
    if(data.messages){
        console.log(data);
        return data.messages;
    }
    else{
        console.log("no message found");
    }
}
