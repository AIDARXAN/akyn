import {GET_LOGS_LIST_ERR, GET_LOGS_LIST_REQ, GET_LOGS_LIST_RES} from "./actions";

import axiosApi from "../../../axiosAPI";

const getLogsListReq = () => ({type: GET_LOGS_LIST_REQ});
const getLogsListRes = data => ({type: GET_LOGS_LIST_RES, data});
const getLogsListErr = error => ({type: GET_LOGS_LIST_ERR, error});

export const getLogs = (type, year) => async dispatch => {
    try {
      dispatch(getLogsListRes([]));
      dispatch(getLogsListReq());

      if(type && year) {
          const data = await axiosApi(`v1/logs?year=${year}&type=${type}`);

          return dispatch(getLogsListRes(data.data));
      }

    } catch (e) {
        dispatch(getLogsListErr(e.response.data));
    }
};