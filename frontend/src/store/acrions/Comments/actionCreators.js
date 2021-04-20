import axiosApi from "../../../axiosAPI";
import {PUBLISHED} from "../../../constants";
import {
    createPostErr,
    createPostRes,
    deletePostErr,
    deletePostRes,
    updatePostErr,
    updatePostRes
} from "../Post/actions";
import {fetchCurrentUser} from "../user/actionsCreators";
import {
    deleteCommentErr,
    deleteCommentRes,
    fetchCommentsErr,
    fetchCommentsRes,
    updateCommentErr,
    updateCommentRes
} from "./actions";

export const fetchComments = (postId) => async (dispatch, getState) => {
    try {
        const response = await axiosApi.get(`v1/publications/${postId}/comments/`);
        dispatch(fetchCommentsRes(response.data))
    } catch (e) {
        dispatch(fetchCommentsErr(e.response.data));
    }
};

export const updateComment = (id, text) => async (dispatch, getState) => {
    try {
        await axiosApi.put(`v1/comments/${id}/`, {description: text});
        dispatch(updateCommentRes())
    } catch (e) {
        dispatch(updateCommentErr(e.response.data));
    }
};

export const deleteComment = (id) => async (dispatch, getState) => {
    try {
        await axiosApi.delete(`v1/comments/${id}/`, );
        dispatch(deleteCommentRes())
    } catch (e) {
        dispatch(deleteCommentErr(e.response.data));
    }
};