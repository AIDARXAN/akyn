import axiosApi from "../../../axiosAPI";
import {searchResultsErr, searchResultsRes} from "./actions";


export const fetchUserSearchResults = (search) => async (dispatch, getState) => {
    try {
        const response = await axiosApi.get(`v1/users/search/${search}/`);
        dispatch(searchResultsRes(response.data));
    } catch (e) {
        dispatch(searchResultsErr(e?.response?.data))
    }
};