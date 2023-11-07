import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token", 
    initialState: false,
    reducers: {
        addtoken: (token, action) => {
            // console.log(action.payload)
            return action.payload
        }
    }
})

export const { addtoken } = tokenSlice.actions

export default tokenSlice.reducer