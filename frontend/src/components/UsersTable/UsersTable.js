import moment from "moment";
import React, {useState} from "react";
import {Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Table} from "reactstrap";
import "./UserTable.css";
import "../../assets/css/UserListButtons.css";
import "../../assets/scss/paper-dashboard.scss";
import {
    ACTIVE,
    ADMIN,
    ADMINISTRATION,
    MENTORS,
    STATUS_CODES_OF_USERS,
    SUPPORTS,
    userRoles,
    userRolesRus
} from "../../constants";
import {checkPermissions} from "../../services";


const UsersTable = ({users, toggle, toActive}) => {

    const [open, setOpen] = useState([]);

    const openButton = (i) => {
        let isOpen = [];
        isOpen[i] = !open[i];
        setOpen(isOpen);

    };

    const isInActive = (value) => {
        if (value === null) {
            return true;
        }
    };

    const [dropDownRole, setDropDownRole] = useState([]);

    const dropDownChangeHandler = (i) => {
        let isOpen = [];
        isOpen[i] = !dropDownRole[i];
        setDropDownRole(isOpen);

    };

    const checkStatus = (value) => {
        if (value === STATUS_CODES_OF_USERS.fired) {
            return "#FFEAE7";

        } else if (value === null) {
            return "#D2D2D2";

        } else if (value === STATUS_CODES_OF_USERS.in_vacation) {
            return "#ffdf7e";
        }
    };

    const deleteButton = (id, firstName, lastName) => {
        return (
            <button className="btn btn-danger btn-sm"
                    type="button"
                    id="remove-new-user"
                    onClick={() => toggle("deleteUser", {
                        id: id,
                        first_name: firstName,
                        last_name: lastName
                    })}
            >Удалить
            </button>
        );
    };

    const userIsActive = (status) => {
        if (status === ACTIVE)
            return true;
    };

    const userIsAdmin = (user) => {
        const group = user.additional_group?.name === userRoles.admin;
        if (group)
            return true;
    };

    const userIsMentor = (user) => {
        const group = user.additional_group?.name === userRoles.mentors;
        if (group)
            return true;
    };

    const userDetailButton = (user) => {
        return (
            <Button className="btn btn-outline-default btn-sm"
                    id="user-detail"
                    onClick={() => toggle("userDetails", {
                        full_name: user.first_name + " " + user.last_name,
                        role: user.groups[0].name,
                        email: user.email,
                        phone: user.phone,
                        birth_date: moment(user.birth_date).format("DD.MM.YYYY"),
                        employment_date: moment(user.employment_date).format("DD.MM.YYYY"),
                        fired_at: moment(user.fired_at).format("DD.MM.YYYY"),
                        is_active: userIsActive(user.status),
                        is_admin: userIsAdmin(user),
                        is_mentor: userIsMentor(user)
                    })}
            >
                Подробнее
            </Button>
        );
    };

    const getActionButtons = (status, u, i) => {
        if (status === null) {
            return (
                <div className="btn-group button-box" role="group">
                    <button className="btn btn-success btn-sm"
                            id="activate"
                            onClick={() => toggle("activationUser", {
                                id: u.id,
                                first_name: u.first_name,
                                last_name: u.last_name,
                                role: u.groups,
                                right: u.additional_group
                            })}
                    >Активировать
                    </button>
                    {deleteButton(u.id, u.first_name, u.last_name)}
                </div>
            );
        } else if (status === STATUS_CODES_OF_USERS.fired) {
            return (
                <div className="btn-group button-box" role="group">
                    {userDetailButton(u)}
                    {deleteButton(u.id, u.first_name, u.last_name)}
                </div>
            );
        } else if (status === STATUS_CODES_OF_USERS.active || status === STATUS_CODES_OF_USERS.in_vacation) {
            return (
                <div className="btn-group">
                    {userDetailButton(u)}
                    <ButtonDropdown isOpen={!!open[i]} toggle={() => openButton(i)}>
                        <DropdownToggle
                            className="btn btn-outline-default btn-sm dropdown-toggle btn btn-secondary">
                            Управление
                        </DropdownToggle>
                        <DropdownMenu className="drop-menu">
                            <DropdownItem
                                onClick={() => toggle("rightsAndClasses", {
                                    id: u.id,
                                    first_name: u.first_name,
                                    last_name: u.last_name,
                                    role: u.groups,
                                    right: u.additional_group
                                })}
                            >
                                Типы и роли
                            </DropdownItem>

                            {checkPermissions(userRoles.admin) &&
                            <DropdownItem
                                onClick={() => toggle("toFireUser", {
                                    id: u.id,
                                    first_name: u.first_name,
                                    last_name: u.last_name
                                })}
                            >
                                Уволить
                            </DropdownItem>
                            }
                            {checkPermissions(userRoles.admin) &&
                            <div>
                                {status === STATUS_CODES_OF_USERS.active ?
                                    <DropdownItem
                                        onClick={() => toggle("sendOnVacation", {
                                            id: u.id,
                                            first_name: u.first_name,
                                            last_name: u.last_name
                                        })}
                                    >
                                        В отпуск без содержания
                                    </DropdownItem> :
                                    <DropdownItem
                                        onClick={() => toggle("returnFromVacation", {
                                            id: u.id,
                                            first_name: u.first_name,
                                            last_name: u.last_name
                                        })}
                                    >
                                        Из отпуска без содержания
                                    </DropdownItem>}
                            </div>
                            }
                            {u.groups[0]?.name === ADMINISTRATION || u.groups[0]?.name === SUPPORTS ? null :
                                <DropdownItem

                                    onClick={() => toggle("replace", {
                                        id: u.id,
                                        first_name: u.first_name,
                                        last_name: u.last_name
                                    })}
                                >
                                    Замена преподавателя
                                </DropdownItem>}
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            );
        }
    };

    return (
        <Table className="table-users">
            <thead className="text-primary ">
            <tr className="text-center">
                <th> Имя сотрудника</th>
                <th>Дата приема</th>
                <th>Тип пользователя</th>
                <th>Админ</th>
                <th>Наставник</th>

                <th colSpan="2">Действия</th>
            </tr>
            </thead>
            <tbody className="text-center">

            {users?.map((u, i) => (

                <tr
                    style={{
                        border: u.id === parseInt(toActive) && u.groups.length < 1 && "2px solid green",
                    }}
                    bgcolor={checkStatus(u.status)}
                    key={i}
                >
                    <td style={{position: u.id === parseInt(toActive) && u.groups.length < 1 && "relative"}}>
                        {u.id === parseInt(toActive) && u.groups.length < 1 &&
                        <span
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "5px",
                                color: "green"
                            }}
                        ><b>Активируйте</b></span>}
                        {u.first_name + " " + u.last_name}
                    </td>
                    <td>{u.employment_date !== null ? moment(u.employment_date).format("DD.MM.YYYY") : ""}</td>
                    <td>
                        {u.groups.length > 1 ?
                            <ButtonDropdown isOpen={!!dropDownRole[i]} toggle={() => dropDownChangeHandler(i)}>
                                <DropdownToggle
                                    className="btn btn-outline-default btn-sm dropdown-toggle btn ">
                                    Типы пользователей
                                </DropdownToggle>
                                <DropdownMenu className="drop-menu">
                                    {u.groups.map((group, i) => (
                                        <DropdownItem key={i}>{userRolesRus[group.name]}</DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </ButtonDropdown> : userRolesRus[u.groups[0]?.name]}
                    </td>
                    <td>{u.additional_group?.name === ADMIN ? "ДА" : "НЕТ"}</td>
                    <td>{u.additional_group?.name === MENTORS ? "ДА" : "НЕТ"}</td>


                    <td className="text-center" colSpan="2">
                        {getActionButtons(u.status, u, i)}
                    </td>
                </tr>
            ))}

            </tbody>
        </Table>


    );
};

export default UsersTable;