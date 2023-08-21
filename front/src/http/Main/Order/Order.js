import { $authHost } from "../..";
import 'moment/locale/ru';
import moment from "moment";
import { toast } from "react-toastify";
import {
    orderAC,
    metaAC,
    loadingAC,
    disabledAC
} from "../../../store/Reducers/Order";

const handleSuccessResponse = (data, dispatch) => {
    if (data.status) {
        toast.success(data.message);
    }
};

export const postOrderApi = (payload) => async (dispatch, getState) => {
    let { disabled } = getState().order
    try {
        const { data } = await $authHost.post(`auth/order`, payload);
        handleSuccessResponse(data, dispatch);
        dispatch(orderAC(data.body.data.map(el => ({ ...el, date: moment(el.date).locale('ru').format("DD MMMM YYYY") }))))
        dispatch(metaAC(data.body.meta))
        dispatch(disabledAC(!disabled));
    } catch (e) {
        console.log(e.message)
    }
}

export const getOrderapi = (payload = "") => async dispatch => {
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.get(`auth/order${payload}`)
        if (data.status) {
            dispatch(orderAC(data.body.data.map(el => ({ ...el, date: moment(el.date).locale('ru').format("DD MMMM YYYY") }))))
            dispatch(metaAC(data.body.meta))
            dispatch(loadingAC(false));
        }
    } catch (e) {
        console.log(e.message)
    }
}