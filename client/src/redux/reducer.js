import { combineReducers} from '@reduxjs/toolkit'

import authReducer from "../redux/slices/authSlice"
import profileReducer from "../redux/slices/profileSlice"
import cartReducer from "../redux/slices/cartSlice"
import courseReducer from "../redux/slices/courseSlice"


 const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    cart : cartReducer,
    course : courseReducer
})

export default rootReducer