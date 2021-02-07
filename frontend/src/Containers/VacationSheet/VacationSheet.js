import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import {getWorkDays, updateWorkDay} from "../../store/acrions/WorkDays/actionsCreators";
import {WEEKEND, WORK_DAY} from "../../constants";

const VacationSheet = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.currentUser);
    const days = useSelector(state => state.workDays.workDays);

    const group = user.groups[0];

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const dateChangeHandler = date => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        dispatch(getWorkDays(year, month, group.id));
    };

    const selectChangeHandler = async day => {
        const actualYear = parseInt(day.date.slice(0, 4));
        const actualMonth = parseInt(day.date.slice(5, 7));

        await dispatch(updateWorkDay(day));
        await dispatch(getWorkDays(actualYear, actualMonth, group.id));
    };

    const selectChange = (e, day) => {
        const dayStatus = e.target.value;
        if (dayStatus === "Р") {
            day.time_worked = "00:01:00";
            day.status = WORK_DAY;
        } else {
            day.time_worked = "00:00:00";
            day.status = WEEKEND;
        }
        selectChangeHandler && selectChangeHandler(day);
    };

    const optionValues = ["Р", "В"];
    const optionsColors = {
        4: "#FAC84A",
        1: "#00DF6C",
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
                selectChange={selectChange}
                role={group.name}
                user={user}
                vacation={true}
            />
        </div>
    );
};

export default VacationSheet;