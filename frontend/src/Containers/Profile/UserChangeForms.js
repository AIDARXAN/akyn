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
        username: /^[a-zA-Z0-9_.-]*$/,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };

    const [user, setUser] = useState({
        email: props.userInfo.email,
        first_name: props.userInfo.first_name,
        last_name: props.userInfo.last_name,
        username: props.userInfo.username,

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
        const userInfo = {...user};
        dispatch(editProfile(userInfo, props.closeModal));
    };

    const submitDisabled = !!Object.keys(user).find(e => user[e] === "") ||
        !regex.email.test(user.email)
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
                }}><b>Жеке баракчаны өзгөртүү</b></div>
            <form style={{padding: "20px 15px 10px 15px"}}>

                <FormElement
                    focus
                    valid={regex.username.test(user.username)}
                    invalidText={"Логин англис тамгалары менен жазылыш керек"}
                    name='username'
                    placeholder='Логин'
                    alignPlaceholder='center'
                    changeHandler={changeHandler}
                    value={user.username}
                    placeholderOver
                    tooltip={"Логин англис тамгалыры менен жазылат, башкача аттары username, login"}
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
                    placeholderOver
                    tooltip={"Электрондук почтанын адреси латын менен жазылыш керек жана @ белгиси камтылыш керек"}
                />

                <FormElement
                    valid={user.first_name.length >= 3}
                    name='first_name'
                    placeholder='Ат'
                    alignPlaceholder='center'
                    changeHandler={onlyRussian}
                    value={user.first_name}
                    tooltip="Кыргыз тилинде атыңызды жазып коюңуз"
                    placeholderOver
                />

                <FormElement
                    valid={user.last_name.length >= 3}
                    name='last_name'
                    placeholder='Фамилия'
                    alignPlaceholder='center'
                    changeHandler={onlyRussian}
                    value={user.last_name}
                    tooltip="Кыргыз тилинде фамилияңызды жазып коюңуз"
                    placeholderOver
                />
            </form>

            <div style={{padding: "0 15px"}}>
                {error &&
                <>{
                    typeof error === "object" || typeof error === "string" ?
                        <ErrorAlert error={error}/> :
                        <Alert color="danger">Серверден ката чыкты</Alert>
                }</>
                }
            </div>

            <button
                className="edit-btn ml-3 mb-3"
                id="edit-password-btn"
                onClick={toggleModal}
            >
                Купуя сөздү өзгөртүү
            </button>

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

            <Modal
                isOpen={modal}
                toggle={toggleModal}
                centered={true}
            >
                <PasswordChangeForms
                    closeModal={toggleModal}
                />
            </Modal>
        </div>
    );
};

export default UserChangeForms;