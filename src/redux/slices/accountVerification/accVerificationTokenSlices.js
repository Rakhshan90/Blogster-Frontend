import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";


// --------------------------------------//
//          ---       actions        --- //
// --------------------------------------// 
export const sendAccountVerificationTokenAction = createAsyncThunk('account/send-token', 
async(email, {rejectWithValue, getState, dispatch})=>{
    //get the token of user
    const user = getState()?.users;
    const {userAuth} = user;
   //config
   const config = {
    headers: {
        Authorization : `Bearer ${userAuth?.token}`,
    }
   }
    //http call
    try {
        const {data} = await axios.post(`${baseUrl}/api/users/generate-verify-email-token`, 
        {},
        config,
        );
        return data;
    } catch (error) {
        if(!error?.response){
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);
    }
})

const accVerificationSlices = createSlice({
    name: 'accountVerification',
    initialState: {},
    extraReducers: builder=>{
        builder.addCase(sendAccountVerificationTokenAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(sendAccountVerificationTokenAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.token = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(sendAccountVerificationTokenAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
})


export default accVerificationSlices.reducer;