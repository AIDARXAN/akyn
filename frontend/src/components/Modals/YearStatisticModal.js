import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getYearStatistic} from "../../store/acrions/Statistic/actionsCreators";
import DateSwitcher, {monthNames} from "../DateSwitcher/DateSwitcher";
import "./modals.css";
import SimpleModal from "./SimpleModal";

const YearStatisticModal = (
    {user, isOpen, toggle, defaultDate}
) => {

    const dispatch = useDispatch();

    const [date, setDate] = useState(defaultDate);

    const yearStatisticData = useSelector(state => state.statistic.yearStatistic);

    const changeDate = date => {
        setDate(date)
        dispatch(getYearStatistic(date.getFullYear(), user.id));
    };

    useEffect(() => {
        setDate(defaultDate)
        if (isOpen && user)
            dispatch(getYearStatistic(defaultDate.getFullYear(), user.id));
    }, [isOpen]);

    const title = `Годовая статистика пользователя ${user?.first_name} ${user?.last_name}`;
    const tableHeaderItems = ["Месяц", "Норма", "Отработал", "Часов наставничества"];

    let workingDaysNormTotal = 0;
    let daysWorkedTotal = 0;
    let mentorHoursWorkedTotal = 0;

    return (
        <SimpleModal
            isOpen={isOpen}
            toggle={toggle}
            title={title}
        >
            {yearStatisticData ? <>
                <DateSwitcher
                    date={date}
                    statisticCanChangeToPrevPeriod={yearStatisticData.prevYearIsHaveStatistic}
                    changeDate={changeDate}
                    yearSwitcher
                    statisticSwitcher
                />
                <table className='w-100'>
                    <thead>
                    <tr className='w-100 border-bottom'>
                        {tableHeaderItems.map(item => (
                            <th className='text-uppercase yearStatisticItem'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {yearStatisticData.yearData.map(month => {
                        const monthIndex = parseInt(month.month.date.slice(5, 7)) - 1;
                        const workingDaysNorm = month.working_days_norm;
                        const daysWorked = month.days_worked;
                        let mentorHours = null;
                        const mentorStatistic = yearStatisticData.yearData.find(stat => (
                            stat?.user?.id === user?.id
                            && month?.month?.id === stat?.month?.id
                            && stat?.additional_group
                            && stat?.id !== month?.id
                        ));


                        if (mentorStatistic)
                            mentorHours += mentorStatistic.days_worked;
                        mentorHoursWorkedTotal += mentorHours;

                        workingDaysNormTotal += workingDaysNorm;
                        daysWorkedTotal += daysWorked;

                        return !month.additional_group && (
                            <tr className='border-bottom'>
                                <th className='yearStatisticItem font-weight-light'>{monthNames[monthIndex]}</th>
                                <th className='yearStatisticItem font-weight-light'>{workingDaysNorm}</th>
                                <th className='yearStatisticItem font-weight-light'>{daysWorked}</th>
                                <th className='yearStatisticItem font-weight-light'>{mentorHours}</th>
                            </tr>
                        );
                    })}
                    <tr>
                        <th className='yearStatisticItem font-weight-light'>Итого</th>
                        <th className='yearStatisticItem font-weight-light'>{workingDaysNormTotal}</th>
                        <th className='yearStatisticItem font-weight-light'>{daysWorkedTotal}</th>
                        <th className='yearStatisticItem font-weight-light'>{mentorHoursWorkedTotal}</th>
                    </tr>
                    </tbody>
                </table>
            </> : <p>Подождите...</p>}
        </SimpleModal>
    );
};

YearStatisticModal.propTypes = {
    user: PropTypes.object,
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};

export default YearStatisticModal;