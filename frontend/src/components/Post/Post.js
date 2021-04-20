import React, {useEffect, useState} from "react";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import moment from "moment";
import "./post.css";
import {useDispatch, useSelector} from "react-redux";
import {createComment, likePost, likePostDelete} from "../../store/acrions/Post/actionCreators";
import UserChangeForms from "../../Containers/Profile/UserChangeForms";
import Modal from "reactstrap/es/Modal";
import CommentCreateForm from "./CommentCreateForm";
import {openSuccessAlert} from "../../store/acrions/Notification/actionCreators";
import CommentsListForm from "./CommentsListForm";
import {fetchComments} from "../../store/acrions/Comments/actionCreators";
import {NavLink} from "react-router-dom";

const Post = ({post}) => {
    const dispatch = useDispatch();
    const [commentModal, setCommentModal] = useState(false);
    const toggleCommentModal = () => {
        setCommentModal(!commentModal)
    }

    let comments = useSelector(state => state.publicationComments.comments)

    const [commentsListModal, setCommentsListModal] = useState(false);
    const toggleCommentsListModal = () => {
        if (postComments > 0) {
            dispatch(fetchComments(post.id))
            setCommentsListModal(!commentsListModal);
        }
    }

    const [postIsLiked, setPostIsLiked] = useState(post.is_liked);
    const [postLikes, setPostLikes] = useState(post.likes);
    const [postComments, setPostComments] = useState(post.comments)

    const postLike = (id) => {
        if (post.id === id) {
            setPostIsLiked(!postIsLiked)
            if (postIsLiked) {
                setPostLikes(postLikes - 1)
                dispatch(likePostDelete(id))
            } else {
                setPostLikes(postLikes + 1)
                dispatch(likePost(id))
            }
        }
    }

    const commentSubmit = (text, list) => {
        dispatch(createComment(post.id, text))
        dispatch(fetchComments(post.id))
        setPostComments(postComments + 1)
        if (list !== true)
            toggleCommentModal()
    }

    return (
        <>
            <Card style={{width: "600px"}}>
                <CardBody>
                    <div className="row">
                        <img
                            className="avatar border-gray ml-3"
                            src={post.user.avatar ? post.user.avatar : require("assets/img/cat.jpeg")}
                        />
                        <NavLink to={post.is_owner ? "/profile" : "/profile/" + post?.user.username}
                                 className="col-4 nav-link-font">{post?.user.first_name} {post?.user.last_name}</NavLink>
                        <NavLink to={post.is_owner ? "/profile" : "/profile/" + post?.user.username}
                                 className="col-2 nav-link-font">@{post?.user.username}</NavLink>
                        <div className={"col-4"}>{moment(post?.creation_date).format("DD.MM.YYYY")}</div>
                        {post.is_owner && <div className="col-1 float-right"><img className="post-more-icon"
                                                                                  src={require('assets/icons/more.svg')}
                                                                                  alt=""/></div>}
                        {/*TODO drop down*/}
                    </div>
                    <pre className="post-description ml-5 mt-3">
                    {post?.description}
                </pre>
                    <div className="row">
                        <img onClick={() => postLike(post.id)} className="post-like ml-3 post-cursor-pointer"
                             src={postIsLiked ? require("assets/icons/liked.svg") : require("assets/icons/like.svg")}
                             alt=""/>
                        <p className="post-like-number ml-2">{postLikes}</p>
                        <i className="nc-icon nc-chat-33 ml-4 post-cursor-pointer" style={{fontSize: "25px"}}
                           onClick={toggleCommentModal}/>
                        <a className="post-like-comment ml-2 post-cursor-pointer"
                           onClick={toggleCommentsListModal}>{postComments}</a>
                    </div>

                </CardBody>
            </Card>
            <Modal isOpen={commentModal} toggle={toggleCommentModal} centered={true}>
                <CommentCreateForm commentSubmit={commentSubmit}/>
            </Modal>
            {comments && <Modal isOpen={commentsListModal} toggle={toggleCommentsListModal} centered={true}
                                style={{maxHeight: "80%"}}>
                <CommentsListForm commentSubmit={commentSubmit} comments={comments} style={{maxHeight: "80%"}}/>
            </Modal>}
        </>
    )
}

export default Post;