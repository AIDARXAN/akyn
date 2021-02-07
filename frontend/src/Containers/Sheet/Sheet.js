import classnames from "classnames";
import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";
import Calendar from "../../components/Calendar/Calendar";
import DateSwitcher from "../../components/DateSwitcher/DateSwitcher";
import {WEEKEND, WORK_DAY} from "../../constants";
import {convertWorkDayTimeToCorrectValue, timeStringToFloat} from "../../services";
import "./sheet.css";

const WEEK_DAYS = 5;
const FIRST_DATE_OF_MONTH = 1;


const Sheet = forwardRef((
    {dateChangeHandler, weekend, days, mentors, vacation},
    ref
) => {
    const currentDate = new Date();
    const [date, setDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), FIRST_DATE_OF_MONTH));

    const numberOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + 1;
    const daysNumbers = [];
    for (let i = 1; i < numberOfDays; i++)
        daysNumbers.push(i);

    const changeDate = date => {
        setDate(date);
        dateChangeHandler && dateChangeHandler(date);
    };

    const getDayOfWeek = day => new Date(
        date.getFullYear(),
        date.getMonth(),
        day
    ).getDay();

    const percentOfSideColumns = 12;
    const percentOfCenterColumns = 100 - (percentOfSideColumns * 2);

    let validDays = days?.map(userObject => {
        userObject.work_days.map(day => {
            let time = typeof day.time_worked === "string" ? parseInt(day.time_worked?.slice(0, 2)) : day.time_worked;

            day.time_worked = !mentors ?
                convertWorkDayTimeToCorrectValue(day.group, time) :
                typeof day.time_worked === "string" ?
                    timeStringToFloat(day.time_worked) : 0;

            return day;
        });
        return userObject;
    });

    return (
        <div className='sheet p-4 card' ref={ref}>
            <DateSwitcher
                date={date}
                changeDate={changeDate}
                vacation={vacation}
                currentDate={currentDate}
            />
            <div>
                <div className="tableHeader">
                    <ul className='d-flex list-unstyled justify-content-between m-0'>
                        <li
                            className="text-uppercase sheetHeader font-weight-bold py-1 textSize"
                            style={{width: percentOfSideColumns + "%"}}>
                            Имя
                        </li>
                        {daysNumbers.map((number, index) => {
                            const dayOfWeek = getDayOfWeek(index) + 1;
                            return (
                                <li className={classnames("py-1 sheetHeader font-weight-bold flex-fill text-center textSize sheetItem", {
                                    "weekDay": dayOfWeek > WEEK_DAYS
                                })}
                                    style={{width: `calc(${percentOfCenterColumns}% / ${numberOfDays})`}}
                                    key={number}
                                >{number}</li>);
                        })}
                        {weekend ? null :
                            <li
                                className="text-uppercase sheetHeader font-weight-bold py-1 textSize text-center"
                                style={{width: percentOfSideColumns + "%"}}>
                                Всего
                            </li>
                        }
                    </ul>
                    <ul className='list-unstyled'>
                        {validDays && validDays.map(user => {
                            let periods_closed = user?.work_days[0]?.closed
                            const isCurrentMonth = (date.getMonth() === currentDate.getMonth() &&
                                date.getFullYear() === currentDate.getFullYear());
                            let replaced = 0;
                            let total_replacements = 0;
                            return (
                                <li key={user.id + user.email}>
                                    <ul className='d-flex list-unstyled justify-content-between'>
                                        <li
                                            className={classnames("py-1 textSize", {
                                                "greenBackground": periods_closed
                                            })}
                                            style={{width: percentOfSideColumns + "%"}}>
                                            {`${user.user.first_name} ${user.user.last_name}`}
                                        </li>
                                        {user.work_days.map((day) => {
                                            const itemDate = parseInt(day?.date.slice(-2));
                                            const dayOfWeek = getDayOfWeek(itemDate - 1) + 1;
                                            replaced = day.replaced === true ? 1 : 0
                                            total_replacements += replaced
                                            periods_closed = day?.closed
                                            return (
                                                <li className={classnames("flex-fill textSize sheetItem d-flex align-items-center", {
                                                    "workDay": weekend === true && day.status === WORK_DAY,
                                                    "weekDay": dayOfWeek > WEEK_DAYS && weekend === undefined,
                                                    "vacationWeekDay": dayOfWeek > WEEK_DAYS && weekend === true && day.status === WEEKEND,
                                                    "greenBackground": periods_closed && weekend === undefined,
                                                    "dayOff": weekend === true && day.status === WEEKEND && dayOfWeek <= WEEK_DAYS
                                                })}
                                                    style={{width: `calc(${percentOfCenterColumns}% / ${numberOfDays})`}}
                                                    key={day.id}
                                                >
                                                    <div className='w-100 text-center'>
                                                        {weekend ? (day.status === WEEKEND ? "В" : "Р") :  day.time_worked + replaced}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                        {weekend ? null : <li
                                            className={classnames("py-1 textSize font-weight-bold d-flex align-items-center", {
                                                "greenBackground": periods_closed
                                            })}
                                            style={{width: percentOfSideColumns + "%"}}
                                        >
                                            <div className='w-100 text-center'>
                                                {user.work_days.reduce((a, c) => a + c.time_worked, 0) + total_replacements}
                                            </div>
                                        </li>}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
});

Calendar.propTypes = {
    dateChangeHandler: PropTypes.func,
    weekend: PropTypes.bool,
    days: PropTypes.object,
    mentors: PropTypes.bool,
};

export default Sheet;