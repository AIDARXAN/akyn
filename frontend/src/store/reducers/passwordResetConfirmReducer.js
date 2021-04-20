import {PASSWORD_RESET_CONFIRM_ERR, PASSWORD_RESET_CONFIRM_RES} from "../acrions/PasswordResetConfirm/actions";

const initialState = {
    data: null,
    error: null
};

const passwordResetConfirmReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_RESET_CONFIRM_RES:
            return {...state, data: action.data, error: null};
        case PASSWORD_RESET_CONFIRM_ERR:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default passwordResetConfirmReducer;