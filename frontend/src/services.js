import {userRoles, valuesForUsersTimeWorked} from "./constants";
import store from "./store/configureStore";

export const checkPermissions = (...roles) => {
    const user = store.getState().user.currentUser;

    return !!roles.find(role => role === user.groups[0]?.name) ||
           !!roles.find(role => role === user.additional_group?.name);
};

export const convertWorkDayTimeToCorrectValue = (group, time) => {
    let value = null;

    const {administration, teachers, mentors, supports} = valuesForUsersTimeWorked;

    switch (group) {
        case userRoles.administration:
            if (time <= administration.emptyDay.hours || !time) value = administration.emptyDay.value;
            if (time >= administration.halfDay.hours) value = administration.halfDay.value;
            if (time >= administration.fullDay.hours) value = administration.fullDay.value;
            break;
        case userRoles.teachers:
            if (time <= teachers.emptyDay.hours || !time) value = teachers.emptyDay.value;
            if (time >= teachers.fullDay.hours) value = teachers.fullDay.value;
            break;
        case userRoles.mentors:
            if (time <= mentors.emptyDay.hours || !time) value = mentors.emptyDay.value;
            if (time >= mentors.fullDay.hours) value = time;
            break;
        case userRoles.supports:
            if (time <= supports.emptyDay.hours || !time) value = supports.emptyDay.value;
            if (time >= supports.fullDay.hours) value = supports.fullDay.value;
            break;
    }

    return value;
};

export const convertCalendarValueToWorkDayTime = (group, value) => {
    let time = null;

    const {admin, teachers, mentors, supports, administration} = valuesForUsersTimeWorked;

    switch (group) {
        case userRoles.admin:
            if (value === admin.emptyDay.value || !value) time = `0${admin.emptyDay.hours}`;
            if (value === admin.halfDay.value) time = `0${admin.halfDay.hours}`;
            if (value === admin.fullDay.value) time = `0${admin.fullDay.hours}`;
            break;
        case userRoles.administration:
            if (value === administration.emptyDay.value || !value) time = `0${administration.emptyDay.hours}`;
            if (value === administration.halfDay.value) time = `0${administration.halfDay.hours}`;
            if (value === administration.fullDay.value) time = `0${administration.fullDay.hours}`;
            break;
        case userRoles.teachers:
            if (value === teachers.emptyDay.value || !value) time = `0${teachers.emptyDay.hours}`;
            if (value === teachers.fullDay.value) time = `0${teachers.fullDay.hours}`;
            break;
        case userRoles.mentors:
            if (value === mentors.emptyDay.value || !value) time = `0${mentors.emptyDay.hours}`;
            if (value >= mentors.fullDay.value) time = `0${value}`;
            break;
        case userRoles.supports:
            if (value === supports.emptyDay.value || !value) time = `0${supports.emptyDay.hours}`;
            if (value === supports.fullDay.value) time = `0${supports.fullDay.hours}`;
            break;
    }

    return time;
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