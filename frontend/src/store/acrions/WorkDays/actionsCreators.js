import axiosApi from "../../../axiosAPI";
import {GET_ALL_USERS_WORK_DAYS, GET_WORK_DAYS_SUCCESS} from "./actions";
import {fetchWorkDayNorm} from "../user/actionsCreators";


export const getWorkDaysSuccess = workDays => ({type: GET_WORK_DAYS_SUCCESS, workDays});
export const getAllWorkDaysSuccess = allWorkDays => ({type: GET_ALL_USERS_WORK_DAYS, allWorkDays});

export const getWorkDays = (year, month, group, additional_group) => async (dispatch) => {
    try {
        let params = `?month=${month}&year=${year}`;
        if (group) params += `&group=${group}`;
        if (additional_group) params += "&additional_group=true";
        const resp = await axiosApi.get(`v1/work-days${params}`);
        if (additional_group) {
            dispatch(fetchWorkDayNorm(month, year, null, true));
        } else {
            dispatch(fetchWorkDayNorm(month, year, group, null));
        }
        dispatch(getWorkDaysSuccess(resp.data));
    } catch (e) {
        dispatch(getWorkDaysSuccess([]));
    }
};

export const getAllWorkDays = (year, month, userRole, additional_group) => async dispatch => {
    dispatch(getAllWorkDaysSuccess([]));
    const resp = await axiosApi.get(`v1/work-days/all?month=${month}&year=${year}${userRole ? `&group=${userRole}` : ""}${additional_group ? `&additional_group=${additional_group}` : ""}`);
    dispatch(getAllWorkDaysSuccess(resp.data));
};

export const updateWorkDay = day => async () => {
    await axiosApi.put(`v1/work-days/${day.id}/`, day);
};
