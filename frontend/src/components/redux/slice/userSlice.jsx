import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState:{
        isLoggedIn:false,
        userObject: null,
    },
    reducers:{
        updateLoggedIn: (state,action) =>{
            state.isLoggedIn = true;
            state.userObject = action.payload;
        },
        updateLoggedOut: (state) =>{
            state.isLoggedIn = false;
            state.userObject = null;
        },
        updatePremiumUser: (state,action)=>{
            if(state.userObject){
                state.userObject.isPremium = action.payload;
            }
        }
    }
});

export default userSlice;
export const {
    updateLoggedIn,
    updateLoggedOut,
    updatePremiumUser
} = userSlice.actions;
