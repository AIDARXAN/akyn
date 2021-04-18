import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import Tooltip from "reactstrap/es/Tooltip";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {FormGroup, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
import "./create_post.css";
import Button from "reactstrap/es/Button";
import {useDispatch} from "react-redux";
import {openSuccessAlert} from "../../store/acrions/Notification/actionCreators";
import {createPost} from "../../store/acrions/Post/actionCreators";
import {useHistory} from "react-router";

const CreatePost = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [text, setText] = useState(null);
    const onChange = (e) => {
        setText(e.target.value)
    }

    const submitPost = (e) => {
        e.preventDefault();
        dispatch(createPost(text))
        dispatch(openSuccessAlert());
        window.setTimeout(() => {history.push("/profile")}, 1000);
    }

    return (
        <div className="content">
            <Card className="card-user" style={{width: "600px", minWidth: "350px", height: "600px"}}>

                <CardBody className="create-post">
                    <FormGroup style={{height: '500px'}}>
                        <Label for="create-post-text"><h2>Жаңы пост чыгаруу</h2></Label>
                        <Input type="textarea" name="text" id="create-post-text" onChange={onChange}/>
                        <Button className="float-right btn btn-info" onClick={submitPost}>Жарыялоо</Button>
                    </FormGroup>
                </CardBody>
            </Card>
        </div>
    )
}

export default CreatePost;