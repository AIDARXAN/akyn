import {GET_FOLLOWERS_ERR, GET_FOLLOWERS_RES, GET_FOLLOWING_ERR, GET_FOLLOWING_RES} from "../acrions/Follow/actions";
import {FEED_ERR, FEED_RES} from "../Feed/actions";

const initialState = {
    feed: [],
    feedErr: null,
};

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEED_RES:
            return {...state, feed: action.data, feedErr: null};
        case FEED_ERR:
            return {...state, feedErr: action.error};

        default:
            return state;
    }
};

export default followReducer;