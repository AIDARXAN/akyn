import {GET_ALL_USERS_WORK_DAYS, GET_WORK_DAYS_SUCCESS} from "../acrions/WorkDays/actions";

const initialState = {
    workDays: null,
    allWorkDays: null,
    error: null
};

const userWorkReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WORK_DAYS_SUCCESS:
            return {...state, workDays: action.workDays, error: null};
        case GET_ALL_USERS_WORK_DAYS:
            return {...state, allWorkDays: action.allWorkDays, error: null};
        default:
            return state;
    }
};

export default userWorkReducer;