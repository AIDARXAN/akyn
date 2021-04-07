import {push} from "connected-react-router";

import {
    editProfileErr,
    editProfileRes,
    editUserClassesAndRightsErr,
    editUserClassesAndRightsRes,
    editUserProfileAvatarErr,
    editUserProfileAvatarRes,
    editUserProfilePasswordErr,
    editUserProfilePasswordRes,
    fetchCurrentUserErr,
    fetchCurrentUserRes,
    userDeletionErr,
    userDeletionRes,
    userLoginErr,
    userLoginRes,
    userLogoutErr,
    userLogoutRes,
    userRegistrationErr,
    userRegistrationRes
} from "./actions";
import axiosApi from "../../../axiosAPI";
import {getNotifications, openErrorAlert, openSuccessAlert} from "../Notification/actionCreators";


export const userLogin = user => async dispatch => {

    try {
        const token = await axiosApi.post("v1/rest-auth/login/", {username: user.username, email: "", password: user.password});
        dispatch(userLoginRes(token.data));

        dispatch(push("/profile"));
    } catch (e) {
        dispatch(userLoginErr(e.response.data));
    }
};

export const userRegistration = user => async dispatch => {
    try {
        const userInfo = await axiosApi.post("v1/auth/registration/", user);

        dispatch(userRegistrationRes(userInfo.data));

        dispatch(userLoginRes(userInfo.data));
        dispatch(push("/profile"));
    } catch (e) {
        dispatch(userRegistrationErr(e.response.data));
    }
};

export const userLogout = () => async dispatch => {
    try {
        const token = await axiosApi.post("v1/rest-auth/logout/");

        dispatch(userLogoutRes(token.data));

        dispatch(push("/"));
    } catch (e) {
        dispatch(userLogoutErr(e.response.data));
    }
};

export const userDelete = (data) => async dispatch => {
    try {
        const userId = data.userId;
        await axiosApi.delete(
            `v1/auth/users/${userId}/delete`
        );

        dispatch(userDeletionRes());
        dispatch(getNotifications());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(userDeletionErr(e.response.data));
    }
};

export const fetchCurrentUser = () => async dispatch => {
    try {
        const response = await axiosApi.get("v1/users/current/");

        dispatch(fetchCurrentUserRes(response.data));
        dispatch(getNotifications());
    } catch (e) {
        dispatch(fetchCurrentUserErr(e));
    }
};

export const editProfile = (profileData, closeModal) => async (dispatch, getState) => {
    try {
        const userId = getState().user.currentUser.id;

        await axiosApi.put(`v1/auth/users/${userId}`, profileData);

        dispatch(editProfileRes());
        dispatch(push("/profile"));
        dispatch(fetchCurrentUser());
        if (closeModal) closeModal();
    } catch (e) {
        dispatch(editProfileErr(e.response.data));
    }
};

export const editUserProfilePassword = (password, closeModal) => async (dispatch, getState) => {
    try {
        const userId = getState().user.currentUser.id;
        await axiosApi.put(`v1/auth/users/${userId}/change-password`, password);
        dispatch(editUserProfilePasswordRes());
        dispatch(openSuccessAlert());
        closeModal();
    } catch (e) {
        dispatch(editUserProfilePasswordErr(e.response.data));
    }
};

export const editUserAvatar = avatar => async (dispatch, getState) => {
    try {
        await axiosApi.put("v1/auth/users/avatar", avatar);

        await dispatch(editUserProfileAvatarRes());
        dispatch(push("/profile"));
        dispatch(fetchCurrentUser());
    } catch (e) {
        dispatch(editUserProfileAvatarErr(e?.response?.data))
        dispatch(openErrorAlert(e?.response?.data.avatar));
    }
};

export const editUserClassesAndRights = data => async dispatch => {
    try {
        const userId = data.userId;
        await axiosApi.put(
            `v1/auth/users/${userId}/change-role`,
            {new_group: data.new_group, additional_group: data.additional_group}
        );

        dispatch(editUserClassesAndRightsRes());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(editUserClassesAndRightsErr(e.response.data));
    }
};
