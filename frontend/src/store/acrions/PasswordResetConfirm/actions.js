//PASSWORD_RESET
export const PASSWORD_RESET_CONFIRM_RES = "PASSWORD_RESET_CONFIRM_RES";
export const PASSWORD_RESET_CONFIRM_ERR = "PASSWORD_RESET_CONFIRM_ERR";

export const passwordResetConfirmRes = (data) => ({type: PASSWORD_RESET_CONFIRM_RES, data});
export const passwordResetConfirmErr = (error) => ({type: PASSWORD_RESET_CONFIRM_ERR, error});