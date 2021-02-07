import React, {useState} from "react";
import {Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Table} from "reactstrap";
import moment from "moment";
import {ACTIVE, ADMINISTRATION, STATUS_CODES_OF_USERS, SUPPORTS, userRoles, userRolesRus} from "../../constants";
import {checkPermissions} from "../../services";


const UserMiniTable = ({
                           id,
                           email,
                           phone,
                           first_name,
                           last_name,
                           birth_date,
                           employment_date,
                           role,
                           right,
                           openButton,
                           open,
                           i,
                           toggle,
                           status,
                           fired_at
                       }) => {

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
                    id="remove-new-user-min"
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

    const userIsAdmin = (groups) => {
        const group = groups?.name === userRoles.admin;
        if (group)
            return true;
    };

    const userIsMentor = (groups) => {
        const group = groups?.name === userRoles.mentors;
        if (group)
            return true;
    };

    const userDetailButton = () => {
        return (
            <Button className="btn btn-outline-default btn-sm"
                    id="user-detail-min"
                    onClick={() => toggle("userDetails", {
                        full_name: first_name + " " + last_name,
                        role: role[0].name,
                        email: email,
                        phone: phone,
                        birth_date: moment(birth_date).format("DD.MM.YYYY"),
                        employment_date: moment(employment_date).format("DD.MM.YYYY"),
                        fired_at: moment(fired_at).format("DD.MM.YYYY"),
                        is_active: userIsActive(status),
                        is_admin: userIsAdmin(right),
                        is_mentor: userIsMentor(right)
                    })}
            >
                Подробнее
            </Button>
        );
    };

    const getActionButtons = (status) => {
        if (status === null) {
            return (
                <div className="btn-group button-box" role="group">
                    <button className="btn btn-success btn-sm"
                            id='activate-min'
                            onClick={() => toggle("activationUser", {
                                id,
                                first_name,
                                last_name,
                                role,
                                right
                            })}
                    >Активировать
                    </button>
                    {deleteButton(id, first_name, last_name)}
                </div>
            );
        } else if (status === STATUS_CODES_OF_USERS.fired) {
            return (
                <div className="btn-group button-box" role="group">
                    {userDetailButton()}
                    {deleteButton(id, first_name, last_name)}
                </div>
            );
        } else if (status === STATUS_CODES_OF_USERS.active || status === STATUS_CODES_OF_USERS.in_vacation) {
            return (
                <div className="btn-group">
                    {userDetailButton()}
                    <ButtonDropdown isOpen={!!open[i]} toggle={() => openButton(i)}>
                        <DropdownToggle
                            id='control-min'
                            className="btn btn-outline-default btn-sm dropdown-toggle btn btn-secondary">
                            Управление
                        </DropdownToggle>
                        <DropdownMenu className="drop-menu">
                            <DropdownItem
                                id={"edit-user-role-min"}
                                onClick={() => toggle("rightsAndClasses", {
                                    id,
                                    first_name,
                                    last_name,
                                    role,
                                    right
                                })}
                            >
                                Типы и роли
                            </DropdownItem>

                            {checkPermissions(userRoles.admin) &&
                            <DropdownItem
                                id='fire-user-min'
                                onClick={() => toggle("toFireUser", {
                                    id,
                                    first_name,
                                    last_name
                                })}
                            >
                                Уволить
                            </DropdownItem>
                            }

                            {checkPermissions(userRoles.admin) && <div>
                                {status === STATUS_CODES_OF_USERS.active ?
                                    <DropdownItem
                                        id={"send-to-vacation-user-min"}
                                        onClick={() => toggle("sendOnVacation", {
                                            id,
                                            first_name,
                                            last_name
                                        })}
                                    >
                                        В отпуск без содержания
                                    </DropdownItem>
                                    :
                                    <DropdownItem
                                        id={"return-from-vacation-user-min"}
                                        onClick={() => toggle("returnFromVacation", {
                                            id,
                                            first_name,
                                            last_name
                                        })}
                                    >
                                        Из отпуска без содержания
                                    </DropdownItem>
                                }</div>
                            }
                            {role[0]?.name === ADMINISTRATION || role[0]?.name === SUPPORTS ? null : <DropdownItem
                                id='replace-button-min'
                                onClick={() => toggle("replace", {
                                    id,
                                    first_name,
                                    last_name
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
        <Table bgcolor={checkStatus(status)} className="mt-2 table-users-mini">
            <thead className="text-primary">
            <tr>
                <th colSpan="2">{last_name + " " + first_name}</th>


            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="td-1">Дата приема на работу</td>
                <td className="td-2">
                    {employment_date !== null ? moment(employment_date).format("DD.MM.YYYY") : ""}
                </td>
            </tr>
            <tr>
                <td id='class-min' className="td-1">Тип пользователя</td>
                <td className="td-2">
                    {role.length > 1 ?
                        <ButtonDropdown isOpen={!!dropDownRole[i]} toggle={() => dropDownChangeHandler(i)}>
                            <DropdownToggle
                                className="btn btn-outline-default btn-sm dropdown-toggle btn ">
                                Типы пользователей
                            </DropdownToggle>
                            <DropdownMenu className="drop-menu">
                                <DropdownItem header>Header</DropdownItem>
                                {role.map((group, i) => (
                                    <DropdownItem key={i}>{userRolesRus[group.name]}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </ButtonDropdown> : userRolesRus[role[0]?.name]}
                </td>
            </tr>
            <tr>
                <td className="td-1">Админ</td>
                <td className="td-2">{userIsAdmin(right) ? "ДА" : "НЕТ"}</td>

            </tr>
            <tr>
                <td className="td-1">Наставник</td>
                <td className="td-2">{userIsMentor(right) ? "ДА" : "НЕТ"}</td>

            </tr>
            <tr>
                <td colSpan="2">
                    {getActionButtons(status)}
                </td>

            </tr>
            </tbody>
        </Table>
    );
};

export default UserMiniTable;