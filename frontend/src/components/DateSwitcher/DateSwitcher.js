import classnames from "classnames";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Tooltip} from "reactstrap";
import {convertStringDateToDate} from "../../services";
import "./dateSwitcher.css";

export const monthNames = [
        "Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август",
        "Сентябрь", "Октябрь", "Ноябрь",
        "Декабрь"
    ];

const DateSwitcher = (
    {date, changeDate, limitDateRange, vacation, currentDate, yearSwitcher, statisticCanChangeToPrevPeriod, statisticSwitcher, last_year_have}
) => {

    const user = useSelector(state => state.user.currentUser);

    const [leftTooltipOpen, setLeftTooltipOpen] = useState(false);
    const [rightTooltipOpen, setRightTooltipOpen] = useState(false);

    const toggleLeftTooltip = () => setLeftTooltipOpen(!leftTooltipOpen);
    const toggleRightTooltip = () => setRightTooltipOpen(!rightTooltipOpen);

    const dateCanChangeToPrev = () => {
        const user_activation_date = convertStringDateToDate(user?.account_activation_date);

        if (vacation === true) {
            return date > currentDate;
        }
        if(last_year_have !== undefined) return last_year_have;
        return statisticSwitcher ?
            statisticCanChangeToPrevPeriod :
            (date?.getFullYear() > (user_activation_date?.getFullYear()) ||
                date?.getFullYear() === (user_activation_date?.getFullYear()) &&
                date?.getMonth() > (user_activation_date?.getMonth())) || !limitDateRange;
    };

    const dateCanChangeToNext = () => {
        if (vacation === true) {
            const newDate = new Date();
            return date < new Date(newDate.setMonth(newDate.getMonth() + 1));
        }
        return (date.getFullYear() < new Date().getFullYear() ||
            date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() < new Date().getMonth());
    };

    // handlers to change current date
    const handlePrevDateButtonClick = () => {
        if (dateCanChangeToPrev()) {
            const newDate = !yearSwitcher ? new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()) :
                new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
            changeDate && changeDate(newDate);
        }
    };

    const handleNextDateButtonClick = () => {
        if (dateCanChangeToNext()) {
            const newDate = !yearSwitcher ? new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()) :
                new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
            changeDate && changeDate(newDate);
        }
    };


    return (
        <header className='d-flex align-items-center justify-content-between w-100 mb-4'>
            <div id='prevButton'>
                <button
                    id='prevDateButton'
                    onClick={handlePrevDateButtonClick}
                    className={classnames("btn-round btn-icon btn btn-outline-default btn-sm ml-2", {
                        "disabled": !dateCanChangeToPrev()
                    })}
                >
                    <i className='nc-icon nc-minimal-left'/>
                </button>
            </div>
            {((limitDateRange && !dateCanChangeToPrev()) ||
                (statisticSwitcher && !dateCanChangeToPrev()) ||
                    (last_year_have === false)
            ) && <Tooltip
                style={{background: "#f6f6f6", color: "#A09D9D"}}
                placement="bottom"
                isOpen={leftTooltipOpen}
                target='prevButton'
                toggle={toggleLeftTooltip}
            >
                {vacation === true ? "Вы не можете просматривать и редактировать выходные дни за прошедшие месяцы"
                    : statisticSwitcher ? "В hrm нет соответствующих данных за прошедшие периоды"
                    : last_year_have === false ? "В hrm нет данных за этот год" :
                "Вы не можете просматривать и редактировать месяцы до даты приёма в hrm"}
            </Tooltip>}
            <h2 className='font-weight-bold m-0 text-center p-0 m-0 font-size'>
                {!yearSwitcher && monthNames[date.getMonth()]} {date.getFullYear()}
            </h2>
            <div id='nextButton'>
                <button
                    id='nextDateButton'
                    onClick={handleNextDateButtonClick}
                    className={classnames("btn-round btn-icon btn btn-outline-default btn-sm ml-2", {
                        "disabled": !dateCanChangeToNext()
                    })}
                >
                    <i className='nc-icon nc-minimal-right'/>
                </button>
            </div>
            {!dateCanChangeToNext() && <Tooltip
                style={{background: "#f6f6f6", color: "#A09D9D"}}
                placement="bottom"
                isOpen={rightTooltipOpen}
                target='nextButton'
                toggle={toggleRightTooltip}
            >
                {vacation === true ? "Вы не можете просматривать и планировать выходные дни более чем на два месяца вперед"
                    : "Вы не можете просматривать и редактировать месяцы, которые ещё не наступили"}

            </Tooltip>}
        </header>

    );
};

DateSwitcher.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    changeDate: PropTypes.func,
    limitDateRange: PropTypes.bool,
    vacation: PropTypes.bool,
    currentDate: PropTypes.instanceOf(Date)
};

export default DateSwitcher;
