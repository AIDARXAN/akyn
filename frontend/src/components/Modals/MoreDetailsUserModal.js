import React from "react";
import CustomModalWindow from "./CustomModalWindow";
import "../UsersTable/UserTable.css";
import {userRolesRus} from "../../constants";

const MoreDetailsUserModal = ({toggle, modal, nameModal, changeHandler, value, title,valueModal}) => {
    return (
        <div>
            <CustomModalWindow
                toggle={toggle}
                modal={modal.userDetails}
                nameModal={nameModal}
                close={"Закрыть"}
                save={""}
                title={title}
                headerClass='user-detail-modal-header'
            >
                <p>Имя: <b>{valueModal.full_name}</b></p>
                <p>Тип пользователя: <b>{userRolesRus[valueModal.role]}</b></p>
                <p>Email: <b>{valueModal.email}</b></p>
                <p>Номер Телефона: <b>{valueModal.phone}</b></p>
                <p>Дата рождения: <b>{valueModal.birth_date === "Invalid date" ? null : valueModal.birth_date}</b></p>
                <p>Дата приема на работу: <b>{valueModal.employment_date}</b></p>
                {valueModal.fired_at === "Invalid date" ? null :  <p>Дата увольнения: <b>{valueModal.fired_at}</b></p>}
                <p>Активен: <b>{valueModal.is_active === true ? "да" : "нет"}</b></p>
                <p>Админ: <b>{valueModal.is_admin === true ? "да" : "нет"}</b></p>
                <p>Наставник: <b>{valueModal.is_mentor === true ? "да" : "нет"}</b></p>
            </CustomModalWindow>

        </div>
    );
};

export default MoreDetailsUserModal;