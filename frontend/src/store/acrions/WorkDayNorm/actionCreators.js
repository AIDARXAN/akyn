import {updateWorkDayNormErr, updateWorkDayNormRes} from "./action";
import {getGeneralStatistic} from "../Statistic/actionsCreators";
import {openSuccessAlert} from "../Notification/actionCreators";
import axiosApi from "../../../axiosAPI";


export const updateWorkDayNormReq = (monthId,
                                  userId,
                                  workDayNormGroupId,
                                  workingDays,
                                  year,
                                  month) => async dispatch => {
    try {
        const data = {
            month_id: monthId,
            user_id: userId,
            norm_group_id: workDayNormGroupId,
            working_days_norm: workingDays
        };

        await axiosApi.put("v1/update-work-day-norm/", data);
        dispatch(updateWorkDayNormRes());
        dispatch(openSuccessAlert());
        dispatch(getGeneralStatistic(year, month));
    } catch (e){
        dispatch(updateWorkDayNormErr(e));
    }

};