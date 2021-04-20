import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editUserAvatar, fetchCurrentUser, fetchUser} from "../../store/acrions/user/actionsCreators";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import moment from "moment";
import "./Profile.css";
import Modal from "reactstrap/es/Modal";
import UserChangeForms from "./UserChangeForms";
import Tooltip from "reactstrap/es/Tooltip";
import {useParams} from "react-router-dom";
import Post from "../../components/Post/Post";
import {getFollowers, getFollowing, subscribeReq, unsubscribeReq} from "../../store/acrions/Follow/actionCreators";
import Subscriber from "../../components/Subscriber/Subscriber";
import "../../components/Post/post.css";
import SubscriberList from "../../components/Subscriber/SubscriberList";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    let followers = useSelector(state => state.follow.followers)
    let follows = useSelector(state => state.follow.following)
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [tooltip, setTooltip] = useState(false);
    const toggleTooltip = () => setTooltip(!tooltip);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [followers, follows]);

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


    const [followersModal, setFollowersModal] = useState(false);
    const toggleFollowersModal = () => {
        dispatch(getFollowers(user.username))
        setFollowersModal(!followersModal)
    }

    const [followingModal, setFollowingModal] = useState(false);
    const toggleFollowingModal = () => {
        dispatch(getFollowing(user.username))
        setFollowingModal(!followingModal)
    }

    const subscribeOnUser = (username) => {
        dispatch(subscribeReq(username))
        dispatch(getFollowing(user.username))
        dispatch(getFollowers(user.username))
    }

    const unsubscribeFromUser = (username) => {
        dispatch(unsubscribeReq(username))
        dispatch(getFollowing(user.username))
        dispatch(getFollowers(user.username))
    }
    return !user ? "No data" : (
        <>
            <div className="content">
                <Card className="card-user" style={{width: "600px"}}>

                    <CardBody>
                        <div className="author row">
                            <div className={'profile-avatar col-3'}>
                                    <span className="position-relative">
                                        <img
                                            alt="..."
                                            className="avatar border-gray "
                                            src={user.avatar ? user.avatar : require("assets/img/cat.jpeg")}
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
                                            <label htmlFor="upload-avatar" className="p-1 m-0" style={{
                                                cursor: "pointer",
                                                background: "#00b0ba",
                                                borderRadius: "100%"
                                            }}>
                                                <i className='nc-icon nc-camera-compact m-0 p-0'
                                                   style={{color: "#fff"}}/>
                                            </label>
                                            <Tooltip
                                                style={{background: "#f6f6f6", color: "#0b0b0b"}}
                                                placement="right"
                                                isOpen={tooltip}
                                                target="photo-icon-btn"
                                                toggle={toggleTooltip}
                                            >
                                                Сүрөттөрдү .jpeg, .jpg, .png жана .gif форматтарында гана жүктөсө болот.
                                                Сурөттүн салмагы 10 мегабайттан ашпаш керек
                                            </Tooltip>
                                        </button>

                                    </div>
                                    </span>
                            </div>

                            <div className="profile-text col-7">
                                <h5 className="title d-inline-block">{user.first_name} {user.last_name}</h5>

                                <div className="row font-weight-bold">
                                    <p className="m-auto post-cursor-pointer"
                                       onClick={toggleFollowersModal}>Жазычуулары: {user.followers}</p>
                                    <p className="m-auto post-cursor-pointer"
                                       onClick={toggleFollowingModal}>Жазылган: {user.follows}</p>
                                </div>
                            </div>
                            <div
                                className="profile-edit-icon col-2"
                                id="edit-profile-btn"
                                onClick={toggleModal}
                            >
                                <i className="nc-icon nc-settings-gear-65"/>
                            </div>
                        </div>

                        <div className="">
                            <p className="description font-weight-bold">Логин: @{user.username}</p>
                            <p className="description font-weight-bold">Э-почта: {user.email}</p>
                            <p className="description font-weight-bold">Катталды: {moment(user.registration_date).format("DD.MM.YYYY")}</p>
                        </div>
                    </CardBody>
                </Card>
                {user.publications && user.publications.map((publication, index) => {
                    return (
                        <Post post={publication}/>
                    )
                })}
            </div>


            <Modal
                isOpen={modal}
                toggle={toggleModal}
                centered={true}
            >
                <UserChangeForms
                    closeModal={toggleModal}
                    userInfo={user}
                />
            </Modal>

            {followers && <Modal isOpen={followersModal} toggle={toggleFollowersModal} centered={true}>
                <div style={{maxHeight: "600px", overflow: "auto"}}>
                    <SubscriberList users={followers} subscribeOnUser={subscribeOnUser}
                                    unsubscribeFromUser={unsubscribeFromUser}/>
                </div>
            </Modal>}

            {follows && <Modal isOpen={followingModal} toggle={toggleFollowingModal} centered={true}>
                <div style={{maxHeight: "600px", overflow: "auto"}}>
                    <SubscriberList users={follows} subscribeOnUser={subscribeOnUser}
                                    unsubscribeFromUser={unsubscribeFromUser}/>
                </div>
            </Modal>}
        </>
    );
};

export default Profile;