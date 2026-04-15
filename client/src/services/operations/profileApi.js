
import { toast } from "react-hot-toast"
import { profileEndpoints } from "../apis"
const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints
import { apiConnector } from "../apiConnector"

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            })
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

        console.log(
            "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
            response
        )

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data     
        return result

    } catch (err) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", err)
        toast.error("Could Not Get Enrolled Courses")
    } finally {
        toast.dismiss(toastId)
    }
}