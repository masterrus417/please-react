import axios from 'axios';
import {AxiosInstance, InternalAxiosRequestConfig} from 'axios'


const apiKey: string | undefined = '1fb726d547d7b6abd5bc733ad8adb053f6715' //ключ

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://92.53.119.132/', //тут наш базовый URL
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
