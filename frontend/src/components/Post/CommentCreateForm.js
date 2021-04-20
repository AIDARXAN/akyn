import {FormGroup, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";
import React, {useState} from "react";
import CardBody from "reactstrap/es/CardBody";
import CommonModal from "../Modals/CommonModal";

const CommentCreateForm = ({commentSubmit}) => {
    const [text, setText] = useState(null);
    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
            <CardBody>
                <FormGroup>
                    <Input placeholder={'Комментарий калтыруу'} type="textarea" name="text" id="create-post-text" onChange={onChange}/>
                    <Button className="float-right btn btn-info" onClick={() => commentSubmit(text)}>Жиберүү</Button>
                </FormGroup>
            </CardBody>
    )
}

export default CommentCreateForm;