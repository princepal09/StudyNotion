import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
}

const profileSlice = createSlice({
    name : "profile",
    initialState,

    reducers : {
        setUser(state, action){
            state.token = action.payload
        },
    },  
})


export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;