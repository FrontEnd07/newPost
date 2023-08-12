import { $authHost } from "../../index"
import { toast } from "react-toastify";
import {
    disabledAC,
    trackerAC,
    metaAC,
    loadingAC
} from "../../../store/Reducers/Main/Tracker";


// Функция для обработки успешного ответа сервера
const handleSuccessResponse = (data, dispatch) => {
    if (data.status) {
        toast.success(data.message);
        dispatch(trackerAC(data.body.data));
        dispatch(metaAC(data.body.meta));
        dispatch(loadingAC(false));
    }
};

export const postAddTrackerApi = (payload) => async (dispatch, getState) => {
    let { disabled } = getState().tracker
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.post(`auth/tracker`, payload)
        handleSuccessResponse(data, dispatch);
        dispatch(disabledAC(!disabled));
    } catch (e) {
        dispatch(loadingAC(false));
        dispatch(disabledAC(!disabled))
        if (e.response.data.hasOwnProperty('errors')) {
            for (var key in e.response.data.errors) {
                toast.error(e.response.data.errors[key][0])
            }
        }
        console.log(e.message)
    }
}

export const deleteTrackerApi = (payload) => async (dispatch) => {
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.delete(`auth/tracker`, { data: payload })
        handleSuccessResponse(data, dispatch);
    } catch (e) {
        console.log(e.message)
    }
}

export const getTrackerApi = (payload = '') => async (dispatch) => {
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.get(`auth/tracker${payload}`)
        handleSuccessResponse(data, dispatch);
    } catch (e) {
        console.log(e.message)
    }
}