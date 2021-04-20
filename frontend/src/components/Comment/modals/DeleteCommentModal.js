import {useDispatch} from "react-redux";
import CommonModal from "../../Modals/CommonModal";
import React from "react";
import {deleteComment} from "../../../store/acrions/Comments/actionCreators";

const CommentDeleteModal = ({isOpen, toggle, comment}) => {
    const dispatch = useDispatch();

    const submitDeleteComment = () => {
        dispatch(deleteComment(comment.id))
        toggle()
    }

    return (
        <CommonModal isOpen={isOpen} toggle={toggle} submit={submitDeleteComment} save={"Ооба"} cancel={"Жок"} alert={true}>
            Сиз ушул комментарийди өчүргүңүз келип жатабы?
        </CommonModal>
    )
}

export default CommentDeleteModal;