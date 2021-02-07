import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import {EMPTY_DAY_COLOR, FULL_DAY_COLOR, HALF_DAY_COLOR, userRoles} from "../../constants";
import {convertCalendarValueToWorkDayTime} from "../../services";
import {getWorkDays, updateWorkDay} from "../../store/acrions/WorkDays/actionsCreators";

const AdminWorkDays = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.currentUser);
    const days = useSelector(state => state.workDays.workDays);

    const group = user.groups[0];

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const selectChangeHandler = async (e, day, date) => {
        const hoursValue = convertCalendarValueToWorkDayTime(userRoles.administration, parseFloat(e.target.value));
        day.time_worked = `${hoursValue}:00:00`;
        await dispatch(updateWorkDay(day));
        await dispatch(getWorkDays(date.getFullYear(), date.getMonth() + 1, group.id));
    };
    const dateChangeHandler = date => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        dispatch(getWorkDays(year, month, group.id));
    };

    const optionValues = [0, 0.5, 1];
    const optionsColors = {
        "0": EMPTY_DAY_COLOR,
        "0.5": HALF_DAY_COLOR,
        "1": FULL_DAY_COLOR,
    };

    useEffect(() => {
        dispatch(getWorkDays(year, month, group.id));
    }, []);

    return (
        <div className="content">
            <Calendar
                days={days}
                selectOptionColors={optionsColors}
                optionsValues={optionValues}
                dateChangeHandler={dateChangeHandler}
                selectChange={selectChangeHandler}
                role={userRoles.administration}
                user={user}
            />
        </div>
    );
};

export default AdminWorkDays;