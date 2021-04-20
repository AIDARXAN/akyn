import axiosApi from "../../axiosAPI";
import {fetchUserErr, fetchUserRes} from "../acrions/user/actions";
import {feedErr, feedRes} from "./actions";

export const fetchFeed = () => async (dispatch, getState) => {
    try {
        const response = await axiosApi.get(`v1/feed/`);
        dispatch(feedRes(response.data));
    } catch (e) {
        dispatch(feedErr(e?.response?.data))
    }
};