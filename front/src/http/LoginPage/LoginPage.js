import { $host } from "../index"
import { toast } from "react-toastify";
import { loginAC } from "../../store/Reducers/LoginPage/LoginPage";

export const postSignUpApi = (payload) => async dispatch => {
    try {
        const { data } = await $host.post(`auth/register`, payload)
        toast.success(data.message)
        localStorage.setItem('jwtToken', data.token)
        localStorage.setItem('about', JSON.stringify(data.user))
        dispatch(loginAC(data.user))

    } catch (e) {
        if (e.response.status === 422) {
            for (var key in e.response.data.errors) {
                toast.error(e.response.data.errors[key][0])
            }
        }
        console.log(e.message);
    }
};

export const postSignInApi = (payload) => async dispatch => {
    try {
        console.log(payload)
    } catch (e) {
        toast.error(e.message)
    }
}