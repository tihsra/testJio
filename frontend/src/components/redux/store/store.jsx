import userSlice from "../slice/userSlice"
import { configureStore } from "@reduxjs/toolkit";


const createStore = () => {
    return configureStore({
         reducer: {
            user: userSlice.reducer
        }
    })
}
export default createStore;