import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";

//create category action
export const createCategoryAction = createAsyncThunk('category/create', 
async(category, {rejectWithValue, getState, dispatch})=>{
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
        const {data} = await axios.post(`${baseUrl}/api/category`, 
        {
            title: category?.title,
        }, config,
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

//slices
const categorySlices = createSlice({
    name: 'category',
    initialState : {category : 'React Js'},
    extraReducers: builder=>{
        builder.addCase(createCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createCategoryAction.fulfilled, (state, action)=>{
            state.category = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCategoryAction.rejected, (state, action)=>{
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})

export default categorySlices.reducer;