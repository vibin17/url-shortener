import axios from "axios";
import { SignInResponse } from "../models/models";

export const API_URL = 'http://79.143.31.216'
export const API = axios.create({
    baseURL: API_URL
})

API.interceptors.request.use((config) => {
    const access = `Bearer ${localStorage.getItem('access_token')}`
    config.headers = {
        Authorization: access
    }
    return config
})

API.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 /*&& error.config*/ && !error.config?._isRetry) {
        try {
            const params = new URLSearchParams()
            params.append('username', localStorage.getItem('username')?? '')
            params.append('password', localStorage.getItem('password')?? '')
            const response = await axios.post<SignInResponse>(`${API_URL}/login`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            localStorage.setItem('access_token', response.data.access_token)
            return API.request(originalRequest)
        }
        catch (error) {
            console.log('Пользователь не авторизован')
        }
    }
    throw error
})
