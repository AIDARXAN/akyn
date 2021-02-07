import React from "react";
import FormElement from "../FormElement/FormElement";
import ModalWindow from "./ModalWindow";

const DateUsersModal = ({toggle, modal, nameModal, changeHandler, value}) => {
    return (
        <div>
            <ModalWindow
                toggle={toggle}
                modal={modal.employment_date}
                nameModal={nameModal}
                close={"Отмена"}
                save={"Сохранить"}
                title={"Изменить дату приема на работу"}
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

export default DateUsersModal;