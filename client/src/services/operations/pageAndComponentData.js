import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"




export const getCatalogPageData = async (categoryId) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId : categoryId});
         console.log(response.data.data)
        if (!response?.data?.success) {
            throw new Error("Could not fetch Category Page Data");
        }
        result = response?.data?.data;


    } catch (err) {
        console.log("CATALOG PAGE DATA API ERROR ......", err.message);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;

}