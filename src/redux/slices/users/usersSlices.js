import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


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
        const {data} = await axios.post('http://localhost:5000/api/users/register', 
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

//slice
const usersSlices = createSlice({
    name: 'users',
    initialState:{
        userAuth: "login",
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
    }
})

export default usersSlices.reducer;
