import React, {useState} from "react";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import Logo from "../../components/Logo/Logo";
import FormElement from "../../components/FormElement/FormElement";
import {NavLink} from "react-router-dom";
import Button from "reactstrap/es/Button";
import CardFooter from "reactstrap/es/CardFooter";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../store/acrions/user/actionsCreators";
import Alert from "reactstrap/es/Alert";

const Login = () => {
    const dispatch = useDispatch();

    let error = useSelector(state => state.user.logError);

    const [user, setUser] = useState({username: "", password: ""});

    const changeHandler = e => setUser({...user, [e.target.name]: e.target.value});

    const submitLogin = e => {
        e.preventDefault();

        dispatch(userLogin(user));
    };

    const submitDisabled = !!Object.keys(user).find(e => user[e] === "");
    return (
        <Card
            className='shadow-lg mb-5 bg-white rounded'
            style={{maxWidth: "450px", margin: "100px auto 0"}}
        >
            <CardBody className='p-4' id='logoPage'>
                <Logo center scale={0.8}/>
                <form onSubmit={submitLogin}>
                    <FormElement
                        name='username'
                        placeholder='Колдонуучунун аты'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.email}
                    />

                    <FormElement
                        password
                        name='password'
                        placeholder='Пароль'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.password}
                    />

                    {error && <Alert color="danger">Туура эмес логин же парол жаздыңыз.</Alert>}

                    <Button
                        id='loginSubmit'
                        disabled={
                            !!Object.keys(user).find(e => user[e] === "")
                        }
                        style={{opacity: submitDisabled && "0.4"}}
                        className={`w-100 ${!submitDisabled ? "bg-info" : "bg-secondary"}`}
                    >
                        Кирүү
                    </Button>
                </form>
            </CardBody>
            <CardFooter className='border-top text-center p-3' style={{background: "#f6f6f6"}}>
                <NavLink id='toRegistration' to='/registration' style={{fontSize: "16px"}}>Каттоо</NavLink>
                <br/>
                <NavLink id='toReset' to='/reset-password' style={{fontSize: "16px"}}>Парол унуттуңузбу?</NavLink>
            </CardFooter>
        </Card>
    );
};

export default Login;