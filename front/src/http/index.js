import axios from "axios";
import { useNavigate } from "react-router-dom";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

$host.interceptors.request.use((config) => {
    config.headers['Accept'] = `application/json`
    return config
})

$authHost.interceptors.request.use((config) => {
    config.headers['Accept'] = `application/json`
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`
    return config
})

$authHost.interceptors.response.use((config) => {
    return config
}, async (error) => {
    if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
    }
})

export { $authHost, $host }