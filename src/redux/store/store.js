import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/users/usersSlices';
import categorySlice from "../slices/category/categorySlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categorySlice,
    },
});

export default store;