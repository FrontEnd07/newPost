import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: null,
    disabled: false
}

const loginPageReducer = createSlice({
    name: 'loginPageReducer',
    initialState,
    reducers: {
        loginAC(state, action) {
            state.login = action.payload
        },
        disabledAC(state, action) {
            state.disabled = action.payload
        }
    }
})

export const {
    loginAC,
    disabledAC
} = loginPageReducer.actions
export default loginPageReducer.reducer