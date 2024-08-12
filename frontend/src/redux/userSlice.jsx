import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserName: (state, action) => {
            state.username = action.payload;
          },
        removeToken: (state) => {
            state.token = null;
        }
    }
});

export const {setToken, setUserName, removeToken} = userSlice.actions;

export default userSlice.reducer;