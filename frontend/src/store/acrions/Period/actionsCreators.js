import axiosApi from "../../../axiosAPI";
import {CLOSE_OR_OPEN_PERIOD_ERR, CLOSE_OR_OPEN_PERIOD_REQ, CLOSE_OR_OPEN_PERIOD_RES} from "./actions";
import {getGeneralStatistic} from "../Statistic/actionsCreators";
import {openSuccessAlert} from "../Notification/actionCreators";

export const closeOrOpenPeriodReq = () => ({type: CLOSE_OR_OPEN_PERIOD_REQ});
export const closeOrOpenPeriodRes = () => ({type: CLOSE_OR_OPEN_PERIOD_RES});
export const closeOrOpenPeriodErr = error => ({type: CLOSE_OR_OPEN_PERIOD_ERR, error});

export const closeOrOpenPeriod = (month, year, userId, comment, isLastYear) => async dispatch => {
  try {
      dispatch(closeOrOpenPeriodReq());

      const requestData = {month, year, user_id: userId};
      if(isLastYear) requestData.comment = comment;
      const data = await axiosApi.patch(`v1/periods/`, requestData);

      dispatch(closeOrOpenPeriodRes(data.data));
      dispatch(openSuccessAlert());
      dispatch(getGeneralStatistic(year, month));
  } catch (e){
      dispatch(closeOrOpenPeriodErr(e));
  }
};

