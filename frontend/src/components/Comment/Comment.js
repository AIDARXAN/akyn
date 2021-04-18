import React from "react";
import CardBody from "reactstrap/es/CardBody";
import moment from "moment";
import {urlWithoutApiPrefix} from "../../configAPI";
import "../Post/post.css";
import "./comments.css";

const Comment = ({comment}) => {
    return (
        <CardBody className="pt-0 pb-0">
            <hr/>
            <div className="row" style={{height: '25px' }}>
                <div className="col-6">{comment?.user.first_name} {comment?.user.last_name}</div>
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