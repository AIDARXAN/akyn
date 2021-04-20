import axiosApi from "../../../axiosAPI";
import {
    followErr,
    followRes,
    getFollowersErr,
    getFollowersRes,
    getFollowingErr,
    getFollowingRes, unfollowErr,
    unfollowRes
} from "./actions";

export const getFollowers = (username) => async (dispatch, getState) => {
    try {
        const response = await axiosApi.get(`v1/users/${username}/followers/`);
        dispatch(getFollowersRes(response.data));
    } catch (e) {
        dispatch(getFollowersErr(e?.response?.data))
    }
};

export const getFollowing = (username) => async (dispatch, getState) => {
    try {
        const response = await axiosApi.get(`v1/users/${username}/follows/`);
        dispatch(getFollowingRes(response.data));
    } catch (e) {
        dispatch(getFollowingErr(e?.response?.data))
    }
};

export const subscribeReq = (username) => async (dispatch, getState) => {
    try {
        const response = await axiosApi.post(`v1/users/${username}/subscribe/`);
        dispatch(followRes(response.data));
    } catch (e) {
        dispatch(followErr(e?.response?.data))
    }
};

export const unsubscribeReq = (username) => async (dispatch, getState) => {
    try {
        const response = await axiosApi.delete(`v1/users/${username}/subscribe/`);
        dispatch(unfollowRes(response.data));
    } catch (e) {
        dispatch(unfollowErr(e?.response?.data))
    }
};

