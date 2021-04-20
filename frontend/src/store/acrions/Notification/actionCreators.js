import axiosApi from "../../../axiosAPI";
import {
    GET_NOTIFICATIONS_ERR,
    GET_NOTIFICATIONS_REQ,
    GET_NOTIFICATIONS_RES,
    HIDDEN_IMPORTANT_NOTIFICATION_ALERT,
    HIDDEN_SUCCESS_ALERT,
    HIDE_CHECK_MAIL_ALERT,
    HIDE_ERROR_ALERT,
    SHOW_CHECK_MAIL_ALERT,
    SHOW_ERROR_ALERT,
    SHOW_IMPORTANT_NOTIFICATION_ALERT,
    SHOW_SUCCESS_ALERT
} from "./atcion";
import {TIME_TO_SHOW_SUCCESS_ALERT} from "../../../constants";

export const getNotificationsReq = () => ({type: GET_NOTIFICATIONS_REQ});
export const getNotificationsRes = data => ({type: GET_NOTIFICATIONS_RES, data});
export const getNotificationsErr = error => ({type: GET_NOTIFICATIONS_ERR, error});

export const showImportantNotificationAlert = () => ({type: SHOW_IMPORTANT_NOTIFICATION_ALERT});
export const hiddenImportantNotificationAlert = () => ({type: HIDDEN_IMPORTANT_NOTIFICATION_ALERT});

export const showSuccessAlert = () => ({type: SHOW_SUCCESS_ALERT});
export const hiddenSuccessAlert = () => ({type: HIDDEN_SUCCESS_ALERT});

export const showErrorAlert = (data) => ({type: SHOW_ERROR_ALERT, data});
export const hideErrorAlert = () => ({type: HIDE_ERROR_ALERT});

export const showCheckMailAlert = () => ({type: SHOW_CHECK_MAIL_ALERT});
export const hideCheckMailAlert = () => ({type: HIDE_CHECK_MAIL_ALERT});

export const openSuccessAlert = () => async dispatch => {
    dispatch(showSuccessAlert());

    window.setTimeout(() => {
        dispatch(hiddenSuccessAlert());
    }, TIME_TO_SHOW_SUCCESS_ALERT);
};

export const openErrorAlert = (data) => async dispatch => {
    dispatch(showErrorAlert(data));

    window.setTimeout(() => {
        dispatch(hideErrorAlert());
    }, TIME_TO_SHOW_SUCCESS_ALERT);
};

export const openCheckMailAlert = () => async dispatch => {
    dispatch(showCheckMailAlert());

    window.setTimeout(() => {
        dispatch(hideCheckMailAlert());
    }, TIME_TO_SHOW_SUCCESS_ALERT);
};

export const getNotifications = () => async dispatch => {
    try {
        dispatch(getNotificationsReq());

        const data = await axiosApi.get("v1/notifications/");

        if (data.data.length) {
            dispatch(showImportantNotificationAlert());
        }

        dispatch(getNotificationsRes(data.data.reverse()));
    } catch(e) {
        dispatch(getNotificationsErr(e.response.data));
    }
};

export const readAllNotifications = () => async dispatch => {
    try {
        await axiosApi.get("v1/notifications/");
    } catch(e) {
        dispatch(getNotificationsErr(e.response.data));
    }
};