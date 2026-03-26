import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints



export const updateDisplayPicture = createAsyncThunk(
    "profile/updateDisplayPicture",
    async ({ token, formData }, { rejectWithValue }) => {
        try {

            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            )

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
            )
            return response.data.data

        } catch (err) {
            console.log(err.message)
            return rejectWithValue(err.message);
        }

    })