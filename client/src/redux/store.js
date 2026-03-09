import { combineReducers, configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    auth : authReducer
})

export const store = configureStore({
    reducer : rootReducer
})

export default rootReducer;