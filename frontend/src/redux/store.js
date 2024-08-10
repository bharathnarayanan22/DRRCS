import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./requestSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        request: requestSlice,
        user: userSlice,
    },
});

export default store;