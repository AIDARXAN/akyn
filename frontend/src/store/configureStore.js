import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";

import userReducer from "./reducers/userReducer";
import passwordResetReducer from "./reducers/passwordResetReducer";
import passwordResetConfirmReducer from "./reducers/passwordResetConfirmReducer";
import notificationReducer from "./reducers/notificationReducer";
import commentsReducer from "./reducers/commentsReducer";
import followReducer from "./reducers/followReducer";


export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    user: userReducer,
    notification: notificationReducer,
    passwordReset: passwordResetReducer,
    passwordResetConfirm: passwordResetConfirmReducer,
    publicationComments: commentsReducer,
    follow: followReducer,
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
