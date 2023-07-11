import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
}

const headerReducer = createSlice({
    name: 'headerReducer',
    initialState,
    reducers: {
        showAC(state, action) {
            state.show = action.payload
        }
    }
})

export const {
    showAC,
} = headerReducer.actions
export default headerReducer.reducer