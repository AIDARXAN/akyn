import React, {useState} from "react";
import CustomModalWindow from "./CustomModalWindow";
import DatePicker from "react-datepicker";
import {useDispatch} from "react-redux";
import subDays from "date-fns/subDays";
import {maskedDateInput} from "../Input/MaskedTextInput";
import "../Input/maskedTextInput.css";
import moment from "moment";
import {fireUserRequest} from "../../store/acrions/user/actionsCreators";
import FormGroup from "reactstrap/es/FormGroup";

const ToFireUserModal = ({toggle, modal, nameModal, valueModal, nestedModal}) => {
    const dispatch = useDispatch();
    const styles = {
        backgroundColor: "#F5725A",
        borderColor: "#F5725A"
    };
    const [fireUser, setFireUser] = useState({
        fired_at: new Date(),
        invalid: false,
    });

    const changeFiredDateHandler = (value, valid) => {
        if (valid === false) {
            setFireUser({...fireUser, fired_at: null, invalid: true});
        } else {
            setFireUser({...fireUser, fired_at: value, invalid: false});
        }
    };


    const invalidDate = value => {
        const date = new Date();
        if (!(value < date.getDate() - 14 && value > date && value.length < 6)) {
            changeFiredDateHandler(value, false);
        }
    };
    const submitFireDate = e => {
        e.preventDefault();
        modal.toFireUser = false;
        modal.confirmModal = false;
        const data = {
            fired_at: moment(fireUser.fired_at).format("YYYY-MM-DD"),
            userId: valueModal.id
        };
        dispatch(fireUserRequest(data));
    };

    const disabled = () => {
        return (
            !!Object.keys(fireUser).find(e => fireUser[e] === "") ||
            fireUser.invalid === true
        );
    };

    return (
        <div>
            <CustomModalWindow
                toggle={toggle}
                modal={modal.toFireUser}
                nameModal={nameModal}
                type={"button"}
                close={"Отмена"}
                confirm={"Уволить"}
                button_color={"btn btn-danger"}
                title={`Уволить пользователя ${valueModal.first_name} ${valueModal.last_name}`}
                onClick={() => {toggle(nestedModal);}}
                disabled={disabled()}
            >
                <FormGroup>
                    <label>Дата увольнения:</label>
                    <div id='div-datepicker-fire-user' className={fireUser.invalid ? "in-valid-background" : "valid-background"}>
                        <DatePicker
                            id='fire-datepicker'
                            style={styles}
                            onChange={changeFiredDateHandler}
                            onChangeRaw={invalidDate}
                            selected={fireUser.fired_at}
                            minDate={subDays(new Date(), 14)}
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
                </FormGroup>
            </CustomModalWindow>
            {modal.confirmModal && <CustomModalWindow
                toggle={toggle}
                modal={modal.confirmModal}
                nameModal={nestedModal}
                type={"submit"}
                close={"Отмена"}
                confirm={"Уволить"}
                button_color={"btn btn-danger"}
                onClick={submitFireDate}
            >
                <p>{`Вы уверены, что хотите уволить пользователя ${valueModal.first_name} ${valueModal.last_name}? Это действие невозможно будет отменить.`}</p>
            </CustomModalWindow>}
        </div>
    );
};
export default ToFireUserModal;