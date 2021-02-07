import Alert from "reactstrap/es/Alert";
import React from "react";
import "../../assets/css/paper-dashboard.css";
import {useDispatch, useSelector} from "react-redux";
import {hideErrorAlert} from "../../store/acrions/Notification/actionCreators";

const ErrorAlert = () => {
    const styles = {
        display: "inline-block",
        margin: "0px auto",
        position: "fixed",
        transition: "all 0.5s ease-in-out 0s",
        zIndex: "1031",
        top: "20px",
        left: "0px",
        right: "0px"
    };
    const dispatch = useDispatch();
    const alertIsVisible = useSelector(state => state.notification.errorAlert);
    const alertText = useSelector(state => state.notification.errorAlertMessage)

    const hiddenAlert = () => {
        dispatch(hideErrorAlert());
    };
    return (
        <div
            style={styles}
            className="col-11 col-sm-4">
            <Alert className='alert-with-icon alert-danger animated fadeInDown alert-dismissible fade show'
                   isOpen={alertIsVisible}
                   toggle={hiddenAlert}
                   id='error-alert'
            >
                {alertText}
            </Alert>
        </div>
    );
};

export default ErrorAlert;