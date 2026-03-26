import { createSlice } from "@reduxjs/toolkit";
import { updateDisplayPicture } from "../../services/operations/SettingsAPI";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    error: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateDisplayPicture.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateDisplayPicture.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                localStorage.setItem("user", JSON.stringify(action.payload))
            })
            .addCase(updateDisplayPicture.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setUser } = profileSlice.actions
export default profileSlice.reducer