import React from "react";
import {fetchFeed} from "../../store/Feed/actionCreators";
import {fetchCurrentUser} from "../../store/acrions/user/actionsCreators";
import {useState} from "react";
import CommonModal from "../Modals/CommonModal";
import {updatePost} from "../../store/acrions/Post/actionCreators";
import {useDispatch} from "react-redux";
import {HIDDEN, PUBLISHED} from "../../constants";
import {FormGroup, Label} from "reactstrap";
import Input from "reactstrap/es/Input";

const PostUpdateModal = ({post, isOpen, toggle}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState(post.description);
    const [status, setStatus] = useState(post.status);

    const submitUpdatePost = () => {
        dispatch(updatePost(post.id, text, status))
        toggle()
    }

    const textOnChange = (e) => {
        setText(e.target.value)
    }

    const statusOnChange = e => {
        setStatus(e.target.value)
    }

    return (
        <CommonModal isOpen={isOpen} toggle={toggle} submit={submitUpdatePost} save={"Сактоо"} cancel={"Жокко чыгаруу"}>
            <textarea style={{width: "100%", height: "150px"}} name="description" value={text}  onChange={textOnChange}/>
            <FormGroup>
                <Label for="exampleSelect">Статус</Label>
                <Input onChange={statusOnChange} type="select" name="select" id="statusSelect">
                  <option value={PUBLISHED}>Жарыялоо</option>
                  <option value={HIDDEN}>Жашыруу</option>
                </Input>
              </FormGroup>
        </CommonModal>

    )
}

export default PostUpdateModal;