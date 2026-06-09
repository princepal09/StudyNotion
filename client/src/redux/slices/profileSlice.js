import { createSlice } from "@reduxjs/toolkit";
import {
    updateDisplayPicture,
    updateProfile,
    changePassword,
    deleteProfile
} from "../../services/operations/SettingsAPI"

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

            // =========================
            // updateDisplayPicture
            // =========================
            .addCase(updateDisplayPicture.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateDisplayPicture.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(updateDisplayPicture.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // =========================
            // updateProfile
            // =========================
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // =========================
            // changePassword
            // =========================
            .addCase(changePassword.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false
                // password change me user update nahi hota usually
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // =========================
            // deleteProfile
            // =========================
            .addCase(deleteProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteProfile.fulfilled, (state) => {
                state.loading = false
                state.user = null   // profile delete → user clear
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setUser } = profileSlice.actions
export default profileSlice.reducer