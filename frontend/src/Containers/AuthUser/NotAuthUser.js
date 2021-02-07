import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import PasswordReset from "../PasswordReset/PasswordReset";
import PasswordResetConfirm from "../PasswordResetConfirm/PasswordResetConfirm";
import CheckMailAlert from "../../components/Alerts/CheckMailAlert";
import ErrorAlert from "../../components/Alerts/ErrorAlert";

const NotAuthUser = () => {
    return (
        <div>
            <CheckMailAlert/>
            <ErrorAlert/>
            <Switch>
                <Route path="/registration" exact component={Registration}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/reset" exact component={PasswordReset}/>
                <Route path="/recover_password/:token" exact component={PasswordResetConfirm}/>

                <Redirect to={"/login"}/>
            </Switch>
        </div>

    );
};

export default NotAuthUser;