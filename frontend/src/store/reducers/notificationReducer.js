import {
    GET_NOTIFICATIONS_ERR,
    GET_NOTIFICATIONS_RES,
    HIDDEN_IMPORTANT_NOTIFICATION_ALERT,
    HIDDEN_SUCCESS_ALERT,
    HIDE_CHECK_MAIL_ALERT,
    HIDE_ERROR_ALERT,
    SHOW_CHECK_MAIL_ALERT,
    SHOW_ERROR_ALERT,
    SHOW_IMPORTANT_NOTIFICATION_ALERT,
    SHOW_SUCCESS_ALERT
} from "../acrions/Notification/atcion";

const initialState = {
    notifications: null,
    error: null,
    importantNotificationAlertIsVisible: false,
    successAlert: false,
    checkMailAlert: false,
    errorAlert: false,
    errorAlertMessage: null
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS_RES:
            return {...state, notifications: action.data, error: null};
        case GET_NOTIFICATIONS_ERR:
            return {...state, error: action.error};

        case SHOW_IMPORTANT_NOTIFICATION_ALERT:
            return {...state, importantNotificationAlertIsVisible: true};
        case HIDDEN_IMPORTANT_NOTIFICATION_ALERT:
            return {...state, importantNotificationAlertIsVisible: false};

        case SHOW_SUCCESS_ALERT:
            return {...state, successAlert: true};
        case HIDDEN_SUCCESS_ALERT:
            return {...state, successAlert: false};

        case SHOW_CHECK_MAIL_ALERT:
            return {...state, checkMailAlert: true};
        case HIDE_CHECK_MAIL_ALERT:
            return {...state, checkMailAlert: false};

        case SHOW_ERROR_ALERT:
            return {...state, errorAlertMessage: action.data, errorAlert: true}
        case HIDE_ERROR_ALERT:
            return {...state, errorAlertMessage: null, errorAlert: false}
        default:
            return state;
    }
};

export default notificationReducer;