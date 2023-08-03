import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";


//action to redirect
const resetCreateAction = createAction('post/create-reset');
// --------------------------------------//
//          ---       actions        --- //
// --------------------------------------// 

//create post action
export const createPostAction = createAsyncThunk('post/created', async (post,
    { rejectWithValue, getState, dispatch }) => {

    //get the token of user
    const user = getState()?.users;
    const { userAuth } = user;
    //config
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`,
        }
    }

    try {
        //form data
        const formData = new FormData();
        formData.append('title', post?.title);
        formData.append('description', post?.description);
        formData.append('category', post?.category);
        formData.append('image', post?.image);
        //http call
        const { data } = await axios.post(`${baseUrl}/api/post`, formData, config);
        //dispatch reset action to redirect 
        dispatch(resetCreateAction());
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

//fetch all posts
export const fetchPostsAction = createAsyncThunk('post/list', async ( posts,
    { rejectWithValue, getState, dispatch }) => {

    try {
        //http call
        const { data } = await axios.get(`${baseUrl}/api/post`,);
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

// --------------------------------------//
//          ---       Slices         --- //
// --------------------------------------// 
const postSlices = createSlice({
    name: 'posts',
    initialState: {},
    extraReducers: (builder) => {
        //post create
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        });
        //reset action 
        builder.addCase(resetCreateAction, (state, action)=>{
            state.isCreated = true;
        })
        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postCreated = action?.payload;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch posts
        builder.addCase(fetchPostsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
})


export default postSlices.reducer;