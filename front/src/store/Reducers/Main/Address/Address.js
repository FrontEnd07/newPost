import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: null,
    disabled: false
}

const addressReducer = createSlice({
    name: 'addressReducer',
    initialState,
    reducers: {
        addressAC(state, action) {
            state.address = action.payload
        },
        disabledAC(state, action) {
            state.disabled = action.payload
        }
    }
})

export const {
    addressAC,
    disabledAC
} = addressReducer.actions
export default addressReducer.reducer