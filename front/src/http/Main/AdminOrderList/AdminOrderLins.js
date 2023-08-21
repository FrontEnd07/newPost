import { $authHost } from "../..";
import { listAC, metaAC, loadingAC } from "../../../store/Reducers/Main/AdminOrderList";

export const getAdminOrderListApi = (payload = "") => async dispatch => {
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.get(`auth/admin/user${payload}`);
        if (data.status) {
            dispatch(listAC(data.body.data))
            dispatch(metaAC(data.body.meta))
        }
        dispatch(loadingAC(false))
    } catch (e) {
        console.log('test', e.message);
    }
}

export const deleteAdminOrderApi = (payload) => async dispatch => {
    try {
        dispatch(loadingAC(true))
        const { data } = await $authHost.delete(`auth/admin/user`, { data: payload })
        if (data.status) {
            dispatch(listAC(data.body.data))
            dispatch(metaAC(data.body.meta))
        }
        dispatch(loadingAC(false));
    } catch (e) {
        console.log(e.message)
    }
}