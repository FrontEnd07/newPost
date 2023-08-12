import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    disabled: false,
    trackerAdmin: [],
    meta: [],
    loading: false
}

const AddTrackerAdminReducer = createSlice({
    name: 'AddTrackerAdminReducer',
    initialState,
    reducers: {
        trackerAdminAC(state, action) {
            state.trackerAdmin = action.payload
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
    trackerAdminAC,
    disabledAC,
    metaAC,
    loadingAC
} = AddTrackerAdminReducer.actions
export default AddTrackerAdminReducer.reducer