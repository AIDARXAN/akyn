import React, {useState} from "react";
import FormElement from "../../components/FormElement/FormElement";
import Button from "reactstrap/es/Button";
import {editUserProfilePassword} from "../../store/acrions/user/actionsCreators";
import {useDispatch, useSelector} from "react-redux";
import {password_errors} from "../../constants";

const PasswordChangeForms = props => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.editUserProfilePasswordError);

    const [password, setPassword] = useState({
        old_password: "",
        password1: "",
        password2: ""
    });

    const changeHandler = e => {
        let reg = /[^A-Za-z0-9@.]/ig;
        if (e.target.name === "password") reg = null;
        const value = e.target.value.replace(reg, "");
        setPassword({...password, [e.target.name]: value});
    };

    const changeUserSubmit = e => {
        e.preventDefault();
        const data = {
            old_password: password.old_password,
            new_password1: password.password1,
            new_password2: password.password2
        };

        dispatch(editUserProfilePassword(data, props.closeModal));
    };

    const submitDisabled = !!Object.keys(password).find(e => password[e] === "") ||
        password.password1.length < 5 ||
        password.password1 !== password.password2;

    const returnError = error => {
        if (error?.old_password) return password_errors[error.old_password]
        if (error?.message) return password_errors[error.message[0]]
    }

    return (
        <div>
            <div style={{
                color: "#00b0ba",
                textAlign: "center",
                padding: "15px",
                borderBottom: "1px solid black",
                borderColor: "#ccc"
            }}><b>ИЗМЕНИТЬ ПАРОЛЬ</b></div>
            <form style={{padding: "20px 15px 10px 15px"}}>
                <FormElement
                    focus
                    password
                    name='old_password'
                    placeholder='Старый пароль'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={password.old_password}
                    placeholderOver
                    tooltip={"Введите ваш старый пароль"}
                />

                <FormElement
                    password
                    valid={password.password1.length >= 5 && error === undefined}
                    name='password1'
                    placeholder='Новый пароль'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={password.password1}
                    placeholderOver
                    tooltip={"Пароль должен содержать не менее 5 символов"}
                />
                {
                    !password.password1.length >= 5 && <span style={{
                        fontSize: "13px",
                        color: "#DC3556"
                    }}>Пароль не может быть короче 5 символов</span>
                }
                {
                    error && <span style={{
                        fontSize: "13px",
                        color: "#DC3556"
                    }}>{returnError(error)}</span>
                }


                <FormElement
                    password
                    valid={password.password1 === password.password2 && password.password1.length >= 5}
                    invalidText={"Пароль не соответствует введенному выше"}
                    name='password2'
                    placeholder='Повторите новый пароль'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={password.password2}
                    placeholderOver
                    tooltip={"Повторите новый пароль"}
                />

            </form>

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
        </div>
    );
};

export default PasswordChangeForms;