import classnames from "classnames";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userRoles, WEEKEND, WORK_DAY} from "../../constants";
import {convertStringDateToDate, convertWorkDayTimeToCorrectValue, timeStringToFloat} from "../../services";
import DateSwitcher from "../DateSwitcher/DateSwitcher";
import CalendarSelect from "./CalebdarSelect/CalendarSelect";

import "./calendar.css";
import * as calendar from "./calendarSevice";
import MentorsCalendarSelect from "./MentorsCalendarSelect/MentorsCalendarSelect";
import {getWorkDaysSuccess} from "../../store/acrions/WorkDays/actionsCreators";

const DAYS_IN_WEEK = 7;
const WEEK_DAYS = 5;
const FIRST_DATE_OF_MONTH = 1;

const Calendar = (
    {dateChangeHandler, days, optionsValues, selectOptionColors, selectChange, role, vacation}
) => {
    const weekDayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const user = useSelector(state => state.user.currentUser);
    const userWorkDayNorm = useSelector(state => state.user.workDayNorm);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorkDaysSuccess([]));
    }, []);

    let validDays = days?.map(day => {
        if (typeof day.time_worked === "string" && vacation !== true) {
            let time = parseFloat(day.time_worked.slice(0, 2));
            if (role === userRoles.mentors) {
                day.time_worked = timeStringToFloat(day.time_worked);
            } else {
                if (day.replaced !== true) {
                    day.time_worked = convertWorkDayTimeToCorrectValue(role, time)
                } else {
                    day.time_worked = convertWorkDayTimeToCorrectValue(role, time) + 1
                    console.log(day.time_worked)
                }
            }
        }
        return day;
    });


    const currentDate = new Date();
    const [date, setDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), FIRST_DATE_OF_MONTH));

    const monthStartOn = calendar.getDayOfWeak(date);
    const daysInMonth = days?.length;
    const weeksInMonth = Math.ceil((daysInMonth + monthStartOn) / DAYS_IN_WEEK);
    const daysOfNextMonth = weeksInMonth * DAYS_IN_WEEK - daysInMonth - monthStartOn;

    const changeDate = date => {
        setDate(date);
        dispatch(getWorkDaysSuccess([]));
        dateChangeHandler && dateChangeHandler(date);
    };

    // generation of 2D array of days
    const newDaysList = validDays && [...validDays];
    const monthData = [];
    for (let i = 0; i < monthStartOn + daysOfNextMonth; i++) {
        if (i < monthStartOn) {
            newDaysList.unshift(undefined);
        } else {
            newDaysList.push(undefined);
        }
    }
    while (newDaysList?.length) monthData.push(newDaysList.splice(0, DAYS_IN_WEEK));

    const checkDayStatus = (day) => {
        if (day === WORK_DAY)
            return "Р";
        else if (day === WEEKEND)
            return "В";

    };
    const generateCalendarItems = (day, index, isWeekend) => {
        if (vacation === true) {
            return (
                day.status !== undefined && day.status !== null && <CalendarSelect
                    color={selectOptionColors[day.status]}
                    day={day}
                    date={date}
                    optionsValues={optionsValues}
                    selectChange={selectChange}
                    isWeekend={isWeekend}
                    index={index}
                    value={checkDayStatus(day.status)}
                />
            );
        } else {
            return role === userRoles.mentors ? (
                day.time_worked !== null && day.time_worked !== undefined && <MentorsCalendarSelect
                    day={day}
                    date={date}
                    optionsValues={optionsValues}
                    selectChange={selectChange}
                    isWeekend={isWeekend}
                    index={index}
                    value={day.time_worked}
                />
            ) : (
                day.time_worked !== null && day.time_worked !== undefined && <CalendarSelect
                    color={selectOptionColors[day.time_worked]}
                    day={day}
                    date={date}
                    optionsValues={optionsValues}
                    selectChange={selectChange}
                    isWeekend={isWeekend}
                    index={index}
                    value={day.time_worked}
                />
            );
        }
    };
    return (
        <div className='m-0 calendar shadow bg-white pt-5 pb-5 pl-4 pr-4 row'>
            <div className='calendar col-md-12 col-lg-9 col-xl-8'>
                <DateSwitcher
                    date={date}
                    changeDate={changeDate}
                    user={user}
                    vacation={vacation}
                    currentDate={currentDate}
                    limitDateRange
                />
                <ul className='calendarTable'>
                    <ol className='d-flex justify-content-between calendarHeader p-0 w-100'>
                        {weekDayNames.map(name => (
                            <li key={name} className='weekDayItem text-left pl-3'>
                                <p className='p-0 text-uppercase'>{name}</p>
                            </li>
                        ))}
                    </ol>
                    <div className='d-flex flex-column'>
                        {monthData && monthData.map((week, weekIndex) => (
                            <ol key={weekIndex} className='d-flex weekItem w-100 p-0 ml-auto justify-content-between'>
                                {week.map((day, index) => {
                                    const itemDate = convertStringDateToDate(day?.date);
                                    const userActivationDate = convertStringDateToDate(user.account_activation_date);
                                    const isWeekend = (index + 1 > WEEK_DAYS) || (itemDate < userActivationDate);
                                    const isCurrentDate = (currentDate.getMonth() === date.getMonth()) &&
                                        (currentDate.getFullYear() === date.getFullYear()) &&
                                        (currentDate.getDate() === itemDate?.getDate());

                                    return day ?
                                        <li

                                            className={classnames("dayItem p-2", {
                                                "weekendDayItem": isWeekend
                                            })}
                                            key={day.date}
                                        >
                                            <p
                                                className={classnames("font-weight-light d-inline-block dayNumber text-center", {
                                                    "currentDay": isCurrentDate,
                                                    "currentWeekendDay": isCurrentDate && isWeekend
                                                })}
                                            >
                                                {itemDate.getDate()}
                                            </p>
                                            {itemDate >= userActivationDate && itemDate <= currentDate && vacation !== true && generateCalendarItems(day, index, isWeekend)}
                                            {itemDate >= userActivationDate && vacation === true && generateCalendarItems(day, index, isWeekend)}
                                        </li> :
                                        <li key={index} className='dayItem py-3'/>;
                                })}
                            </ol>
                        ))}
                    </div>
                </ul>
            </div>
            <div className="pt-2 time-sheet-stats calendar-info-column col-md-12 col-lg-3 col-xl-4">
                <p id="work_day_norm">
                    Норма рабочих дней в текущем месяце:
                    <b> {userWorkDayNorm?.working_days_norm}</b>
                </p>
                <p id="work_day_norm_worked">
                    {role !== userRoles.mentors && 'Текущее количество отработанных дней:'}
                    {role === userRoles.mentors && 'Текущее количество отработанных часов:'}
                    <b> {userWorkDayNorm?.days_worked}</b>
                </p>
            </div>
        </div>
    );
};

Calendar.propTypes = {
    dateChangeHandler: PropTypes.func,
    days: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        month: PropTypes.string,
        date: PropTypes.string,
        status: PropTypes.number,
        user: PropTypes.number,
        group: PropTypes.number,
        time_worked: PropTypes.number
    })),
    optionsValues: PropTypes.arrayOf(PropTypes.number),
    selectOptionColors: PropTypes.object,
    selectChange: PropTypes.func,
    role: PropTypes.string,
    vacation: PropTypes.bool,
};

export default Calendar;
