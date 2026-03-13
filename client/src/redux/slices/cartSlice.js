import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
}

const cartSlice = createSlice({
    name : "cart",
    initialState,

    reducers : {
        setToken(state, action){
            state.token = action.payload
        },
    },  
})


export const {setToken} = cartSlice.actions;
export default cartSlice.reducer;