import {FormGroup, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";
import React, {useState} from "react";
import CardBody from "reactstrap/es/CardBody";
import CommonModal from "../Modals/CommonModal";
import Comment from "../Comment/Comment";

const CommentsListForm = ({comments}) => {
    return (
        <CardBody>
            <div>
                <div style={{overflowY: "auto", maxHeight: "600px"}}>
                    {comments.map((comment, index) => {
                        return (<Comment comment={comment}/>)
                    })}
                </div>
            </div>
        </CardBody>
    )
};

export default CommentsListForm;