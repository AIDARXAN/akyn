import React from "react";

import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";


const PrivateRoute = ({
                          component: Component,
                          path,
                          exact,
                          roles,
                          group,
                          notGroup,
                          status,
                          ...rest
                      }) => {
    const user = useSelector(state => state.user.currentUser);
    return <Route path={path} exact={exact} {...rest} render={(props) => {
        return (
            user !== undefined &&
            (
                ((
                    (
                        (typeof group === "object" && group.find(role => role === user.groups[0]?.name))
                    )
                )
                ||
                !group && !!(status && status.find(s => s === user.status)) || !status
            ) &&
            !!Component
                ? <Component {...props}/>
                : <Redirect to='/profile'/>
        ))
    }}
    />;
};

export default PrivateRoute;