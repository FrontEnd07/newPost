import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    disabled: false,
    order: [],
    meta: [],
    loading: false
}

const orderReducer = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        disabledAC(state, action) {
            state.disabled = action.payload
        },
        orderAC(state, action) {
            state.order = action.payload
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

    disabledAC,
    orderAC,
    metaAC,
    loadingAC

} = orderReducer.actions
export default orderReducer.reducer