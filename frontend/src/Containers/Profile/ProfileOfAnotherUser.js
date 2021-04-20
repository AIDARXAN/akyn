import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../store/acrions/user/actionsCreators";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import moment from "moment";
import "./Profile.css";
import Modal from "reactstrap/es/Modal";
import {useParams} from "react-router-dom";
import Post from "../../components/Post/Post";
import {getFollowers, getFollowing, subscribeReq, unsubscribeReq} from "../../store/acrions/Follow/actionCreators";
import "../../components/Post/post.css";
import SubscriberList from "../../components/Subscriber/SubscriberList";
import {useHistory} from "react-router";
import NotFound from "../Error/NonFound";

const ProfileOfAnotherUser = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.anotherUser);
    const currentUser = useSelector(state => state.user.currentUser);
    let followers = useSelector(state => state.follow.followers)
    let follows = useSelector(state => state.follow.following)
    let {username} = useParams();

    useEffect(() => {
        dispatch(fetchUser(username));
    }, [followers, username]);

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
        dispatch(getFollowers(user.username))
    }

    const unsubscribeFromUser = (username) => {
        dispatch(unsubscribeReq(username))
        dispatch(getFollowers(user.username))
    }

    const history = useHistory();
    return !user ? <NotFound/>: (
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
                                    </span>
                            </div>

                            <div className="profile-text col-7">
                                <div>
                                    <h5 className="title d-inline-block">{user.first_name} {user.last_name}</h5>

                                    <div className="row font-weight-bold">
                                        <p className="m-auto post-cursor-pointer"
                                           onClick={toggleFollowersModal}>Жазычуулары: {user.followers}</p>
                                        <p className="m-auto post-cursor-pointer"
                                           onClick={toggleFollowingModal}>Жазылган: {user.follows}</p>
                                    </div>
                                    {currentUser.username !== user.username && <div className="m-auto">
                                        {user?.is_subscribed ?
                                            <button className="btn btn-outline-primary btn-round ml-5" onClick={() => {
                                                unsubscribeFromUser(user.username)
                                            }}>
                                                Жазылдыңыз
                                            </button> : <button className="btn btn-primary btn-round ml-5"
                                                                onClick={() => subscribeOnUser(user.username)}>
                                                Жазылуу
                                            </button>}
                                    </div>}
                                </div>

                            </div>
                        </div>

                        <div className="">
                            <p className="description font-weight-bold">Логин: @{user.username}</p>
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

export default ProfileOfAnotherUser;