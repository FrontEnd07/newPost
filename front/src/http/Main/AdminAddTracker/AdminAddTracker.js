import { $authHost, $host } from "../../index"
import 'moment/locale/ru';
import moment from "moment";
import { toast } from "react-toastify";
import { disabledAC, trackerAdminAC, loadingAC, metaAC } from "../../../store/Reducers/Main/AddTrackerAdmin";


const handleSuccessResponse = (data, dispatch) => {
    if (data.status) {
        toast.success(data.message);
    }
};

export const getUserApi = (payload) => async dispatch => {
    try {
        const { data } = await $authHost.get(`auth?name=${payload}`)
        if (data.body.length > 0) {
            return data
        } else {
            return null
        }
    } catch (e) {
        console.log(e.message)
    }
}

export const postAdminAddTrackerApi = (payload) => async (dispatch) => {
    try {
        dispatch(disabledAC(true))
        const { data } = await $authHost.post(`auth/admin`, payload)
        handleSuccessResponse(data, dispatch)
        dispatch(disabledAC(false))
    } catch (e) {
        for (var key in e.response.data.errors) {
            toast.error(e.response.data.errors[key][0])
        }
        dispatch(disabledAC(false))
        console.log(e.message)
    }
}

export const getAdminTrackerApi = (payload = "") => async (dispatch) => {
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.get(`auth/admin${payload}`)
        if (data.status) {
            dispatch(trackerAdminAC(data.body.item))
            dispatch(metaAC(data.body.meta))
            dispatch(loadingAC(false))
        }
    } catch (e) {
        console.log(e.message)
    }
}