import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import statisticReducer from "./reducers/statisticReducer";

import userReducer from "./reducers/userReducer";
import workDaysReducer from "./reducers/workDaysReducer";
import passwordResetReducer from "./reducers/passwordResetReducer";
import passwordResetConfirmReducer from "./reducers/passwordResetConfirmReducer";
import activateUserReducer from "./reducers/activateUserReducer";
import notificationReducer from "./reducers/notificationReducer";
import logReducer from "./reducers/log";


export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    user: userReducer,
    notification: notificationReducer,
    logs: logReducer,
    workDays: workDaysReducer,
    passwordReset: passwordResetReducer,
    passwordResetConfirm: passwordResetConfirmReducer,
    activateUser: activateUserReducer,
    statistic: statisticReducer
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

export const store = createStore(rootReducer, persistedState, enhancers);

export default store;
