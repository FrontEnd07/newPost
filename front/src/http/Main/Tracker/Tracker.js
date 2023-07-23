import { $authHost } from "../../index"
import { toast } from "react-toastify";
import {
    disabledAC,
    trackerAC,
    metaAC,
    loadingAC
} from "../../../store/Reducers/Main/Tracker";

export const postAddTrackerApi = (payload) => async (dispatch, getState) => {
    let { disabled } = getState().tracker
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.post(`auth/tracker`, payload)
        if (data.status) {
            toast.success(data.message)
            dispatch(disabledAC(!disabled))
            dispatch(trackerAC(data.body.data))
            dispatch(metaAC(data.body.meta))
            dispatch(loadingAC(false))
        }
    } catch (e) {
        dispatch(disabledAC(!disabled))
        if (e.response.data.hasOwnProperty('errors')) {
            for (var key in e.response.data.errors) {
                toast.error(e.response.data.errors[key][0])
            }
        }
        console.log(e.message)
    }
}

export const getTrackerApi = (payload = '') => async (dispatch) => {
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.get(`auth/tracker${payload}`)
        if (data.status) {
            dispatch(trackerAC(data.body.data))
            dispatch(metaAC(data.body.meta))
            dispatch(loadingAC(false))
        }
    } catch (e) {
        console.log(e.message)
    }
}