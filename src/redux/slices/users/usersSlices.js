import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";

// ****** Actions ******* // 

// --------------------------------------//
//        ---     Register Action    --- //
// --------------------------------------//
export const registerUserAction = createAsyncThunk('users/register', 
async (user, {rejectWithValue, getState, dispatch})=>{
    //config
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    //http call
    try {
        const {data} = await axios.post(`${baseUrl}/api/users/register`, 
        user, config)
        return data;

    } catch (error) {
        //!error && !error.response
        if(!error.response){
            //error from frontend if any
            throw error;
        } 
        else{
            //error from backend
            return rejectWithValue(error?.response?.data);
        }
    }
});

// --------------------------------------//
//        ---     Login Action    --- //
// --------------------------------------//

export const userLoginAction = createAsyncThunk('users/login', 
async (userData, {rejectWithValue, getState, dispatch})=>{
    //config
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //http call
    try {
        const {data} = await axios.post(`${baseUrl}/api/users/login`, 
        userData, config);
        //save user into local storage
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        //!error && !error.response
        if(!error?.response){
            //error from frontend if any
            throw error;
        } 
        else{
            //error from backend
            return rejectWithValue(error?.response?.data);
        }
    }
})

//get user from local storage and place it into store 
const userLoginFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


// ****** Slices ******* // 
// --------------------------------------//
//        ---     Register Slice     --- //
// --------------------------------------//
const usersSlices = createSlice({
    name: 'users',
    initialState:{
        userAuth : userLoginFormStorage,
    },
    //redux's object method
    extraReducers: (builder)=>{
        //register
        builder.addCase(registerUserAction.pending, (state, action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //login
        builder.addCase(userLoginAction.pending, (state, action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(userLoginAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.userAuth = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(userLoginAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})






export default usersSlices.reducer;
