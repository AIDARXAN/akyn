import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import {WEEKEND} from "../../../constants";

const CalendarSelect = (
    {color, selectChange, day, value, optionsValues, isWeekend, index, date}
) => {
    if (day.time_worked > 1)
        optionsValues = [0, 1, 2]
    return (
        <FormGroup>
            <Input
                type="select" name="select"
                id={"select" + index}
                disabled={day.closed}
                style={{background: color, color: (isWeekend && day.status === WEEKEND) || day?.closed ? "#343a40" : "#fff"}}
                className={classnames("", {
                    "weekendDaySelect": (isWeekend && day.status === WEEKEND) || day.closed
                })}
                value={value}
                onChange={e => selectChange && selectChange(e, day, date)}
            >
                {optionsValues.map((option, index) => <option id={"num" + index} key={index}>{option}</option>)}
            </Input>
        </FormGroup>
    );
};

CalendarSelect.propTypes = {
    color: PropTypes.string.isRequired,
    selectChange: PropTypes.func,
    day: PropTypes.shape({
        id: PropTypes.number,
        month: PropTypes.string,
        date: PropTypes.string,
        status: PropTypes.number,
        user: PropTypes.number,
        group: PropTypes.string,
        time_worked: PropTypes.number
    }).isRequired,
    optionsValues: PropTypes.arrayOf(PropTypes.number).isRequired,
    isWeekend: PropTypes.bool.isRequired
};

export default CalendarSelect;