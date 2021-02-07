import classnames from "classnames";
import PropTypes from "prop-types";
import React, {useState} from "react";
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import Alert from "reactstrap/lib/Alert";
import Popover from "reactstrap/lib/Popover";
import PopoverBody from "reactstrap/lib/PopoverBody";
import {EMPTY_DAY_COLOR, FULL_DAY_COLOR, WEEKEND, WEEKEND_DAY_COLOR} from "../../../constants";
import {numberToTime} from "../../../services";
import "./MentorsCalendarSelect.css";

const MAX_MENTORS_TIME_WORKED = 9;
const MIN_MENTORS_TIME_WORKED = 0;
const MULTIPLICITY = 0.5;

const MentorsCalendarSelect = (
    {selectChange, day, value, isWeekend, index, date}
) => {
    const [inputValue, setInputValue] = useState(value);
    const [inputTimeOut, setInputTimeOut] = useState(0);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const openPopover = () => setPopoverOpen(true);
    const closePopover = () => setPopoverOpen(false);

    const isValidValue = value => value % MULTIPLICITY === 0;

    const fetchData = value => {
        if (inputTimeOut)
            clearTimeout(inputTimeOut);

        setInputTimeOut(setTimeout(function () {
            if (isNaN(value)) {
                setInputValue(MIN_MENTORS_TIME_WORKED);
                closePopover();
            } else {
                if (!isValidValue(value)) {
                    openPopover();
                } else {
                    day.time_worked = numberToTime(value);
                    selectChange(day, date);
                    closePopover();
                }
            }
        }, 1000));
    };

    const focusOutInputHandler = () => {
        if (!isValidValue(inputValue)) {
            const value = MIN_MENTORS_TIME_WORKED;
            setInputValue(value);
            closePopover();
            fetchData(value);
        }
    };

    const inputChangeHandler = e => {
        const value = parseFloat(e.target.value);

        if ((value <= MAX_MENTORS_TIME_WORKED) &&
            (value >= MIN_MENTORS_TIME_WORKED) ||
            isNaN(value)) {

            setInputValue(value);
            fetchData(value);
        }
    };

    return (
        <>
            <div>
                <FormGroup className='d-flex' id='mentorsSelect'>
                    <Input
                        type='number'
                        value={inputValue}
                        onChange={inputChangeHandler}
                        onBlur={focusOutInputHandler}
                        disabled={day.closed}
                        style={{
                            background: inputValue > 0 ? FULL_DAY_COLOR : EMPTY_DAY_COLOR,
                            color: ((isWeekend && day.status === WEEKEND) || day?.closed || (!isValidValue(inputValue))) ? WEEKEND_DAY_COLOR : "#fff"
                        }}
                        className={classnames("mr-1 w-100", {
                            "weekendDaySelect": (
                                (isWeekend && day.status === WEEKEND) &&
                                (inputValue <= MIN_MENTORS_TIME_WORKED) ||
                                (!isValidValue(inputValue)) ||
                                day?.closed
                            ),
                            "wrongValue": !isValidValue(inputValue)
                        })}
                        min={MIN_MENTORS_TIME_WORKED}
                        max={MAX_MENTORS_TIME_WORKED}
                        step={MULTIPLICITY}
                        id={"mentorsSelectInput-" + index}
                    />
                    <Popover placement="bottom" isOpen={popoverOpen} target={"mentorsSelectInput-" + index}>
                        <PopoverBody className='p-0 bg-danger'>
                            <Alert color="danger" className='m-0 p-2'>
                                Вы должны ввести число кратное 0.5
                            </Alert>
                        </PopoverBody>
                    </Popover>
                </FormGroup>
            </div>
        </>
    );
};

MentorsCalendarSelect.propTypes = {
    selectChange: PropTypes.func,
    day: PropTypes.object,
    value: PropTypes.string,
    isWeekend: PropTypes.bool,
    index: PropTypes.number
};

export default MentorsCalendarSelect;
