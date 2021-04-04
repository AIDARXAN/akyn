import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import routes from "../../routes";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentUser} from "../../store/acrions/user/actionsCreators";
import ImportantNotificationAlert from "../../components/Alerts/ImportantNotificationAlert";
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import ErrorAlert from "../../components/Alerts/ErrorAlert";

const AutUser = (props) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, []);
    return (
        <div className="wrapper">
            <SuccessAlert/>
            <ErrorAlert/>
            <Sidebar
                {...props}
                routes={routes}
                bgColor={"white"}
                activeColor={"info"}
            />
            <div className="main-panel">
                <DemoNavbar {...props} />

                {user && <Switch>

                    <Route path="/" exact
                           render={() => <div className="content">
                               <Redirect to={'/profile'}/>
                           </div>}/>

                    {routes.map((prop, key) => {
                        return (
                            <PrivateRoute
                                group={prop.groups}
                                status={prop.status}
                                path={prop.path}
                                component={prop.component}
                                key={key}
                                exact
                            />
                        );
                    })}
                </Switch>}
                {/*<Footer fluid/>*/}
            </div>
        </div>
    );
};

export default AutUser;