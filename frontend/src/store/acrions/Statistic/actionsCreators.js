import axiosApi from "../../../axiosAPI";
import {GET_GENERAL_STATISTIC_SUCCESS, GET_YEAR_STATISTIC_SUCCESS} from "./actions";

export const getGeneralStatisticSuccess = generalStatistic => ({type: GET_GENERAL_STATISTIC_SUCCESS, generalStatistic});
export const getYearStatisticSuccess = yearStatistic => ({type: GET_YEAR_STATISTIC_SUCCESS, yearStatistic});


export const getGeneralStatistic = (year, month) => async dispatch => {
    const resp = await axiosApi.get(`v1/statistics?month=${month}&year=${year}`);

    dispatch(getGeneralStatisticSuccess(resp.data));
};

export const getYearStatistic = (year, userId) => async dispatch => {
    dispatch(getYearStatisticSuccess(null));
    const resp = await axiosApi.get(`v1/year-statistics/${userId}/${year}/`);

    dispatch(getYearStatisticSuccess(resp.data));
};