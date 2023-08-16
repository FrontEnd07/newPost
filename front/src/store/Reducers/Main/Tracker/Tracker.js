import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tracker: [],
    disabled: false,
    meta: [],
    loading: false
}

const trackerReducer = createSlice({
    name: 'trackerReducer',
    initialState,
    reducers: {
        trackerAC(state, action) {
            state.tracker = action.payload
        },
        disabledAC(state, action) {
            state.disabled = action.payload
        },
        metaAC(state, action) {
            state.meta = action.payload
        },
        loadingAC(state, action) {
            state.loading = action.payload
        }
    }
})

export const {
    trackerAC,
    disabledAC,
    metaAC,
    loadingAC
} = trackerReducer.actions
export default trackerReducer.reducer