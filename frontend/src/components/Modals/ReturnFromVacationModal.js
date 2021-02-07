import React, {useState} from "react";
import CustomModalWindow from "./CustomModalWindow";
import DatePicker, {registerLocale} from "react-datepicker";
import subDays from "date-fns/subDays";
import {maskedDateInput} from "../Input/MaskedTextInput";
import FormGroup from "reactstrap/es/FormGroup";
import "../../components/Input/maskedTextInput.css";
import {useDispatch} from "react-redux";
import ru from "date-fns/locale/ru";
import moment from "moment";
import {returnFromVacationUser} from "../../store/acrions/user/actionsCreators";

const ReturnFromVacationModal = ({toggle, modal, nameModal, valueModal}) => {
    registerLocale("ru", ru);
    const twoWeeks = 14;
    const dateLength = 6;
    const dispatch = useDispatch();
    const [returnFromVacation, setReturnFromVacation] = useState({
        vacation_date: new Date(),
        comment: "",
        invalid: false
    });

    const changeVacationDateHandler = (value, valid) => {
        if (valid === false) {
            setReturnFromVacation({...returnFromVacation, vacation_date: null, invalid: true});
        } else {
            setReturnFromVacation({...returnFromVacation, vacation_date: value, invalid: false});
        }
    };

    const changeCommentHandler = (e) => {
        setReturnFromVacation({...returnFromVacation, comment: e.target.value});
    };
    const invalidDate = value => {
        const date = new Date();
        if (!(value < date.getDate() - twoWeeks && value > date && value.length < dateLength)) {
            changeVacationDateHandler(value, false);
        }
    };

    const disabled = () => {
        return (
            returnFromVacation.invalid === true
        );
    };

    const submitReturnFromVacation = e => {
        e.preventDefault();
        modal.returnFromVacation = false;
        const data = {
            vacation_end_date: moment(returnFromVacation.vacation_date).format("YYYY-MM-DD"),
            comment: returnFromVacation.comment,
        };
        dispatch(returnFromVacationUser(data, valueModal.id));
    };
    return (
        <div>
            <CustomModalWindow
                toggle={toggle}
                modal={modal.returnFromVacation}
                nameModal={nameModal}
                close={"Отмена"}
                confirm={"Из отпуска"}
                type={"submit"}
                button_color={"btn btn-info"}
                title={`Вернуть из отпуска пользователя ${valueModal.first_name} ${valueModal.last_name}`}
                disabled={disabled()}
                onClick={submitReturnFromVacation}
            >
                <FormGroup>
                    <label>Дата возвращения из отпуска без содержания:</label>
                    <div
                        id='div-send-to-vacation-datepicker'
                        className={returnFromVacation.invalid ? "in-valid-background" : "valid-background"}
                    >
                        <DatePicker
                            id='send-to-vacation-datepicker'
                            onChange={changeVacationDateHandler}
                            onChangeRaw={invalidDate}
                            selected={returnFromVacation.vacation_date}
                            minDate={subDays(new Date(), twoWeeks)}
                            maxDate={new Date()}
                            isClearable={true}
                            dateFormat="dd.MM.yyyy"
                            locale='ru'
                            placeholderText="ДД.ММ.ГГГГ"
                            showMonthDropdown
                            showYearDropdown
                            customInput={maskedDateInput()}
                        />
                    </div>
                    {returnFromVacation.invalid &&
                    <span style={{fontSize: "13px", color: "#DC3556"}}>Введите дату в пределах двух недель</span>}
                </FormGroup>
                <FormGroup>
                    <label>Комментарий:</label>
                    <textarea
                        className='form-control'
                        onChange={changeCommentHandler}
                    />
                </FormGroup>
            </CustomModalWindow>
        </div>
    );
};

export default ReturnFromVacationModal;