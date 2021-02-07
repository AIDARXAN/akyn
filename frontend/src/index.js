import React from "react";
import ReactDOM from "react-dom";
import {ConnectedRouter} from "connected-react-router";
import {Provider} from "react-redux";

import store, {history} from "./store/configureStore";

import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById("root")
);
