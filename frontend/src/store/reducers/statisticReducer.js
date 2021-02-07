import {GET_GENERAL_STATISTIC_SUCCESS, GET_YEAR_STATISTIC_SUCCESS} from "../acrions/Statistic/actions";
import {UPDATE_WORK_DAY_NORM_ERR, UPDATE_WORK_DAY_NORM_RES} from "../acrions/WorkDayNorm/action";

const initialState = {
    generalStatistic: null,
    yearStatistic: null,
    error: null,
    updateWorkDayNormErr: null
};

const statisticReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GENERAL_STATISTIC_SUCCESS:
            return {...state, generalStatistic: action.generalStatistic};
        case GET_YEAR_STATISTIC_SUCCESS:
            return {...state, yearStatistic: action.yearStatistic};
        case UPDATE_WORK_DAY_NORM_RES:
            return {...state, updateWorkDayNormErr: null};
        case UPDATE_WORK_DAY_NORM_ERR:
            return {...state, updateWorkDayNormErr: action.error};
        default:
            return state;
    }
};

export default statisticReducer;