import React, {useState} from "react";
import CardBody from "reactstrap/es/CardBody";
import moment from "moment";
import {urlWithoutApiPrefix} from "../../configAPI";
import "../Post/post.css";
import "./comments.css";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import "../Post/post.css";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import UpdateCommentModal from "./modals/UpdateCommentModal";
import CommentDeleteModal from "./modals/DeleteCommentModal";

const Comment = ({comment}) => {
    const [updateCommentModal, setUpdateCommentModal] = useState(false);
    const toggleUpdateComment = () => {
        setUpdateCommentModal(!updateCommentModal)
    }

    const [deleteCommentModal, setDeleteCommentModal] = useState(false);
    const toggleDeleteComment = () => {
        setDeleteCommentModal(!deleteCommentModal)
    }

    return (
        <>
            <CardBody className="pt-0 pb-0">
                <hr/>
                <div className="row" style={{height: '25px'}}>
                    <NavLink to={!comment.is_owner ? '/profile/' + comment?.user.username : '/profile'}
                             className="col-4 nav-link-font">{comment?.user.first_name} {comment?.user.last_name}</NavLink>
                    <div className={"col-2"}>{moment(comment?.creation_date).format("DD.MM.YYYY")}</div>
                    {comment.is_owner && comment.changed && <div className={"col-2"}>(өзгөртүлдү)</div>}
                    {comment.is_owner && <div className="col-2 offset-2">
                        <UncontrolledDropdown>
                            <DropdownToggle tag="span">
                                <img className="comment-more-icon"
                                     src={require('assets/icons/more.svg')}
                                     alt=""/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={toggleUpdateComment}>Өзгөртүү</DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem onClick={toggleDeleteComment}>Өчүрүү</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>}
                </div>
                <pre className="post-description mt-5">
                    {comment?.description}
                </pre>
                <hr/>
            </CardBody>

            <UpdateCommentModal isOpen={updateCommentModal} toggle={toggleUpdateComment} comment={comment}/>
            <CommentDeleteModal isOpen={deleteCommentModal} toggle={toggleDeleteComment} comment={comment}/>
        </>
    )
};

export default Comment;