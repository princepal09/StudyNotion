import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    singupData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setSignupData(state, action) {
            state.singupData = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
})


export const { setToken, setLoading, setSignUpData } = authSlice.actions;
export default authSlice.reducer;