import axios from "axios";

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

export { $authHost, $host }