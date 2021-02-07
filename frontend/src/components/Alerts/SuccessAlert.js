import Alert from "reactstrap/es/Alert";
import React, {useState} from "react";
import "../../assets/css/paper-dashboard.css";
import {useDispatch, useSelector} from "react-redux";
import {hiddenImportantNotificationAlert, hiddenSuccessAlert} from "../../store/acrions/Notification/actionCreators";

const SuccessAlert = () => {
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
    const dispath = useDispatch();
    const successAlertIsVisible = useSelector(state => state.notification.successAlert);

    const hiddenAlert = () => {
        dispath(hiddenSuccessAlert());
    };

    return (
        <div
            style={styles}
            className="col-11 col-sm-4">
            <Alert className='alert-with-icon alert-success animated fadeInDown alert-dismissible fade show'
                   isOpen={successAlertIsVisible}
                   toggle={hiddenAlert}
                   id='success-alert'
            >
                Успех!
            </Alert>
        </div>
    );
};

export default SuccessAlert;