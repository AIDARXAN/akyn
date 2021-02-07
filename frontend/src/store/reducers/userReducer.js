import {
    CLEAN_UP_REPLACE_TEACHER_ERR,
    EDIT_PROFILE_ERR,
    EDIT_PROFILE_RES,
    EDIT_USER_CLASSES_AND_RIGHTS_ERR,
    EDIT_USER_CLASSES_AND_RIGHTS_RES,
    EDIT_USER_PROFILE_PASSWORD_ERR,
    EDIT_USER_PROFILE_PASSWORD_RES,
    FETCH_CURRENT_USER_ERR,
    FETCH_CURRENT_USER_RES,
    FETCH_USERS_FAIL,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_WORKDAY_NORM_ERR,
    FETCH_WORKDAY_NORM_RES,
    FIRE_USER_ERR,
    FIRE_USER_RES,
    GET_CONTACTS_ERR,
    GET_CONTACTS_REQ,
    GET_CONTACTS_RES,
    REPLACE_TEACHER_ERR,
    REPLACE_TEACHER_RES,
    RETURN_FROM_VACATION_USER_ERR,
    RETURN_FROM_VACATION_USER_RES,
    SEND_TO_VACATION_USER_ERR,
    SEND_TO_VACATION_USER_RES,
    USER_DELETION_ERR,
    USER_DELETION_RES,
    USER_LOGIN_ERR,
    USER_LOGIN_RES,
    USER_LOGOUT_ERR,
    USER_LOGOUT_RES,
    USER_REGISTRATION_ERR,
    USER_REGISTRATION_RES
} from "../acrions/user/actions";

const initialState = {
    user: null,
    regError: null,
    logError: null,
    delError: null,
    fireUserError: null,
    sendToVacationError: null,
    returnFromVacationError: null,
    replaceTeacherError: null,
    contactsError: null,
    users: [],
    workDayNorm: null,
    fetchWorkDayNormError: [],
    contacts: [],
    loading: false,
    currentUser: null,
    editProfileError: null,
    editUserProfilePasswordError: null,
    editUserRole: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_RES:
            return {...state, user: action.data, logError: null};
        case USER_LOGIN_ERR:
            return {...state, logError: action.error};

        case USER_REGISTRATION_RES:
            return {...state, regError: null};
        case USER_REGISTRATION_ERR:
            return {...state, regError: action.error};

        case USER_DELETION_RES:
            return {...state, delError: null};
        case USER_DELETION_ERR:
            return {...state, delError: action.error};

        case FIRE_USER_RES:
            return {...state, fireUserError: null};
        case FIRE_USER_ERR:
            return {...state, fireUserError: action.error};

        case SEND_TO_VACATION_USER_RES:
            return {...state, sendToVacationError: null};
        case SEND_TO_VACATION_USER_ERR:
            return {...state, sendToVacationError: action.error};
        case RETURN_FROM_VACATION_USER_RES:
            return {...state, returnFromVacationError: null};
        case RETURN_FROM_VACATION_USER_ERR:
            return {...state, returnFromVacationError: action.error};

        case GET_CONTACTS_REQ:
            return {...state, loading: true};
        case GET_CONTACTS_RES:
            return {...state, contacts: action.data, loading: false};
        case GET_CONTACTS_ERR:
            return {...state, loading: false, contactsError: action.error};

        case USER_LOGOUT_RES:
            return {...state, user: null, regError: null};
        case USER_LOGOUT_ERR:
            return {...state, error: action.error};
        case FETCH_USERS_REQUEST:
            return {...state, loading: true};
        case FETCH_USERS_SUCCESS:
            return {...state, users: action.data, loading: false};
        case FETCH_USERS_FAIL:
            return {...state, error: action.error, loading: false};
        case FETCH_CURRENT_USER_RES:
            return {...state, currentUser: action.currentUser, error: null};
        case FETCH_CURRENT_USER_ERR:
            return {...state, error: action.error};

        case EDIT_PROFILE_RES:
            return {...state, editProfileError: null};
        case EDIT_PROFILE_ERR:
            return {...state, editProfileError: action.error};

        case EDIT_USER_PROFILE_PASSWORD_RES:
            return {...state, editUserProfilePasswordError: null};
        case EDIT_USER_PROFILE_PASSWORD_ERR:
            return {...state, editUserProfilePasswordError: action.error};

        case EDIT_USER_CLASSES_AND_RIGHTS_RES:
            return {...state, editUserRole: null};
        case EDIT_USER_CLASSES_AND_RIGHTS_ERR:
            return {...state, editUserRole: action.error};

        case REPLACE_TEACHER_RES:
            return {...state, replaceTeacherError: null};
        case REPLACE_TEACHER_ERR:
            return {...state, replaceTeacherError: action.error};
        case CLEAN_UP_REPLACE_TEACHER_ERR:
            return {...state, replaceTeacherError: null}

        case FETCH_WORKDAY_NORM_RES:
            return {...state, workDayNorm: action.data, fetchWorkDayNormError: null};
        case FETCH_WORKDAY_NORM_ERR:
            return {...state, fetchWorkDayNormError: action.error};

        default:
            return state;
    }
};

export default userReducer;