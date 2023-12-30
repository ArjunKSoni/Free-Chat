import {createSlice} from "@reduxjs/toolkit"

const UserReducer=createSlice({
    name:"User",
    initialState:{
        User:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.User=action.payload;
        },
        removeUser:(state,action)=>{
            state.User=null;
        },
    }
})

export const { addUser,removeUser } = UserReducer.actions;
export default UserReducer.reducer;