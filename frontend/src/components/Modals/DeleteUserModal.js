import CustomModalWindow from "./CustomModalWindow";
import React from "react";
import {useDispatch} from "react-redux";
import {userDelete} from "../../store/acrions/user/actionsCreators";


const DeleteUserModal = ({toggle, modal, nameModal, valueModal}) => {
    const dispatch = useDispatch();
    const deleteUser = e => {
        e.preventDefault();
        const data = {
            userId: valueModal.id
        };
        toggle(nameModal);
        dispatch(userDelete(data));
    };

    return (
        <CustomModalWindow
            toggle={toggle}
            modal={modal.deleteUser}
            nameModal={nameModal}
            type={"submit"}
            close={"Отмена"}
            confirm={"Удалить"}
            button_color={"btn btn-danger"}
            onClick={deleteUser}
        >
            <div>
                Вы уверены, что хотите удалить пользователя {valueModal.first_name} {valueModal.last_name}?
            </div>
        </CustomModalWindow>
    );
};

export default DeleteUserModal;