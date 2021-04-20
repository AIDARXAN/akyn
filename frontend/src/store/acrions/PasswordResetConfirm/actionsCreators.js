import {push} from "connected-react-router";

import axiosApi from "../../../axiosAPI";
import {passwordResetConfirmErr, passwordResetConfirmRes} from "./actions";


export const passwordResetConfirm = password => async dispatch => {
	try {
		const response = await axiosApi.post(
			`/v1/auth/password/reset/confirm/${password.token}/`,
			{new_password1: password.new_password1, new_password2: password.new_password2});

		dispatch(passwordResetConfirmRes(response.data));
		dispatch(push("/login"));
	} catch (e) {
		dispatch(passwordResetConfirmErr(e.response.data));
	}
};