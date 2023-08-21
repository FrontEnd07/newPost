import { toast } from "react-toastify";
import { $host, $authHost } from "../index"
import { orderAC } from "../../store/Reducers/Order";
import { addressAC } from '../../store/Reducers/Main/Address';
import { trackerAC } from "../../store/Reducers/Main/Tracker";
import { listAC } from "../../store/Reducers/Main/AdminOrderList";
import { trackerAdminAC } from "../../store/Reducers/Main/AddTrackerAdmin";
import { loginAC, disabledAC } from "../../store/Reducers/LoginPage/LoginPage";

export const postSignUpApi = (payload) => async (dispatch, getState) => {
    let { disabled } = getState().sign;
    try {
        const { data } = await $host.post(`auth/register`, payload)
        toast.success(data.message)
        localStorage.setItem('jwtToken', data.token)
        localStorage.setItem('about', JSON.stringify(data.user))
        dispatch(loginAC(data.user))
        dispatch(disabledAC(!disabled))
    } catch (e) {
        if (e.response.status === 422) {
            for (var key in e.response.data.errors) {
                toast.error(e.response.data.errors[key][0])
            }
        }
        dispatch(disabledAC(!disabled))
        console.log(e.message);
    }
};

export const postSignInApi = (payload) => async (dispatch, getState) => {
    let { disabled } = getState().sign;
    try {
        const { data } = await $host.post(`auth/login`, payload)
        toast.success(data.message)
        localStorage.setItem('jwtToken', data.token)
        localStorage.setItem('about', JSON.stringify(data.user))
        dispatch(loginAC(data.user))
        dispatch(disabledAC(!disabled))
    } catch (e) {
        if (e.response.status === 401) {
            toast.error(e.response.data.message);
        }
        if (e.response.status === 422) {
            for (var key in e.response.data.errors) {
                toast.error(e.response.data.errors[key][0])
            }
        }
        dispatch(disabledAC(!disabled))
        console.log(e.message)
    }
}

export const postLogOutApi = () => async (dispatch, getState) => {
    let { address } = getState().address
    let { order } = getState().order
    let { tracker } = getState().tracker
    let { list } = getState().orderList
    let { trackerAdmin } = getState().adminAddTracker
    try {
        const { data } = await $authHost.post(`auth/logout`)
        if (data.status) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("about");
            if (address) dispatch(addressAC(null))
            if (order.length > 0) dispatch(orderAC([]))
            if (tracker.length > 0) dispatch(trackerAC([]))
            if (list.length > 0) dispatch(listAC([]))
            if (trackerAdmin.length > 0) dispatch(trackerAdminAC([]))
            dispatch(loginAC(false));
        }
    } catch (e) {
        console.log(e.message)
    }
}