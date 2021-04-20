import {USER_LOGIN_RES, USER_LOGOUT_RES} from "./acrions/user/actions";

export const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.log("Could not save state");
    }
};

export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const actions = [USER_LOGIN_RES, USER_LOGOUT_RES];

export const localStorageMiddleware = store => next => action => {
    let result = next(action);

    if (actions.includes(action.type)) {
        saveToLocalStorage({
            user: {
                user: store.getState().user.user
            }
        });
    }
    return result;
};