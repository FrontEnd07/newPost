import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./Reducers/Header";

export const store = configureStore({
    reducer: {
        showHeaderSidebar: headerReducer
    },
    devTools: true
})

window.store = store;