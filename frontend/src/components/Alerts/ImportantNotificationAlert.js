import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "reactstrap";
import {hiddenImportantNotificationAlert} from "../../store/acrions/Notification/actionCreators";

const ImportantNotificationAlert = () => {
    const dispath = useDispatch();
    const importantNotificationIsVisible = useSelector(state => state.notification.importantNotificationAlertIsVisible);

    const hiddenAlert = () => {
        dispath(hiddenImportantNotificationAlert());
    };

    return (
        <div
            className="col-11 col-sm-4"
            style={{
                display: "inline-block",
                margin: "0px auto",
                position: "fixed",
                transition: "all 0.5s ease-in-out 0s",
                zIndex: "1031",
                top: "20px",
                left: "0px",
                right: "0px"
            }}
        >
            <Alert className="alert-with-icon animated fadeInDown alert alert-danger alert-dismissible fade show" color="danger" isOpen={importantNotificationIsVisible} toggle={hiddenAlert}>
                <div className='d-flex align-items-center'>
                    <span data-notify="icon" className="nc-icon nc-bell-55"></span>
                    <p className='p-0 m-0 ml-2'>У вас есть <b>важные уведомления</b>. Проверьте вкладку уведомлений</p>
                </div>
            </Alert>
        </div>
    );
};

export default ImportantNotificationAlert;