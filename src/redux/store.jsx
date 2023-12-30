import {configureStore} from "@reduxjs/toolkit"
import TokenReducer from "./token";
import UserReducer from "./user"

const Store= configureStore({
    name:"Token",
    reducer:{
        Token:TokenReducer,
        User:UserReducer
    }
})

export default Store;