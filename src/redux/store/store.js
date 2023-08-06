import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from "../slices/category/categorySlice";
import postsReducer from '../slices/posts/postSlices';
import comments from '../slices/comments/commentSlices';

const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        posts: postsReducer,
        comments,
    },
});

export default store;