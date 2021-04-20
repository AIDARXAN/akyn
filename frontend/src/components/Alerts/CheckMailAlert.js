import Alert from "reactstrap/es/Alert";
import React from "react";
import "../../assets/css/paper-dashboard.css";
import {useDispatch, useSelector} from "react-redux";
import {hideCheckMailAlert} from "../../store/acrions/Notification/actionCreators";

const CheckMailAlert = () => {
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
    const alertIsVisible = useSelector(state => state.notification.checkMailAlert);

    const hiddenAlert = () => {
        dispatch(hideCheckMailAlert());
    };

    return (
        <div
            style={styles}
            className="col-11 col-sm-4">
            <Alert className='alert-with-icon alert-info animated fadeInDown alert-dismissible fade show'
                   isOpen={alertIsVisible}
                   toggle={hiddenAlert}
                   id='success-alert'
            >
                Почтаңызды текшериңиз
            </Alert>
        </div>
    );
};

export default CheckMailAlert;