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
import {sendToVacationUser} from "../../store/acrions/user/actionsCreators";

const SendOnVacationModal = ({toggle, modal, nameModal, valueModal}) => {
    registerLocale("ru", ru);
    const twoWeeks = 14;
    const dateLength = 6;
    const dispatch = useDispatch();
    const [sendToVacation, setSendToVacation] = useState({
        vacation_date: new Date(),
        comment: "",
        invalid: false
    });

    const changeVacationDateHandler = (value, valid) => {
        if (valid === false) {
            setSendToVacation({...sendToVacation, vacation_date: null, invalid: true});
        } else {
            setSendToVacation({...sendToVacation, vacation_date: value, invalid: false});
        }
    };

    const changeCommentHandler = (e) => {
        setSendToVacation({...sendToVacation, comment: e.target.value});
    };
    const invalidDate = value => {
        const date = new Date();
        if (!(value < date.getDate() - twoWeeks && value > date && value.length < dateLength)) {
            changeVacationDateHandler(value, false);
        }
    };

    const disabled = () => {
        return (
            sendToVacation.invalid === true
        );
    };

    const submitSendOnVacation = e => {
        e.preventDefault();
        modal.sendOnVacation = false;
        const data = {
            vacation_start_date: moment(sendToVacation.vacation_date).format("YYYY-MM-DD"),
            comment: sendToVacation.comment,
            userId: valueModal.id
        };
        dispatch(sendToVacationUser(data));
    };
    return (
        <div>
            <CustomModalWindow
                toggle={toggle}
                modal={modal.sendOnVacation}
                nameModal={nameModal}
                close={"Отмена"}
                confirm={"Отпуск"}
                type={"submit"}
                button_color={"btn btn-info"}
                title={`Отправить в отпуск без содержания пользователя ${valueModal.first_name} ${valueModal.last_name}`}
                disabled={disabled()}
                onClick={submitSendOnVacation}
            >
                <FormGroup>
                    <label>Дата начала отпуска без содержания:</label>
                    <div
                        id='div-send-to-vacation-datepicker'
                        className={sendToVacation.invalid ? "in-valid-background" : "valid-background"}
                    >
                        <DatePicker
                            id='send-to-vacation-datepicker'
                            onChange={changeVacationDateHandler}
                            onChangeRaw={invalidDate}
                            selected={sendToVacation.vacation_date}
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
                    {sendToVacation.invalid &&
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

export default SendOnVacationModal;