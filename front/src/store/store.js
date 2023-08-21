import { configureStore } from "@reduxjs/toolkit";
import addTrackerAdminReducer from "./Reducers/Main/AddTrackerAdmin";
import adminOrderList from "./Reducers/Main/AdminOrderList";
import loginPageReducer from "./Reducers/LoginPage";
import addressReducer from "./Reducers/Main/Address";
import trackerReducer from "./Reducers/Main/Tracker";
import headerReducer from "./Reducers/Header";
import orderReducer from "./Reducers/Order";

export const store = configureStore({
    reducer: {
        order: orderReducer,
        sign: loginPageReducer,
        address: addressReducer,
        tracker: trackerReducer,
        orderList: adminOrderList,
        showHeaderSidebar: headerReducer,
        adminAddTracker: addTrackerAdminReducer,
    },
    devTools: true
})

window.store = store;