import {PASSWORD_RESET_ERR, PASSWORD_RESET_RES} from "../acrions/PasswordReset/actions";
import {FETCH_COMMENTS_ERR, FETCH_COMMENTS_RES} from "../acrions/Comments/actions";
import {GET_FOLLOWERS_ERR, GET_FOLLOWERS_RES, GET_FOLLOWING_ERR, GET_FOLLOWING_RES} from "../acrions/Follow/actions";

const initialState = {
    followers: null,
    following: null,
    followersErr: null,
    followsErr: null,
};

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWERS_RES:
            return {...state, followers: action.data, followersErr: null};
        case GET_FOLLOWERS_ERR:
            return {...state, followersErr: action.error};

        case GET_FOLLOWING_RES:
            return {...state, following: action.data, followsErr: null};
        case GET_FOLLOWING_ERR:
            return {...state, followsErr: action.error};
        default:
            return state;
    }
};

export default followReducer;