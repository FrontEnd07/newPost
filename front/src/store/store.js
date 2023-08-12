import { configureStore } from "@reduxjs/toolkit";
import addTrackerAdminReducer from "./Reducers/Main/AddTrackerAdmin";
import loginPageReducer from "./Reducers/LoginPage";
import addressReducer from "./Reducers/Main/Address";
import trackerReducer from "./Reducers/Main/Tracker";
import headerReducer from "./Reducers/Header";
import orderReducer from "./Reducers/Order";

export const store = configureStore({
    reducer: {
        showHeaderSidebar: headerReducer,
        sign: loginPageReducer,
        address: addressReducer,
        tracker: trackerReducer,
        order: orderReducer,
        adminAddTracker: addTrackerAdminReducer
    },
    devTools: true
})

window.store = store;