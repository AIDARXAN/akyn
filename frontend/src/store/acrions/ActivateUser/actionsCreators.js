import {activateUserError, activateUserSuccess, fetchGroupsFail, fetchGroupsSuccess} from "./actions";
import axiosApi from "../../../axiosAPI";
import {fetchUsers} from "../user/actionsCreators";
import {push} from "connected-react-router";
import {getNotifications, openSuccessAlert} from "../Notification/actionCreators";

export const fetchGroups = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get("/v1/auth/groups/");
            dispatch(fetchGroupsSuccess(response.data));
        } catch (e) {
            dispatch(fetchGroupsFail(e));
        }

    };
};

export const activateUser = data => async dispatch => {
    try {
        const userId = data.userId;
        await axiosApi.put(
            `v1/auth/users/${userId}/activate`,
            {
                account_activation_date: data.activationDate,
                employment_date: data.employmentDate,
                new_group: data.new_group,
                additional_group: data.additional_group
            }
        );
        dispatch(activateUserSuccess());
        dispatch(fetchUsers());
        dispatch(getNotifications());
        dispatch(push("/users"));
        dispatch(openSuccessAlert());
    } catch (e) {
        dispatch(activateUserError(e.response.data));
    }
};