import React, {useState} from "react";
import FormElement from "../../components/FormElement/FormElement";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import Card from "reactstrap/es/Card";
import Logo from "../../components/Logo/Logo";
import CardFooter from "reactstrap/es/CardFooter";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import Alert from "reactstrap/es/Alert";
import {passwordResetConfirm} from "../../store/acrions/PasswordResetConfirm/actionsCreators";

const PasswordResetConfirm = () => {
    const dispatch = useDispatch();
    const {token} = useParams();
    let error = useSelector(state => state.passwordResetConfirm.error);

    const [password, setPassword] = useState({
        new_password1: "",
        new_password2: "",
        token: token
    });

    const changeHandler = e => {
        let reg = /[^A-Za-z0-9@.]/ig;
        if (e.target.name === "new_password1" || e.target.name === "new_password2") reg = null;
        const value = e.target.value.replace(reg, "");
        setPassword({...password, [e.target.name]: value});
    };

    const submitPassword = e => {
        e.preventDefault();

        dispatch(passwordResetConfirm(password));
    };

    const submitDisabled = !!Object.keys(password).find(e => password[e] === "") ||
        password.new_password1.length < 5 ||
        password.new_password1 !== password.new_password2;
    return (
        <Card
            className='shadow-lg mb-5 bg-white rounded'
            style={{maxWidth: "450px", margin: "100px auto 0"}}
        >
            <CardBody className='p-4'>
                <Logo center scale={0.8}/>
                <form onSubmit={submitPassword}>

                    <FormElement
                        password
                        valid={password.new_password1.length >= 5}
                        invalidText={"Купуя сөз 5 белгиден аз болбош керек"}
                        name='new_password1'
                        placeholder='Купуя сөз'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={password.new_password1}
                        tooltip="Купуя сөз 5 белгиден аз болбош керек"
                    />

                    <FormElement
                        password
                        valid={password.new_password1 === password.new_password2 && password.new_password1.length >= 5}
                        invalidText={"Ырастоо купуя сөзү өйдөңкү жазылган купуя сөз окшош эмес"}
                        name='new_password2'
                        placeholder='Купуя сөздү кайталаңыз'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={password.new_password2}
                        tooltip="Купуя сөздү кайталаңыз"
                    />

                    {error &&
                    <>{
                        typeof error === "object" ?
                            <ErrorAlert error={error}/> :
                            <Alert color="danger">Серверден ката чыкты</Alert>
                    }</>
                    }

                    <Button
                        id='recoverPasswordButton'
                        disabled={
                            !!Object.keys(password).find(e => password[e] === "") ||
                            password.new_password1.length < 5 ||
                            password.new_password1 !== password.new_password2
                        }
                        style={{opacity: submitDisabled && "0.4"}}
                        className={`w-100 ${!submitDisabled ? "bg-info" : "bg-secondary"}`}
                    >
                        Купуя сөздү жаңыртуу</Button>
                </form>
            </CardBody>
            <CardFooter className='border-top text-center p-3' style={{background: "#f6f6f6"}}>
                <NavLink to='/login' style={{fontSize: "16px"}}>Артка</NavLink>
            </CardFooter>
        </Card>
    );
};

export default PasswordResetConfirm;