import React, {useState} from "react";
import FormElement from "../../components/FormElement/FormElement";
import Button from "reactstrap/es/Button";
import moment from "moment";
import {editProfile} from "../../store/acrions/user/actionsCreators";
import {useDispatch, useSelector} from "react-redux";
import Modal from "reactstrap/es/Modal";
import PasswordChangeForms from "./PasswordChangeForms";
import "react-datepicker/dist/react-datepicker.css";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import Alert from "reactstrap/es/Alert";
import {minimumAcceptableBirthDayDate} from "../../constants";

const UserChangeForms = props => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.editProfileError);

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const regex = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phoneMask: /\+\(996\)[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/,
        phone: /[0-9]{12}/,
        birth_date: /[0-9]{4}-[0-9]{2}-[0-9]{2}/
    };

    const [user, setUser] = useState({
        email: props.userInfo.email,
        phone: props.userInfo.phone,
        first_name: props.userInfo.first_name,
        last_name: props.userInfo.last_name,
        birth_date: props.userInfo.birth_date ? new Date(props.userInfo.birth_date) : minimumAcceptableBirthDayDate
    });

    const changeHandler = e => {
        let reg = /[^A-Za-z0-9@.]/ig;
        if (e.target.name === "email") reg = null;
        const value = e.target.value.replace(reg, "");
        setUser({...user, [e.target.name]: value});
    };
    const changePhone = e => setUser({...user, [e.target.name]: e.target.value});
    const changeBirth = e => setUser({...user, birth_date: e});
    const onlyRussian = e => setUser({...user, [e.target.name]: e.target.value.replace(/[^А-Яа-я]/ig, "")});

    const changeUserSubmit = e => {
        e.preventDefault();
        const userInfo = {...user, birth_date: moment(user.birth_date).format("yyyy-MM-DD")};
        userInfo.phone = userInfo.phone.replace(/[+()-]/ig, "");

        dispatch(editProfile(userInfo, props.closeModal));
    };

    const submitDisabled = !!Object.keys(user).find(e => user[e] === "") ||
        !regex.email.test(user.email) ||
        (!regex.phone.test(user.phone) &&
            !regex.phoneMask.test(user.phone));
    return (
        <div>
            <div
                id='edit-profile-header'
                style={{
                    color: "#00b0ba",
                    textAlign: "center",
                    padding: "15px",
                    borderBottom: "1px solid black",
                    borderColor: "#ccc"
                }}><b>РЕДАКТИРОВАТЬ ПРОФИЛЬ</b></div>
            <form style={{padding: "20px 15px 10px 15px"}}>
                <FormElement
                    focus
                    valid={regex.email.test(user.email)}
                    invalidText={"Адрес электронной почты должен быть введен на латинице, содержать символ @ и часть адреса после него"}
                    name='email'
                    placeholder='Email'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={user.email}
                    placeholderOver
                    tooltip={"Email должен быть введен латинскими буквами и содержать символ \"@\""}
                />

                <FormElement
                    valid={regex.phone.test(user.phone) || regex.phoneMask.test(user.phone)}
                    invalidText={"Телефон должен быть указан в формате +(996)ххх-хх-хх-хх"}
                    name='phone'
                    mask="+(\9\96)999-99-99-99"
                    placeholder='Телефон'
                    alignPlaceholder='center'
                    changeHandler={changePhone}
                    value={user.phone}
                    tooltip="Телефонный номер должен содержать только цифры"
                    placeholderOver
                />

                <FormElement
                    valid={user.first_name.length >= 3}
                    name='first_name'
                    placeholder='Имя'
                    alignPlaceholder='center'
                    changeHandler={onlyRussian}
                    value={user.first_name}
                    tooltip="Введите имя, используя только кириллицу"
                    placeholderOver
                />

                <FormElement
                    valid={user.last_name.length >= 3}
                    name='last_name'
                    placeholder='Фамилия'
                    alignPlaceholder='center'
                    changeHandler={onlyRussian}
                    value={user.last_name}
                    tooltip="Введите фамилию, используя только кириллицу"
                    placeholderOver
                />

                <FormElement
                    id='date-birthday'
                    datepicker
                    formatDate='dd.MM.yyyy'
                    name='birth_date'
                    placeholder='Дата рождения'
                    alignPlaceholder='center'
                    changeHandler={changeBirth}
                    value={user.birth_date}
                    tooltip="Выберите дату вашего рождения"
                    placeholderOver
                    className={props.animate ?"animate-input":""}
                />
            </form>

            <div style={{padding: "0 15px"}}>
                {error &&
                <>{
                    typeof error === "object" || typeof error === "string" ?
                        <ErrorAlert error={error}/> :
                        <Alert color="danger">Something error</Alert>
                }</>
                }
            </div>

            <button
                className="edit-btn ml-3 mb-3"
                id="edit-password-btn"
                onClick={toggleModal}
            >
                Изменить пароль
            </button>

            <div style={{
                color: "#00b0ba",
                textAlign: "right",
                padding: "15px",
                borderTop: "1px solid black",
                borderColor: "#ccc"
            }}>
                <Button onClick={props.closeModal}>Отмена</Button> {" "}
                <Button
                    id='registrationSubmit'
                    disabled={
                        submitDisabled
                    }
                    style={{opacity: submitDisabled && "0.4"}}
                    className={`${!submitDisabled ? "bg-info" : "bg-secondary"}`}
                    onClick={changeUserSubmit}
                >
                    Сохранить</Button>
            </div>

            <Modal
                isOpen={modal}
                toggle={toggleModal}
                centered={true}
            >
                <PasswordChangeForms
                    closeModal={toggleModal}
                    userInfo={user}
                />
            </Modal>
        </div>
    );
};

export default UserChangeForms;