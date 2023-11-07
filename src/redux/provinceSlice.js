import { createSlice } from "@reduxjs/toolkit";

const provinceSlice = createSlice({
    name: "province", 
    initialState: false,
    reducers: {
        addProvince: (province, action) => {
            // console.log(action.payload)
            return action.payload
        }
    }
})

export const { addProvince } = provinceSlice.actions

export default provinceSlice.reducer