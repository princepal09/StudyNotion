import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { categories } from "../apis"

const { CATEGORIES_API} = categories

// fetching the available course categories
export const fetchCourseCategories = async() =>{
    let result = []
    try{
        const response = await apiConnector("GET",  CATEGORIES_API)
        console.log("COURSE CATEGORIES API RESPONSE..........", response)
        if(!response?.data?.success){
            throw new Error("Could not fetch Course Categories")
        }

        result = response?.data?.allCategories

      
    }catch(err){
        console.log("COURSE CATEGORY API RESPONSE", err.message)
        toast.error(err.message);

    }
    return result;
}