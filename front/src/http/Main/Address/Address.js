import { $authHost, $host } from "../../index"
import { toast } from "react-toastify";
import { disabledAC, addressAC } from "../../../store/Reducers/Main/Address/Address";

export const postAddressApi = (payload) => async (dispatch, getState) => {
    let { disabled } = getState().address;
    try {
        const { data } = await $authHost.post(`auth/address`, payload)
        toast.success(data.message)
        dispatch(addressAC(data.body))
        dispatch(disabledAC(!disabled))
    } catch (e) {
        dispatch(disabledAC(!disabled))
        if (e.response.status === 422) {
            for (var key in e.response.data.errors) {
                toast.error(e.response.data.errors[key][0])
            }
        }
        console.log(e.message)
    }
}

export const deleteAddressApi = (id) => async dispatch => {
    try {
        const { data } = await $authHost.delete(`auth/address/${id}`);
        if (data.body.length > 0) {
            dispatch(addressAC(data.body))
        } else {
            dispatch(addressAC(null))
        }
    } catch (e) {
        console.log(e.message)
    }
}

export const optionsAddressApi = () => async dispatch => {
    try {
        const { data } = await $authHost.options(`auth/address`)
        if (data.body.length > 0) {
            dispatch(addressAC(data.body))
        }
    } catch (e) {
        console.log(e.message)
    }
}