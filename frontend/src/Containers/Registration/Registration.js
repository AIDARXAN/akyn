import React, {useState} from "react";
import FormElement from "../../components/FormElement/FormElement";
import Button from "reactstrap/es/Button";
import CardBody from "reactstrap/es/CardBody";
import Card from "reactstrap/es/Card";
import Logo from "../../components/Logo/Logo";
import CardFooter from "reactstrap/es/CardFooter";
import {NavLink} from "react-router-dom";
import {userRegistration} from "../../store/acrions/user/actionsCreators";
import {useDispatch, useSelector} from "react-redux";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import Alert from "reactstrap/es/Alert";

const Registration = () => {
    const dispatch = useDispatch();

    let error = useSelector(state => state.user.regError);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
    });

    const regex = {
        username: /^[a-zA-Z0-9_.-]*$/,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };

    const changeHandler = e => {
        let reg = /[^A-Za-z0-9@.]/ig;
        if (e.target.name === "username") reg = null;
        if (e.target.name === "email") reg = null;
        if (e.target.name === "password") reg = null;
        const value = e.target.value.replace(reg, "");
        setUser({...user, [e.target.name]: value});
    };


    const onlyRussian = e => setUser({...user, [e.target.name]: e.target.value.replace(/[^А-Яа-яЁё]/ig, "")});

    const registrationSubmit = e => {
        e.preventDefault();
        const userInfo = {...user};

        dispatch(userRegistration(userInfo));
    };

    const minimumCharactersToPassword = 5;

    const submitDisabled = !!Object.keys(user).find(e => user[e] === "") ||
        !regex.email.test(user.email) ||
        user.password1.length < minimumCharactersToPassword ||
        user.password1 !== user.password2;
    return (
        <Card
            className='shadow-lg mb-5 bg-white rounded'
            style={{maxWidth: "450px", margin: "100px auto 0"}}
        >
            <CardBody className='p-4'>
                <Logo center scale={0.8}/>
                <form onSubmit={registrationSubmit}>

                    <FormElement
                        focus
                        valid={regex.username.test(user.username)}
                        invalidText={"Колдонуучунун аты англис тамгалары менен жазылыш керек"}
                        name='username'
                        placeholder='Колдонуучунун аты'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.username}
                        tooltip={"Колдонуучунун аты англис тамгалыры менен жазылат, башкача аттары username, login"}
                    />

                    <FormElement
                        focus
                        valid={regex.email.test(user.email)}
                        invalidText={"Электрондук почтанын адреси латын менен жазылыш керек"}
                        name='email'
                        placeholder='Электрондук почта'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.email}
                        tooltip={"Электрондук почтанын адреси латын менен жазылыш керек жана @ белгиси камтылыш керек"}
                    />

                    <FormElement
                        password
                        valid={user.password1.length >= 5}
                        invalidText={"Парол 5 белгиден аз болбош керек"}
                        name='password1'
                        placeholder='Парол'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.password1}
                        tooltip="Парол 5 белгиден аз болбош керек"
                    />

                    <FormElement
                        password
                        valid={user.password1 === user.password2 && user.password1.length >= 5}
                        invalidText={"Парол өйдөңду жазылган паролго окшош эмес"}
                        name='password2'
                        placeholder='Паролду кайталаңыз'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.password2}
                        tooltip="Паролду кайталаңыз"
                    />

                    <FormElement
                        valid={user.first_name.length >= 3}
                        name='first_name'
                        placeholder='Ат'
                        alignPlaceholder='center'
                        changeHandler={onlyRussian}
                        value={user.first_name}
                        tooltip="Кыргыз тилинде атыңызды жазып коюңуз"
                    />

                    <FormElement
                        valid={user.last_name.length >= 3}
                        name='last_name'
                        placeholder='Теги'
                        alignPlaceholder='center'
                        changeHandler={onlyRussian}
                        value={user.last_name}
                        tooltip="Кыргыз тилинде тегиңизди жазып коюңуз"
                    />

                    {error &&
                    <>{
                        typeof error === "object" ?
                            <ErrorAlert error={error}/> :
                            <Alert color="danger">Серверден ката чыкты</Alert>
                    }</>
                    }

                    <Button
                        //                        28a745
                        id='registrationSubmit'
                        disabled={
                            submitDisabled
                        }
                        style={{opacity: submitDisabled && "0.4"}}
                        className={`w-100 ${!submitDisabled ? "bg-info" : "bg-secondary"}`}
                    >
                        Каттоо</Button>
                </form>
            </CardBody>
            <CardFooter className='border-top text-center p-3' style={{background: "#f6f6f6"}}>
                <NavLink to='/login' style={{fontSize: "16px"}}>Артка</NavLink>
            </CardFooter>
        </Card>
    );
};

export default Registration;