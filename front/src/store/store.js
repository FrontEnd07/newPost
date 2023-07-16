import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./Reducers/Header";
import loginPageReducer from "./Reducers/LoginPage";

export const store = configureStore({
    reducer: {
        showHeaderSidebar: headerReducer,
        sign: loginPageReducer
    },
    devTools: true
})

window.store = store;