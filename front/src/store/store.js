import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./Reducers/Header";
import loginPageReducer from "./Reducers/LoginPage";
import addressReducer from "./Reducers/Main/Address";

export const store = configureStore({
    reducer: {
        showHeaderSidebar: headerReducer,
        sign: loginPageReducer,
        address: addressReducer
    },
    devTools: true
})

window.store = store;