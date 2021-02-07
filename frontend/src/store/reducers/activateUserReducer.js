import {
    ACTIVATE_USER_FAIL,
    ACTIVATE_USER_SUCCESS,
    FETCH_GROUPS_FAIL,
    FETCH_GROUPS_SUCCESS
} from "../acrions/ActivateUser/actions";

const initialState = {
    groups: [],
    groupError: null,
    activateError: null
};

const activateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_USER_SUCCESS:
            return {...state, activateError: null};
        case ACTIVATE_USER_FAIL:
            return {...state, activateError: action.error};
        case FETCH_GROUPS_SUCCESS:
            return {...state, groups: action.data, error: null};
        case FETCH_GROUPS_FAIL:
            return {...state, groupError: action.error};
        default:
            return state;
    }
};

export default activateUserReducer;