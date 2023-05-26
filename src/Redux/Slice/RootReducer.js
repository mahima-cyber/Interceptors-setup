import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";



const RootReducer = combineReducers({
    users: UserSlice
})

export default RootReducer;