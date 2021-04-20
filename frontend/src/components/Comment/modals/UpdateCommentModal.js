import React, {useState} from "react";
import {FormGroup, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
import {useDispatch} from "react-redux";
import {HIDDEN, PUBLISHED} from "../../../constants";
import CommonModal from "../../Modals/CommonModal";
import {updateComment} from "../../../store/acrions/Comments/actionCreators";

const CommentUpdateModal = ({comment, isOpen, toggle}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState(comment.description);

    const submitUpdateComment = () => {
        dispatch(updateComment(comment.id, text))
        toggle()
    }

    const textOnChange = (e) => {
        setText(e.target.value)
    }

    return (
        <CommonModal isOpen={isOpen} toggle={toggle} submit={submitUpdateComment} save={"Сактоо"} cancel={"Жокко чыгаруу"}>
            <textarea style={{width: "100%", height: "150px"}} name="description" value={text}  onChange={textOnChange}/>
        </CommonModal>

    )
}

export default CommentUpdateModal;