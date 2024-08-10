import { createSlice } from "@reduxjs/toolkit"

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requests: []
    },
    reducers: {
        sendRequest: (state, action) => {
            console.log(action);
            state.requests.push(action.payload);
        },
    }
});

export const { sendRequest } = requestSlice.actions;
export default requestSlice.reducer;