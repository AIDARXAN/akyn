import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import {userRoles} from "../../constants";
import {getWorkDays, updateWorkDay} from "../../store/acrions/WorkDays/actionsCreators";

const MentorsWorkDays = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.currentUser);
    const days = useSelector(state => state.workDays.workDays);

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const selectChangeHandler = async (day, date) => {
        await dispatch(updateWorkDay(day));
        dispatch(getWorkDays(date.getFullYear(), date.getMonth() + 1, null, true));
    };
    const dateChangeHandler = date => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        dispatch(getWorkDays(year, month, null, true));
    };

    useEffect(() => {
        dispatch(getWorkDays(year, month, null, true));
    }, []);
    return (
        <div className="content">
            <Calendar
                days={days}
                dateChangeHandler={dateChangeHandler}
                selectChange={selectChangeHandler}
                role={userRoles.mentors}
                user={user}
            />
        </div>
    );
};

export default MentorsWorkDays;
