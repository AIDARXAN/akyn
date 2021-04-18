import axiosApi from "../../../axiosAPI";
import {PUBLISHED} from "../../../constants";
import {createPostErr, createPostRes} from "../Post/actions";
import {fetchCurrentUser} from "../user/actionsCreators";
import {fetchCommentsErr, fetchCommentsRes} from "./actions";

export const fetchComments = (postId) => async (dispatch, getState) => {
    try {
        const response = await axiosApi.get(`v1/publications/${postId}/comments/`);
        dispatch(fetchCommentsRes(response.data))
    } catch (e) {
        dispatch(fetchCommentsErr(e.response.data));
    }
};