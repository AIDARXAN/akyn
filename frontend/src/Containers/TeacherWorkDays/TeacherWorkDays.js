import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import {EMPTY_DAY_COLOR, FULL_DAY_COLOR, userRoles} from "../../constants";
import {getWorkDays, updateWorkDay} from "../../store/acrions/WorkDays/actionsCreators";
import {convertCalendarValueToWorkDayTime} from "../../services";

const TeacherWorkDays = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.currentUser);
    const workDays = useSelector(state => state.workDays.workDays);
    const group = user.groups[0];

    const optionsValues = [0, 1];
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    const selectChange = async (e, day, date) => {
        const time = convertCalendarValueToWorkDayTime(userRoles.teachers, parseFloat(e.target.value));
        day.time_worked = `${time}:00:00`;
        await dispatch(updateWorkDay(day));
        await dispatch(getWorkDays(date.getFullYear(), date.getMonth() + 1, group.id));
    };

    const dateChangeHandler = date => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        dispatch(getWorkDays(year, month, group.id));
    };

    const optionsColors = {
        "1": FULL_DAY_COLOR,
        "0": EMPTY_DAY_COLOR,
    };

    useEffect(() => {
        dispatch(getWorkDays(currentYear, currentMonth, group.id));
    }, []);

    return (
        <div className='content'>
            <Calendar
                days={workDays}
                selectOptionColors={optionsColors}
                optionsValues={optionsValues}
                dateChangeHandler={dateChangeHandler}
                selectChange={selectChange}
                user={user}
                role={userRoles.teachers}
            />

        </div>
    );
};

export default TeacherWorkDays;