import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editUserAvatar, fetchCurrentUser} from "../../store/acrions/user/actionsCreators";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardFooter from "reactstrap/es/CardFooter";
import moment from "moment";
import {ACTIVE, userAdditionalRolesRus, userRolesRus} from "../../constants";
import "./Profile.css";
import Modal from "reactstrap/es/Modal";
import UserChangeForms from "./UserChangeForms";
import Tooltip from "reactstrap/es/Tooltip";
import {apiURL} from "../../configAPI";
import {useParams} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    let { edit } = useParams();
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [tooltip, setTooltip] = useState(false);
    const toggleTooltip = () => setTooltip(!tooltip);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, []);

    useEffect(() => {
        if(edit && !user.birth_date ) setModal(!modal);
    }, [edit]);


    const submitNewUserAvatarHandler = async e => {
        const user = {...user, avatar: e.target.files[0]};
		const data = new FormData();

		Object.keys(user).forEach(value => {
			if (value === "avatar") {
				data.append(value, user[value]);
			}
		});

		await dispatch(editUserAvatar(data));
	};

    return !user ? "No data" : (
        <>
            <div className="content">
                <Row>
                    <Col md="4">
                        <Card className="card-user" style={{maxWidth: "600px", minWidth: "350px"}}>
                            <div className="image">
                                <img
                                    alt="background"
                                    src={require("assets/img/background_profile.jpg")}
                                />
                            </div>

                            <CardBody>
                                <div className="author">
                                    <span className="position-relative">
                                        <img
                                        alt="..."
                                        className="avatar border-gray "
                                        src={user.avatar ? apiURL.urlsAvatar + user.avatar : require("assets/img/cat.jpeg")}
                                    />
                                    <div className='position-absolute' style={{right: "0", top: "20px"}}>
                                        <input
                                            type="file"
                                            id="upload-avatar"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            hidden
                                            onChange={submitNewUserAvatarHandler}
                                        />
                                        <button
                                            id="photo-icon-btn"
                                            className="photo-icon-btn"
                                        >
                                            <label htmlFor="upload-avatar" className="p-1 m-0" style={{cursor: "pointer", background: "#00b0ba", borderRadius: "100%"}}>
                                                <i className='nc-icon nc-camera-compact m-0 p-0' style={{color: "#fff"}}/>
                                            </label>
                                            <Tooltip
                                                style={{background: "#f6f6f6", color: "#0b0b0b"}}
                                                placement="right"
                                                isOpen={tooltip}
                                                target="photo-icon-btn"
                                                toggle={toggleTooltip}
                                            >
                                                Можно загрузить фото в форматах .jpeg, .jpg, .png и .gif.
                                                Размер фото не может превышать 10 мб
                                            </Tooltip>
                                        </button>

                                    </div>
                                    </span>
                                    <div>
                                        <h5 className="title d-inline-block">{user.first_name}</h5>{" "}
                                        <h5 className="title d-inline-block">{user.last_name}</h5>
                                    </div>

                                    <p className="description font-weight-bold">{user.email}</p>

                                    <p className="description te">
                                        <strong>Номер телефона: </strong> <b
                                        style={{color: "#00b0ba", fontWeight: "bold"}}>+{user.phone}</b>
                                    </p>

                                    {user.groups[0] && <p className="description">
                                        <strong>Тип: </strong> <b
                                        style={{color: "#00b0ba", fontWeight: "bold"}}>{userRolesRus[user.groups[0]?.name]}</b>
                                    </p>}

                                    {user.additional_group && <p className="description">
                                        <strong>Роль: </strong> <b
                                        style={{color: "#00b0ba", fontWeight: "bold"}}>{userAdditionalRolesRus[user.additional_group.name]}</b>
                                    </p>}

                                    <button
                                        className="edit-btn"
                                        id="edit-profile-btn"
                                        onClick={toggleModal}
                                    >
                                        Редактировать профиль
                                    </button>
                                </div>
                            </CardBody>

                            <CardFooter>
                                {(user.birth_date || user.employment_date) && <hr/>}

                                {user.birth_date &&
                                <p className="description text-center">
                                    <strong>День рождения: {moment(user.birth_date).format("DD.MM.YYYY")}</strong>
                                </p>}
                                {user.employment_date &&
                                <p className="description text-center">
                                    <strong>Дата приема на
                                        работу: {moment(user.employment_date).format("DD.MM.YYYY")}</strong>
                                </p>}

                                <hr/>
                                <p className="description text-center d-inline-block w-50 ">
                                    <span className={`font-weight-bold text-${user.account_activation_date !== null ? "success" : "danger"}`}>
                                        {user.account_activation_date !== null ? "Да" : "Нет"}
                                    </span>
                                    <br/>
                                    Активирован
                                </p>
                                <p className="description text-center d-inline-block w-50 ">
                                    <span
                                        className={`font-weight-bold text-${user.status === ACTIVE ? "success" : "danger"}`}>
                                        {user.status === ACTIVE ? "Да" : "Нет"}
                                    </span>
                                    <br/>
                                    Активен
                                </p>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>


            <Modal
                isOpen={modal}
                toggle={toggleModal}
                centered={true}
            >
                <UserChangeForms
                    closeModal={toggleModal}
                    userInfo={user}
                    animate={edit}
                />
            </Modal>
        </>
    );
};

export default Profile;