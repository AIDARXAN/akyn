import React, {useEffect, useState} from "react";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import moment from "moment";
import "./post.css";
import {useDispatch, useSelector} from "react-redux";
import {createComment, deletePost, likePost, likePostDelete} from "../../store/acrions/Post/actionCreators";
import UserChangeForms from "../../Containers/Profile/UserChangeForms";
import Modal from "reactstrap/es/Modal";
import CommentCreateForm from "./CommentCreateForm";
import {openSuccessAlert} from "../../store/acrions/Notification/actionCreators";
import CommentsListForm from "./CommentsListForm";
import {fetchComments} from "../../store/acrions/Comments/actionCreators";
import {NavLink} from "react-router-dom";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {fetchFeed} from "../../store/Feed/actionCreators";
import {fetchCurrentUser} from "../../store/acrions/user/actionsCreators";
import PostUpdateModal from "./PostUpdateModal";
import PostDeleteModal from "./PostDeleteModal";

const Post = ({post}) => {
    const dispatch = useDispatch();
    const [commentModal, setCommentModal] = useState(false);
    const toggleCommentModal = () => {
        setCommentModal(!commentModal)
    }

    let comments = useSelector(state => state.publicationComments.comments)


    const [commentsListModal, setCommentsListModal] = useState(false);
    const toggleCommentsListModal = () => {
        if (post.comments > 0) {
            dispatch(fetchComments(post.id))
            setCommentsListModal(!commentsListModal);
        }
    }

    useEffect(() => {
        if (commentsListModal) {
            window.setTimeout(() => {
                dispatch(fetchComments(post.id))
            }, 3000)
        }
    }, [comments])

    const [postIsLiked, setPostIsLiked] = useState(post.is_liked);
    const [postLikes, setPostLikes] = useState(post.likes);

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
        if (list !== true)
            toggleCommentModal()
    }

    const [updatePostModal, setUpdatePostModal] = useState(false);
    const toggleUpdatePost = () => {
        setUpdatePostModal(!updatePostModal)
    }

    const [deletePostModal, setDeletePostModal] = useState(false);
    const toggleDeletePost = () => {
        setDeletePostModal(!deletePostModal)
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

                        {post.is_owner && <div className="col-1 float-right"><UncontrolledDropdown>
                            <DropdownToggle tag="span">
                                <img className="post-more-icon"
                                     src={require('assets/icons/more.svg')}
                                     alt=""/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={toggleUpdatePost}>Өзгөртүү</DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem onClick={toggleDeletePost}>Өчүрүү</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </div>}
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
                           onClick={toggleCommentsListModal}>{post.comments}</a>
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
            <PostUpdateModal isOpen={updatePostModal} toggle={toggleUpdatePost} post={post}/>
            <PostDeleteModal isOpen={deletePostModal} toggle={toggleDeletePost} post={post}/>
        </>
    )
}

export default Post;