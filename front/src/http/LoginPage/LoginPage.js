import { toast } from "react-toastify";
import { $host, $authHost } from "../index"
import { addressAC } from '../../store/Reducers/Main/Address';
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
    try {
        const { data } = await $authHost.post(`auth/logout`)
        if (data.status) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("about");
            if (address) dispatch(addressAC(null))
            dispatch(loginAC(false));
        }
        console.log(data)
    } catch (e) {
        console.log(e.message)
    }
}