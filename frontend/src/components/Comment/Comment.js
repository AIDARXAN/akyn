import React from "react";
import CardBody from "reactstrap/es/CardBody";
import moment from "moment";
import {urlWithoutApiPrefix} from "../../configAPI";
import "../Post/post.css";
import "./comments.css";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import "../Post/post.css";

const Comment = ({comment}) => {
    const currentUser = useSelector(state => state.user.currentUser)
    return (
        <CardBody className="pt-0 pb-0">
            <hr/>
            <div className="row" style={{height: '25px' }}>
                <NavLink to={!comment.is_owner ? '/profile/'+ comment?.user.username : '/profile'} className="col-6 nav-link-font">{comment?.user.first_name} {comment?.user.last_name}</NavLink>
                <div className={"col-2"}>{moment(comment?.creation_date).format("DD.MM.YYYY")}</div>
                {comment.is_owner && comment.changed && <div className={"col-2"}>(өзгөртүлдү)</div>}
                {comment.is_owner && <div className="col-2 offset-2"><img className="comment-more-icon"
                                                                          src={require('assets/icons/more.svg')}
                                                                          alt=""/></div>}
                {/*TODO drop down*/}
            </div>
            <pre className="post-description">
                    {comment?.description}
                </pre>
            <hr/>
        </CardBody>
    )
};

export default Comment;