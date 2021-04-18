import {userRoles, valuesForUsersTimeWorked} from "./constants";
import store from "./store/configureStore";

export const checkPermissions = (...roles) => {
    const user = store.getState().user.currentUser;

    return !!roles.find(role => role === user.groups[0]?.name) ||
           !!roles.find(role => role === user.additional_group?.name);
};

export const convertStringDateToDate = date => {
    if (date) {
        const day = parseInt(date.slice(-2));
        const month = parseInt(date.slice(5, 7)) - 1;
        const year = parseInt(date.slice(0, 4));
        return new Date(year, month, day);
    }
};

export const timeStringToFloat = (time) => {
    const hoursMinutes = time.split(/[.:]/);
    const hours = parseInt(hoursMinutes[0], 10);
    const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
};

export const numberToTime = number => {
    const hours = Math.floor(number);
    const mins = 60 * (number - hours);
    const t = new Date();

    t.setHours(hours);
    t.setMinutes(mins);
    return t.toTimeString().slice(0, 8);
};

export const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}