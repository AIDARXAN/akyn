import React from "react";
import {Route, Switch} from "react-router-dom";

import {useSelector} from "react-redux";
import AutUser from "./Containers/AuthUser/AutUser";
import NotAuthUser from "./Containers/AuthUser/NotAuthUser";

function App() {
    const user = useSelector(state => state.user.user);
    return (
        <Switch>
            {user && <Route path='/' component={AutUser}/>}
            {!user && <Route path='/' component={NotAuthUser}/>}
        </Switch>
    );
}

export default App;
