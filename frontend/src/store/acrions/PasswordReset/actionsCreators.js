import axiosApi from "../../../axiosAPI";
import {passwordResetErr, passwordResetRes} from "./actions";
import {openCheckMailAlert, openErrorAlert} from "../Notification/actionCreators";


export const passwordReset = (user) => async dispatch => {
	try {
		const response = await axiosApi.post("/v1/auth/password/reset/", {email: user.email});

		dispatch(openCheckMailAlert());
		dispatch(passwordResetRes(response.data));
	} catch (e) {
		dispatch(passwordResetErr(e.response.data));
		dispatch(openErrorAlert(e.response.data.detail))
	}
};