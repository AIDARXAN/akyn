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
    fetchUsersFail,
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchWorkDayNormErr,
    fetchWorkDayNormRes,
    fireUserErr,
    fireUserRes,
    getContactsErr,
    getContactsReq,
    getContactsRes,
    replaceTeacherErr,
    replaceTeacherRes,
    returnFromVacationUserErr,
    returnFromVacationUserRes,
    sendToVacationUserErr,
    sendToVacationUserRes,
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
        dispatch(fetchUsers());
        dispatch(getNotifications());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(userDeletionErr(e.response.data));
    }
};

export const fireUserRequest = (data) => async dispatch => {
    try {
        const userId = data.userId;
        await axiosApi.put(
            `v1/auth/users/${userId}/fire`,
            {fired_at: data.fired_at}
        );

        dispatch(fireUserRes());
        dispatch(fetchUsers());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(fireUserErr(e.response.data));
    }
};

export const sendToVacationUser = (data) => async dispatch => {
    try {
        const userId = data.userId;
        await axiosApi.post(
            `v1/auth/users/${userId}/send-to-vacation`,
            {vacation_start_date: data.vacation_start_date, comment: data.comment}
        );

        dispatch(sendToVacationUserRes());
        dispatch(fetchUsers());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(sendToVacationUserErr(e.response));
    }
};

export const returnFromVacationUser = (data, userId) => async dispatch => {
    try {
        await axiosApi.put(
            `v1/auth/users/${userId}/send-to-vacation`,
            {vacation_end_date: data.vacation_end_date, comment: data.comment}
        );
        dispatch(returnFromVacationUserRes());
        dispatch(fetchUsers());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(returnFromVacationUserErr(e.response));
    }
};

// Fetch users

export const fetchUsers = status => async dispatch => {
    try {
        dispatch(fetchUsersRequest());

        if (status) {
            const response = await axiosApi.get("v1/auth/users?status=" + status,);
            return dispatch(fetchUsersSuccess(response.data));
        }
        const response = await axiosApi.get("v1/auth/users");
        dispatch(fetchUsersSuccess(response.data));

    } catch (e) {
        dispatch(fetchUsersFail(e.response.data));
    }
};


export const getContacts = status => async dispatch => {
    try {
        dispatch(getContactsReq());

        if (status) {
            const data = await axiosApi.get("v1/auth/users/contacts?status=" + status);

            return dispatch(getContactsRes(data.data));
        }
        const data = await axiosApi.get("v1/auth/users/contacts");

        dispatch(getContactsRes(data.data));
    } catch (e) {
        dispatch(getContactsErr(e.response.data));
    }
};

export const fetchCurrentUser = () => async dispatch => {
    try {
        const response = await axiosApi.get("v1/auth/users/current");

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
        dispatch(fetchUsers());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(editUserClassesAndRightsErr(e.response.data));
    }
};

export const replaceTeacherRequest = data => async dispatch => {
    try {
        await axiosApi.post(
            "v1/auth/users/replace",
            {
                from_user: data.teacher,
                to_user: data.support,
                date: data.replacement_date,
                comment: data.comment
            }
        );
        dispatch(replaceTeacherRes());
        dispatch(fetchUsers());
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(replaceTeacherErr(e.response.data));
    }
};

export const fetchWorkDayNorm = (month, year, groupId, additionalGroupId) => async (dispatch, getState) => {
    try {
        let url = `v1/work-day-norm?month=${month}&year=${year}`;
        if (additionalGroupId)
            url += `&additional_group=true`;
        if (groupId)
            url += `&group_id=${groupId}`;

        const response = await axiosApi.get(url);

        dispatch(fetchWorkDayNormRes(response.data));
    } catch (e) {
        dispatch(fetchWorkDayNormErr(e.response.data));
    }
};