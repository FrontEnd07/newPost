import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    meta: [],
    loading: false
}

const adminOrderListReduser = createSlice({
    name: 'adminOrderListReduser',
    initialState,
    reducers: {
        listAC(state, action) {
            state.list = action.payload
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
    listAC,
    metaAC,
    loadingAC
} = adminOrderListReduser.actions
export default adminOrderListReduser.reducer