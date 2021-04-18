import axiosApi from "../../../axiosAPI";
import {editProfileErr, editProfileRes} from "../user/actions";
import {push} from "connected-react-router";
import {fetchCurrentUser} from "../user/actionsCreators";
import {PUBLISHED} from "../../../constants";
import {
    createCommentErr, createCommentRes,
    createPostErr,
    createPostRes,
    likePostDeleteErr,
    likePostDeleteRes,
    likePostErr,
    likePostRes
} from "./actions";

export const createPost = (text) => async (dispatch, getState) => {
    try {
        await axiosApi.post(`v1/publications/`, {description: text, status: PUBLISHED});
        dispatch(createPostRes())
        dispatch(fetchCurrentUser())
    } catch (e) {
        dispatch(createPostErr(e.response.data));
    }
};

export const likePost = (id) => async (dispatch, getState) => {
    try {
        await axiosApi.post(`v1/publications/${id}/like`);
        dispatch(likePostRes())
    } catch (e) {
        dispatch(likePostErr(e.response.data));
    }
};

export const likePostDelete = (id) => async (dispatch, getState) => {
    try {
        await axiosApi.delete(`v1/publications/${id}/like`);
        dispatch(likePostDeleteRes())
    } catch (e) {
        dispatch(likePostDeleteErr(e.response.data));
    }
};

export const createComment = (publicationId, text) => async (dispatch, getState) => {
    try {
        await axiosApi.post(`v1/publications/${publicationId}/comments/`, {description: text});
        dispatch(createCommentRes())
    } catch (e) {
        dispatch(createCommentErr(e.response.data));
    }
};