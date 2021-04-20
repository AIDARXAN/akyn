import axios from "axios";
import {apiURL} from "./configAPI";
import {userLogoutRes} from "./store/acrions/user/actions";
import {store} from "./store/configureStore";


const axiosApi = axios.create({
    baseURL: apiURL.url
});

const errorHandler = error => {
    const invalid_token = "Invalid token.";

    if (!error.response) error = {response: {data: {something_error: "Something error"}}};
    if (!error?.response?.data) error = {response: {data: {network_error: "No internet connection"}}};
    if (error?.response?.data?.detail === invalid_token) store.dispatch(userLogoutRes());

    return Promise.reject(error);
};

axiosApi.defaults.headers.common['Accept-Language'] = "ru"

axiosApi.interceptors.request.use(async config => {
    if (store.getState()?.user?.user?.key) {
        const key = await store.getState().user.user.key;
        config.headers = {
            "Authorization": `Token ${key}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
    }
    return config;
});

axiosApi.interceptors.response.use(config => {
    return config;
}, errorHandler);

export default axiosApi;
