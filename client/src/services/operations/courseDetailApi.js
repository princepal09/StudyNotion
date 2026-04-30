


// fetching the available course categories

import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"

export const fetchCourseCategories = async() =>{
    let result = []
    try{
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE CATEGORIES API RESPONSE..........", response)
        if(!response?.data?.success){
            throw new Error("Could not fetch Course Categories")
        }

        result = response?.data?.data

      
    }catch(err){
        console.log("COURSE CATEGORY API RESPONSE", err.message)
        toast.error(err.message);

    }
    return result;
}