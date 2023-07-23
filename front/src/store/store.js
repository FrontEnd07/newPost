import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./Reducers/Header";
import loginPageReducer from "./Reducers/LoginPage";
import addressReducer from "./Reducers/Main/Address";
import trackerReducer from "./Reducers/Main/Tracker";

export const store = configureStore({
    reducer: {
        showHeaderSidebar: headerReducer,
        sign: loginPageReducer,
        address: addressReducer,
        tracker: trackerReducer
    },
    devTools: true
})

window.store = store;