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
        email: "",
        password1: "",
        password2: "",
        phone: "",
        first_name: "",
        last_name: "",
        // telegram_id: ""
    });

    const regex = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /\+\(996\)[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/
    };

    const changeHandler = e => {
        let reg = /[^A-Za-z0-9@.]/ig;
        if (e.target.name === "email") reg = null;
        if (e.target.name === "password") reg = null;
        const value = e.target.value.replace(reg, "");
        setUser({...user, [e.target.name]: value});
    };

    const changePhone = e => setUser({...user, [e.target.name]: e.target.value});

    const onlyRussian = e => setUser({...user, [e.target.name]: e.target.value.replace(/[^А-Яа-яЁё]/ig, "")});

    const registrationSubmit = e => {
        e.preventDefault();

        const userInfo = {...user};
        userInfo.phone = userInfo.phone.replace(/[+()-]/ig, "");

        dispatch(userRegistration(userInfo));
    };

    const minimumCharactersToPassword = 5;

    const submitDisabled = !!Object.keys(user).find(e => user[e] === "") ||
        !regex.email.test(user.email) ||
        !regex.phone.test(user.phone) ||
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
                        valid={regex.email.test(user.email)}
                        invalidText={"Адрес электронной почты должен быть введен на латинице, содержать символ @ и часть адреса после него"}
                        name='email'
                        placeholder='Email'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.email}
                        tooltip={"Email должен быть введен латинскими буквами и содержать символ \"@\""}
                    />

                    <FormElement
                        password
                        valid={user.password1.length >= 5}
                        invalidText={"Пароль не может быть короче 5 символов"}
                        name='password1'
                        placeholder='Пароль'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.password1}
                        tooltip="Пароль должен содержать не меньше 5 символов"
                    />

                    <FormElement
                        password
                        valid={user.password1 === user.password2 && user.password1.length >= 5}
                        invalidText={"Пароль не соответствует введенному выше"}
                        name='password2'
                        placeholder='Повторите пароль'
                        alignPlaceholder='center'
                        changeHandler={changeHandler}
                        value={user.password2}
                        tooltip="Повторите введенный пароль"
                    />

                    <FormElement
                        valid={regex.phone.test(user.phone)}
                        invalidText={"Телефон должен быть указан в формате +(996)ххх-хх-хх-хх"}
                        name='phone'
                        mask="+(\9\96)999-99-99-99"
                        placeholder='Телефон'
                        alignPlaceholder='center'
                        changeHandler={changePhone}
                        value={user.phone}
                        tooltip="Телефонный номер должен содержать только цифры"
                    />

                    <FormElement
                        valid={user.first_name.length >= 3}
                        name='first_name'
                        placeholder='Имя'
                        alignPlaceholder='center'
                        changeHandler={onlyRussian}
                        value={user.first_name}
                        tooltip="Введите имя, используя только кириллицу"
                    />

                    <FormElement
                        valid={user.last_name.length >= 3}
                        name='last_name'
                        placeholder='Фамилия'
                        alignPlaceholder='center'
                        changeHandler={onlyRussian}
                        value={user.last_name}
                        tooltip="Введите фамилию, используя только кириллицу"
                    />

                    {error &&
                    <>{
                        typeof error === "object" ?
                            <ErrorAlert error={error}/> :
                            <Alert color="danger">Something error</Alert>
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
                        Регистрация</Button>
                </form>
            </CardBody>
            <CardFooter className='border-top text-center p-3' style={{background: "#f6f6f6"}}>
                <NavLink to='/login' style={{fontSize: "16px"}}>Назад</NavLink>
            </CardFooter>
        </Card>
    );
};

export default Registration;