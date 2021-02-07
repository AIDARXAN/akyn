import React, {useState} from "react";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import Logo from "../../components/Logo/Logo";
import FormElement from "../../components/FormElement/FormElement";
import {NavLink} from "react-router-dom";
import Button from "reactstrap/es/Button";
import CardFooter from "reactstrap/es/CardFooter";
import {useDispatch} from "react-redux";
import {passwordReset} from "../../store/acrions/PasswordReset/actionsCreators";


const PasswordReset = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({email: ""});

    const regex = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };

    const changeHandler = e => {
        let reg = /[^A-Za-z0-9@.]/ig;
        if (e.target.name === "email") reg = null;
        const value = e.target.value.replace(reg, "");
        setUser({...user, [e.target.name]: value});
    };

    const submitEmail = e => {
        e.preventDefault();

        dispatch(passwordReset(user));
    };

    const submitDisabled = !!Object.keys(user).find(e => user[e] === "") ||
        !regex.email.test(user.email);

    return (
        <>
            <Card
                className='shadow-lg mb-5 bg-white rounded'
                style={{maxWidth: "450px", margin: "100px auto 0"}}
            >

                <CardBody className='p-4' id='logoPage'>
                    <Logo center scale={0.8}/>
                    <form onSubmit={submitEmail}>
                        <FormElement
                            name='email'
                            placeholder='Email'
                            alignPlaceholder='center'
                            changeHandler={changeHandler}
                            value={user.email}
                        />
                        <Button
                            id='resetButton'
                            disabled={
                                !!Object.keys(user).find(e => user[e] === "") ||
                                !regex.email.test(user.email)
                            }
                            style={{opacity: submitDisabled && "0.4"}}
                            className={`w-100 ${!submitDisabled ? "bg-info" : "bg-secondary"}`}
                        >
                            Пароль жаңыртуу
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className='border-top text-center p-3' style={{background: "#f6f6f6"}}>
                    <NavLink to='/login' style={{fontSize: "16px"}}>Артка</NavLink>
                </CardFooter>
            </Card>
        </>
    );
};

export default PasswordReset;