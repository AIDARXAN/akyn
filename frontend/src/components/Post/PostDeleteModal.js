import React, {useCallback} from "react";
import {deletePost} from "../../store/acrions/Post/actionCreators";
import {fetchFeed} from "../../store/Feed/actionCreators";
import {fetchCurrentUser} from "../../store/acrions/user/actionsCreators";
import {FormGroup, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
import {HIDDEN, PUBLISHED} from "../../constants";
import CommonModal from "../Modals/CommonModal";
import {useDispatch} from "react-redux";

const PostDeleteModal = ({isOpen, toggle, post, setComments, comments}) => {
    const dispatch = useDispatch();

    const submitDeletePost = () => {
        dispatch(deletePost(post.id))
        toggle()
    }

    return (
        <CommonModal isOpen={isOpen} toggle={toggle} submit={submitDeletePost} save={"Ооба"} cancel={"Жок"}
                     alert={true}>
            Сиз ушул постту өчүргүңүз келип жатабы
        </CommonModal>
    )
}

export default PostDeleteModal;