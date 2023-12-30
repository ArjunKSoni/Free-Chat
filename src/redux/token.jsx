import {createSlice} from "@reduxjs/toolkit"

const TokenReducer=createSlice({
    name:"Token",
    initialState:{
        Token:null
    },
    reducers:{
        add:(state,action)=>{
            state.Token=action.payload;
        },
        remove:(state,action)=>{
            state.Token=null;
        },
    }
})

export const { add,remove } = TokenReducer.actions;
export default TokenReducer.reducer;