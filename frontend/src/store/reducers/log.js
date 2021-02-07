import {GET_LOGS_LIST_ERR, GET_LOGS_LIST_RES} from "../acrions/Log/actions";

const initialState = {
    logs: null,
    error: null
};

const logReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGS_LIST_RES:
            return {...state, logs: action.data, error: null};
        case GET_LOGS_LIST_ERR:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default logReducer;