export const UPDATE_WORK_DAY_NORM_RES = "UPDATE_WORK_DAY_NORM_RES";
export const UPDATE_WORK_DAY_NORM_ERR = "UPDATE_WORK_DAY_NORM_ERR";

export const  updateWorkDayNormRes = () => ({type: UPDATE_WORK_DAY_NORM_RES});
export const  updateWorkDayNormErr = (error) => ({type: UPDATE_WORK_DAY_NORM_ERR, error});