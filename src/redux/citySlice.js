import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
    name: "city", 
    initialState: false,
    reducers: {
        addCity: (city, action) => {
            // console.log(action.payload)
            return action.payload
        }
    }
})

export const { addCity } = citySlice.actions

export default citySlice.reducer