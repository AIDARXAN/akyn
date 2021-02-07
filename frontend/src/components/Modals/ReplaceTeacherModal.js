import React, {useEffect, useState} from "react";
import CustomModalWindow from "./CustomModalWindow";
import Select from "react-select";
import {FormGroup} from "reactstrap";
import DatePicker, {registerLocale} from "react-datepicker";
import {maskedDateInput} from "../Input/MaskedTextInput";
import "../Input/maskedTextInput.css";
import ru from "date-fns/locale/ru";
import {SUPPORTS, TEACHERS} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {replaceTeacherRequest} from "../../store/acrions/user/actionsCreators";
import moment from "moment";
import Alert from "reactstrap/es/Alert";
import {cleanUpReplaceTeacherErr} from "../../store/acrions/user/actions";

const ReplaceTeacherModal = ({toggle, modal, nameModal, users, valueModal}) => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    const startOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    registerLocale("ru", ru);

    const replacementError = useSelector(state => state.user.replaceTeacherError)

    const [teachers, setTeachers] = useState([]);
    const [supports, setSupports] = useState([]);

    const DATE_LENGTH = 6;

    const [replaceTeacher, setReplaceTeacher] = useState({
        teacher: valueModal.id,
        support: null,
        replacement_date: null,
        comment: null,
        group: null,
        invalid: false,
        datepickerCssClass: "empty-background"
    });

    const replaceCanHappen = !(replaceTeacher.teacher &&
        replaceTeacher.support &&
        replaceTeacher.replacement_date);

    useEffect(() => {
        dispatch(cleanUpReplaceTeacherErr());
        users.map((u, i) => {
            const role = u.groups.find(data => {
                return data.name === TEACHERS || data.name === SUPPORTS;
            });
            if (role !== undefined) {
                if (role.name === TEACHERS) {
                    teachers.push({
                        value: u.id,
                        label: u.first_name + " " + u.last_name
                    });
                }
                if (role.name === SUPPORTS) {
                    supports.push({
                        value: u.id,
                        label: u.first_name + " " + u.last_name
                    });
                }
            }
        });
    }, []);

    const teacherHandler = value => {
        setReplaceTeacher({
            ...replaceTeacher, teacher: value.value
        });
    };

    const supportHandler = value => {
        setReplaceTeacher({
            ...replaceTeacher, support: value.value
        });
    };

    const replaceDateHandler = (value, valid) => {
        if (valid === false) {
            setReplaceTeacher({
                ...replaceTeacher,
                replacement_date: null,
                invalid: true,
                datepickerCssClass: "in-valid-background"
            });
        } else {
            setReplaceTeacher({
                ...replaceTeacher,
                replacement_date: value,
                invalid: false,
                datepickerCssClass: "valid-background"
            });
        }
    };

    const changeCommentHandler = (e) => {
        setReplaceTeacher({...replaceTeacher, comment: e.target.value});
    };

    const replaceDateHandlerRaw = value => {
        if (!(value < startOfTheMonth && value > endOfTheMonth && value.length < DATE_LENGTH)) {
            setReplaceTeacher({...replaceTeacher, datepickerCssClass: "in-valid-background"});
            replaceDateHandler(value, false);
        }
    };

    const submitRequest = async (e) => {
        e.preventDefault();

        const data = {
            teacher: replaceTeacher.teacher,
            support: replaceTeacher.support,
            comment: replaceTeacher.comment,
            replacement_date: moment(replaceTeacher.replacement_date).format("YYYY-MM-DD")
        };

        await dispatch(replaceTeacherRequest(data));
        modal.replace = false;
    };

    return replaceTeacher && (
        <div>
            <CustomModalWindow
                toggle={toggle}
                modal={modal.replace}
                nameModal={nameModal}
                close={"Отмена"}
                confirm={"Сохранить"}
                button_color={"btn btn-info"}
                onClick={submitRequest}
                title={"Замена преподавателя"}
                disabled={replaceCanHappen}
            >
                <FormGroup>
                    <label>Заменить:</label>
                    <div id='select-teacher'>
                        <Select
                            placeholder=''
                            defaultValue={{
                                label: valueModal.first_name + " " + valueModal.last_name,
                                value: valueModal.id
                            }}
                            options={teachers}
                            onChange={teacherHandler}
                            isDisabled={true}
                        />
                        <br/>
                    </div>

                    <label>На:</label>
                    <div id='select-support'>
                        <Select
                            placeholder=''
                            options={supports}
                            onChange={supportHandler}
                        />
                        <br/>
                    </div>

                    <label>Дата:</label>
                    <div id='replacement-date'
                         className={replaceTeacher.datepickerCssClass}>
                        <DatePicker
                            onChange={replaceDateHandler}
                            onChangeRaw={replaceDateHandlerRaw}
                            selected={replaceTeacher.replacement_date}
                            minDate={startOfTheMonth}
                            maxDate={endOfTheMonth}
                            isClearable={true}
                            dateFormat="dd.MM.yyyy"
                            locale='ru'
                            placeholderText="ДД.ММ.ГГГГ"
                            showMonthDropdown
                            showYearDropdown
                            customInput={maskedDateInput()}
                        />
                    </div>
                    {replaceTeacher.invalid &&
                    <span style={{
                        fontSize: "13px",
                        color: "#DC3556"
                    }}>Вы не можете ввести дату которая еще не наступила</span>}

                </FormGroup>
                <FormGroup>
                    <label>Комментарий:</label>
                    <textarea
                        className='form-control'
                        onChange={changeCommentHandler}
                    />
                </FormGroup>
                {replacementError && <Alert color="danger">{"Замена на эту дату уже произведена"}</Alert>}
            </CustomModalWindow>
        </div>
    );
};

export default ReplaceTeacherModal;