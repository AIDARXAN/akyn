import React from "react";
import {userLogout} from "../../store/acrions/user/actionsCreators";
import {useDispatch} from "react-redux";

const LogoutButton = ({color}) => {
    const dispatch = useDispatch();
    return (
        <a
            href="#"
            id='logoutButton'
            className="text-decoration-none"
            style={{color: color, fontSize: "14px"}}
            onClick={() => dispatch(userLogout())}
        >
            Чыгуу
        </a>
    );
};

export default LogoutButton;