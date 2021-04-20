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
            }}><b>КУПУЯ СӨЗДҮ АЛМАШТЫРУУ</b></div>
            <form style={{padding: "20px 15px 10px 15px"}}>
                <FormElement
                    focus
                    password
                    name='old_password'
                    placeholder='Эски купуя сөз'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={password.old_password}
                    placeholderOver
                    tooltip={"Эски купуя сөздү жазыңыз"}
                />

                <FormElement
                    password
                    valid={password.password1.length >= 5 && error === undefined}
                    name='password1'
                    placeholder='Жаңы купуя сөз'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={password.password1}
                    placeholderOver
                    tooltip={"Купуя сөз 5 белгиден аз болбош керек"}
                />
                {
                    !password.password1.length >= 5 && <span style={{
                        fontSize: "13px",
                        color: "#DC3556"
                    }}>Купуя сөз 5 белгиден аз болбош керек</span>
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
                    invalidText={"Ырастоо купуя сөзү өйдөңкү жазылган купуя сөз окшош эмес"}
                    name='password2'
                    placeholder='Жаңы купуя сөздү кайталаңыз'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={password.password2}
                    placeholderOver
                    tooltip={"Купуя сөздү кайталаңыз"}
                />

            </form>

            <div style={{
                color: "#00b0ba",
                textAlign: "right",
                padding: "15px",
                borderTop: "1px solid black",
                borderColor: "#ccc"
            }}>
                <Button onClick={props.closeModal}>Жокко чыгаруу</Button> {" "}
                <Button
                    id='registrationSubmit'
                    disabled={
                        submitDisabled
                    }
                    style={{opacity: submitDisabled && "0.4"}}
                    className={`${!submitDisabled ? "bg-info" : "bg-secondary"}`}
                    onClick={changeUserSubmit}
                >
                    Сактоо</Button>
            </div>
        </div>
    );
};

export default PasswordChangeForms;