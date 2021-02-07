//PASSWORD_RESET
export const PASSWORD_RESET_RES = "PASSWORD_RESET_RES";
export const PASSWORD_RESET_ERR = "PASSWORD_RESET_ERR";

export const passwordResetRes = (data) => ({type: PASSWORD_RESET_RES, data});
export const passwordResetErr = (error) => ({type: PASSWORD_RESET_ERR, error});