import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "reactstrap";

const RegistrationNotification = ({firstName, lastName, id}) => {
    return (
        <div className="text-light">
            <p className="d-block">Активируйте пользователя </p>
            <b className="d-block pb-2">{firstName} {lastName}</b>
            <div className="w-100">
                <NavLink to={"/users/toActive/" + id} className="d-inline-block w-50">
                    <Button className='btn-contacts all-btn m-0 w-100'>
                        Посмотреть
                    </Button>
                </NavLink>
                <NavLink to={"/users/openActivatingUser/" + id} className="d-inline-block w-50">
                    <Button className='btn-contacts  m-0 w-100 pr-0 pl-0'>
                        Активировать
                    </Button>
                </NavLink>
            </div>
        </div>
    );
};

export default RegistrationNotification;