import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"


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
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("Update Display API RESPONSE ", response);


            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const user = response.data.data
            localStorage.setItem("user", JSON.stringify(user))

            return user
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err.message
            )
        }
    }
)


export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async ({ token, formData}, { rejectWithValue }) => {
        console.log(formData)
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("Update PROFILEEE API RESPONSE ", response);


            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data.updatedUserDetails.image
                ? response.data.updatedUserDetails.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

            const updatedUser = {
                ...response.data.updatedUserDetails,
                image: userImage,
            }


            localStorage.setItem("user", JSON.stringify(updatedUser))

            return updatedUser
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error.message
            )
        }
    }
)



export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async ({ token, formData }, { rejectWithValue }) => {

        try {
            const response = await apiConnector(
                "POST",
                CHANGE_PASSWORD_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log("CHANGE_PASSWORD_API RESPONSE:", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }


        } catch (error) {
            console.log("CHANGE_PASSWORD_API ERROR:", error)
            return rejectWithValue(error?.response?.data?.message)
        }
    }
)

export const deleteProfile = createAsyncThunk(
    "profile/deleteProfile",
    async ({ token, navigate }, { dispatch, rejectWithValue }) => {

        try {
            const response = await apiConnector(
                "DELETE",
                DELETE_PROFILE_API,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log("DELETE_PROFILE_API RESPONSE:", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Profile Deleted Successfully")

            localStorage.removeItem("user")

            // logout bhi yahin handle karenge
            dispatch(logout(navigate))

            return response.data
        } catch (error) {
            console.log("DELETE_PROFILE_API ERROR:", error)
            toast.error("Could Not Delete Profile")

            return rejectWithValue(error.message)
        }
    }
)