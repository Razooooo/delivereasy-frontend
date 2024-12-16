import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8989",
    headers: {
        'Content-Type': 'application/json',
    }, 
});

instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error('Erreur API:', error.response ? error.response.data: error.message);
        return Promise.reject(error);
    }
);

export default instance