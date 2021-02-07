import React, {useEffect, useState} from "react";
import CustomModalWindow from "./CustomModalWindow";
import DatePicker, {registerLocale} from "react-datepicker";
import ru from "date-fns/locale/ru";
import {useDispatch} from "react-redux";
import {activateUser} from "../../store/acrions/ActivateUser/actionsCreators";
import subDays from "date-fns/subDays";
import {FormGroup} from "reactstrap";
import moment from "moment";
import "../Checkbox/checkbox.css";
import {maskedDateInput} from "../Input/MaskedTextInput";
import "../../components/Input/maskedTextInput.css";
import {userAdditionalRolesRus, userRolesRus} from "../../constants";


const ActivateUserModal = (
    {
        toggle,
        modal,
        nameModal,
        nestedNameModal,
        valueModal,
        userRight,
        userClass,
        additional_roles,
        roles
    }) => {
    const dispatch = useDispatch();
    const TWO_WEEKS = 14;
    const DATE_LENGTH = 6;
    const [userActivation, setUserActivation] = useState({
        activationDate: null,
        employmentDate: null,
        groups: [],
        activationDateInValid: false,
        employmentDateInValid: false,
    });

    const [classes, setClass] = useState([]);
    const [rights, setRights] = useState([]);
    useEffect(() => {
        setClass(roles.map(d => {
            const role = userClass.find(data => {
                return data.name === d.name;
            });
            return {
                select: role?.name === d.name,
                id: d.id,
                name: userRolesRus[d.name]
            };
        }));
        setRights(additional_roles.map(d => {
            return {
                select: userRight !== null ? userRight.name === d.name : false,
                id: d.id,
                name: userAdditionalRolesRus[d.name]
            };
        }));
    }, []);

    const changeActivationDateHandler = (value, valid) => {
        if (valid === false) {
            setUserActivation({...userActivation, activationDate: null, activationDateInValid: true});
        } else {
            setUserActivation({...userActivation, activationDate: value, activationDateInValid: false});
        }
    };

    const changeEmploymentDateHandler = (value, valid) => {
        if (valid === false) {
            setUserActivation({...userActivation, employmentDate: null, employmentDateInValid: true});
        } else {
            setUserActivation({...userActivation, employmentDate: value, employmentDateInValid: false});
        }
    };

    const invalidActivationDate = value => {
        const date = new Date();
        if (!(value < date.getDate() - TWO_WEEKS && value > date && value.length < DATE_LENGTH)) {
            changeActivationDateHandler(value, false);
        }
    };

    const invalidEmploymentDate = value => {
        const date = new Date();
        if (!(value > date && value.length < DATE_LENGTH)) {
            changeEmploymentDateHandler(value, false);
        }
    };
    registerLocale("ru", ru);

    const submitActivation = e => {
        e.preventDefault();
        const new_class = getGroup(classes);
        const new_right = getGroup(rights);
        const data = {
            activationDate: moment(userActivation.activationDate).format("YYYY-MM-DD"),
            employmentDate: moment(userActivation.employmentDate).format("YYYY-MM-DD"),
            new_group: new_class === undefined ? null : new_class.id,
            additional_group: new_right === undefined ? null : new_right.id,
            userId: valueModal.id
        };
        dispatch(activateUser(data));
        modal.activationUser = false;
        modal.confirmActivationUser = false;
    };

    const getGroup = (group) => {
        return group.find((u, i) => {
            if (u.select === true) {
                return u.id;
            }
        });
    };

    const disabled = () => {
        let userClasses = classes.map((u, i) => {
            if (u.select === true ) {
                return  u.id;
            }
        }).filter(function (value, index, arr) {
            return value !== undefined;
        });
        return (
            !!Object.keys(userActivation).find(e => userActivation[e] === "") ||
            !userActivation.activationDate ||
            !userActivation.employmentDate ||
            userClasses.length === 0
        );
    };
    return (
        <div>
            <CustomModalWindow
                toggle={toggle}
                modal={modal.activationUser}
                title={`Активация пользователя ${valueModal.first_name} ${valueModal.last_name}`}
                button_color={"btn btn-success"}
                onClick={() => {
                    toggle(nestedNameModal);
                }}
                type={"button"}
                disabled={disabled()}
                nameModal={nameModal}
                close={"Отмена"}
                confirm={"Активировать"}
            >
                <FormGroup>
                    <label>Дата приема на работу</label>
                    <div
                        className={userActivation.employmentDateInValid ? "in-valid-background" : "valid-background"}
                    >
                        <DatePicker
                            id='employment-datepicker'
                            onChange={changeEmploymentDateHandler}
                            onChangeRaw={invalidEmploymentDate}
                            selected={userActivation.employmentDate}
                            maxDate={new Date()}
                            dateFormat="dd.MM.yyyy"
                            locale='ru'
                            placeholderText="ДД.ММ.ГГГГ"
                            showMonthDropdown
                            showYearDropdown
                            customInput={maskedDateInput()}
                            isClearable={true}
                        />
                    </div>
                    {userActivation.employmentDateInValid &&
                    <span style={{
                        fontSize: "13px",
                        color: "#DC3556"
                    }}>Вы не можете ввести дату которая еще не наступила</span>}
                </FormGroup>
                <FormGroup>
                    <label>Дата приема в систему hrm</label>
                    <div
                        className={userActivation.activationDateInValid ? "in-valid-background" : "valid-background"}
                    >
                        <DatePicker
                            id='activate-datepicker'
                            onChange={changeActivationDateHandler}
                            onChangeRaw={invalidActivationDate}
                            selected={userActivation.activationDate}
                            minDate={subDays(new Date(), TWO_WEEKS)}
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
                    {userActivation.activationDateInValid &&
                    <span style={{fontSize: "13px", color: "#DC3556"}}>Введите дату в пределах двух недель</span>}
                </FormGroup>
                <FormGroup>
                    <p>Выберите тип юзера:</p>
                    {classes.map((d, i) => (
                        <div className="custom-control custom-checkbox" key={d.id}>

                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={d.name}
                                onChange={(e) => {
                                    let checked = true;
                                    setClass(classes.find(data => {
                                        if (data.select === true)
                                            data.select = false;
                                    }));
                                    setClass(classes.map((data) => {
                                        if (d.id === data.id) {
                                            data.select = checked;
                                        }
                                        return data;
                                    }));
                                }}
                                checked={d.select}

                            />
                            <label
                                className="custom-control-label"
                                htmlFor={d.name}
                            >{d.name}</label>
                        </div>))}
                    <br/>
                    <p>Выберите дополнительные права:</p>
                    {rights.map((d, i) => (
                        <div className="custom-control custom-checkbox" key={d.id}>

                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={d.name}
                                onChange={(e) => {
                                    let checked = e.target.checked;
                                    setRights(rights.find(data => {
                                        if (data.select === true)
                                            data.select = false;
                                    }));
                                    setRights(rights.map((data) => {
                                        if (d.id === data.id) {
                                            data.select = checked;
                                        }
                                        return data;
                                    }));
                                }}
                                checked={d.select}

                            />
                            <label
                                className="custom-control-label"
                                htmlFor={d.name}
                            >{d.name}</label>
                        </div>))}
                </FormGroup>
            </CustomModalWindow>
            {modal.confirmActivationUser && <CustomModalWindow
                toggle={toggle}
                modal={modal.confirmActivationUser}
                nameModal={nestedNameModal}
                button_color={"btn btn-success"}
                onClick={submitActivation}
                type={"submit"}
                close={"Отмена"}
                confirm={"Активировать"}
            >
                <div>Проверьте верность указанной даты приема в hrm.
                    Эту дату нельзя будет поменять после активации!
                    <br/>Вы указали {moment(userActivation.activationDate).format("DD.MM.YYYY")}
                </div>
            </CustomModalWindow>
            }
        </div>
    );
};

export default ActivateUserModal;