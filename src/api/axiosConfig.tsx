import axios from 'axios';
import {AxiosInstance, InternalAxiosRequestConfig} from 'axios'


const apiKey: string | undefined = '' //ключ

const axiosInstance: AxiosInstance = axios.create({
    baseURL: '', //тут наш базовый URL
})

axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        if (apiKey){
            config.headers['Authorization'] = `Token ${apiKey}`
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;
