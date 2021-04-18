import {PASSWORD_RESET_ERR, PASSWORD_RESET_RES} from "../acrions/PasswordReset/actions";
import {FETCH_COMMENTS_ERR, FETCH_COMMENTS_RES} from "../acrions/Comments/actions";

const initialState = {
    comments: null,
    fetchCommentsErr: null
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_RES:
            return {...state, comments: action.data, fetchCommentsErr: null};
        case FETCH_COMMENTS_ERR:
            return {...state, fetchCommentsErr: action.error};

        default:
            return state;
    }
};

export default commentsReducer;