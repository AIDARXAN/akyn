import React from "react";
import FormElement from "../FormElement/FormElement";
import ModalWindow from "./ModalWindow";

const AssignRoleUserModal = ({toggle, modal, nameModal, changeHandler, value, title}) => {
    return (
        <div>
            <ModalWindow
                toggle={toggle}
                modal={modal.role}
                nameModal={nameModal}
                close={"Отмена"}
                save={"Сохранить"}
                title={title}
            >
                <form>
                    <FormElement
                        name={nameModal}
                        changeHandler={changeHandler}
                        value={value}
                    />
                </form>
            </ModalWindow>
        </div>
    );
};

export default AssignRoleUserModal;