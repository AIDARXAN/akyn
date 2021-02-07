import React, {useState} from "react";
import Input from "reactstrap/es/Input";
import InputGroup from "reactstrap/es/InputGroup";
import InputGroupAddon from "reactstrap/es/InputGroupAddon";
import InputGroupText from "reactstrap/es/InputGroupText";
import PropTypes from "prop-types";
import {Tooltip} from "reactstrap";
import MaskedInput from "react-input-mask";
import MaskedTextInput from "react-text-mask";

import "./tooltipArrowFix.css";
import FormFeedback from "reactstrap/es/FormFeedback";
import DatePicker from "react-datepicker";
import {minimumAcceptableBirthDayDate} from "../../constants";

const FormElement = (
    {
        placeholder,
        addon,
        alignPlaceholder,
        value,
        changeHandler,
        name,
        password,
        tooltip,
        valid,
        invalidText,
        mask,
        datepicker,
        formatDate,
        focus,
        placeholderOver,
        id,
        className
    }) => {
    const styles = {
        fontFamily: "Montserrat,Helvetica Neue,Arial,sans-serif",
        color: "#0b0b0b",
        fontSize: "16px",
        textAlign: alignPlaceholder,
        border: value?.length > 0 && valid !== undefined && `1px solid ${valid && valid !== undefined ? "#3DD500" : "red"}`,
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        borderTopRightRadius: addon ? "0" : "8px",
        borderBottomRightRadius: addon ? "0" : "8px"
    };

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);


    let input = (
        <Input
            autoFocus={!!focus}
            invalid={value?.length > 0 && !valid && valid !== undefined}
            type={password && "password"}
            value={value}
            onChange={e => changeHandler(e)}
            name={name}
            placeholder={placeholder ? placeholder : name}
            style={styles}
        />
    );

    if (mask) input = (
        <MaskedInput
            mask={mask}
            value={value}
            onChange={e => changeHandler(e)}
        >
            {props => (
                <Input
                    invalid={value.length > 0 && !valid && valid !== undefined}
                    type={password && "password"}
                    value={props.value}
                    name={name}
                    placeholder={placeholder}
                    style={styles}
                />
            )}
        </MaskedInput>
    );

    if (datepicker) input = (

        <DatePicker
            id={id}
            maxDate={minimumAcceptableBirthDayDate}
            selected={value}
            onChange={changeHandler}
            dateFormat={formatDate}
            locale='ru'
            placeholderText="ДД.ММ.ГГГГ"
            className={className}
            showMonthDropdown
            showYearDropdown
            customInput={
                <MaskedTextInput
                    style={{textAlign: "center"}}
                 type="text"
                 mask={[/\d/, /\d/,".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
               />
            }
        />

    );

    const form = (
        <>
            {placeholderOver &&
                    <div className='d-block'>
                        {placeholder}
                    </div>
                }
            <InputGroup className="no-border" id={name}>
                {input}

                {invalidText &&
                <FormFeedback style={{fontSize: "13px"}}><span
                    id={name + "ErrorText"}>{invalidText}</span></FormFeedback>
                }

                {addon && (
                    <InputGroupAddon addonType="append">
                        <InputGroupText className='pr-2'>
                            {addon}
                        </InputGroupText>
                    </InputGroupAddon>
                )}
            </InputGroup>

            {tooltip &&
            <Tooltip
                style={{background: "#f6f6f6", color: "#0b0b0b"}}
                placement="right"
                isOpen={tooltipOpen}
                target={name}
                toggle={toggle}
            >
                {tooltip}
            </Tooltip>
            }
        </>
    );

    return form;
};

FormElement.propTypes = {
    focus: PropTypes.bool,
    name: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    value: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    alignPlaceholder: PropTypes.oneOf(["center", "right"]),
    valid: PropTypes.bool,
    invalidText: PropTypes.string,
    mask: PropTypes.string,
    placeholderOver: PropTypes.bool
};

export default FormElement;