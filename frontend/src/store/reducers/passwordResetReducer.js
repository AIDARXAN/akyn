import {PASSWORD_RESET_ERR, PASSWORD_RESET_RES} from "../acrions/PasswordReset/actions";

const initialState = {
    data: null,
    error: null
};

const passwordResetReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_RESET_RES:
            return {...state, data: action.data, error: null};
        case PASSWORD_RESET_ERR:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default passwordResetReducer;