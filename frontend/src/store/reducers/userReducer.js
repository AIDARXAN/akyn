import {
    EDIT_PROFILE_ERR,
    EDIT_PROFILE_RES,
    EDIT_USER_PROFILE_PASSWORD_ERR,
    EDIT_USER_PROFILE_PASSWORD_RES,
    FETCH_CURRENT_USER_ERR,
    FETCH_CURRENT_USER_RES, FETCH_USER_ERR, FETCH_USER_RES,
    FETCH_USERS_FAIL,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
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
    users: [],
    loading: false,
    currentUser: null,
    editProfileError: null,
    editUserProfilePasswordError: null,
    editUserRole: null,
    anotherUser: null,
    fetchAnotherUserErr: null,
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

        case FETCH_USER_RES:
            return {...state, anotherUser: action.data, fetchAnotherUserErr: null}
        case FETCH_USER_ERR:
            return {...state, fetchAnotherUserErr: action.error}

        default:
            return state;
    }
};

export default userReducer;