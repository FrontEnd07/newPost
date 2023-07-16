import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: null,
}

const loginPageReducer = createSlice({
    name: 'loginPageReducer',
    initialState,
    reducers: {
        loginAC(state, action) {
            state.login = action.payload
        }
    }
})

export const {
    loginAC,
} = loginPageReducer.actions
export default loginPageReducer.reducer