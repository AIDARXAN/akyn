import React, {useEffect, useState} from "react";
import UsersTable from "../../components/UsersTable/UsersTable";
import {Card, CardBody, Col} from "reactstrap";
import UserMiniTable from "../../components/UsersTable/UserMiniTable";
import SearchForm from "../../components/SearchForm/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import DateUsersModal from "../../components/Modals/DateUsersModal";
import RightsAndClassesModal from "../../components/Modals/RightsAndClassesModal";
import ActivateUserModal from "../../components/Modals/ActivateUserModal";
import ToFireUserModal from "../../components/Modals/ToFireUserModal";
import SendOnVacationModal from "../../components/Modals/SendOnVacationModal";
import ReplaceTeacherModal from "../../components/Modals/ReplaceTeacherModal";
import MoreDetailsUserModal from "../../components/Modals/MoreDetailsUserModal";
import {fetchUsers} from "../../store/acrions/user/actionsCreators";
import {fetchGroups} from "../../store/acrions/ActivateUser/actionsCreators";
import DeleteUserModal from "../../components/Modals/DeleteUserModal";
import {NavLink, useParams} from "react-router-dom";
import {STATUS_CODES_OF_USERS} from "../../constants";
import "../../assets/css/paper-dashboard.css";
import Button from "reactstrap/es/Button";
import ReturnFromVacationModal from "../../components/Modals/ReturnFromVacationModal";


const Users = props => {

    const dispatch = useDispatch();
    let usersData = useSelector(state => state.user.users);
    const groupsData = useSelector(state => state.activateUser.groups);
    const {id, toActive} = useParams();

    useEffect(() => {
        if (props.match.params.status) {
            dispatch(fetchUsers(props.match.params.status));
        } else {
            dispatch(fetchUsers());
        }
        dispatch(fetchGroups());
    }, [props.match.params.status]);

    const [open, setOpen] = useState([]);
    const openButton = (i) => {
        let isOpen = [];
        isOpen[i] = !open[i];
        setOpen(isOpen);
    };

    const [employment_date, setEmployment_date] = useState({
        employment_date: "",
    });
    const employment_dateChangeHandler = (e) => {
        setEmployment_date({employment_date: e.target.value});
    };

    const [valueModal, setValueModal] = useState({});

    const [modal, setModal] = useState({
        activationUser: false,
        confirmModal: false,
        employment_date: false,
        rightsAndClasses: false,
        toFireUser: false,
        replace: false,
        userDetails: false,
        sendOnVacation: false,
        returnFromVacation: false,
        confirmActivationUser: false,
        deleteUser: false
    });

    // modal control function
    const toggle = (name, data) => {
        if (data) {
            setValueModal(data);
        }

        setModal({...modal, [name]: !modal[name]});
    };

    const onChangeHandler = (e) => {
        let value = e.target.value;
        if (value[e.target.value.length - 1] === "\\") return setSearch({search: ""});
        setSearch({search: value});
    };

    useEffect(() => {
        if (usersData !== undefined && id) {
            const user = usersData.find(user => user.id === parseInt(id));
            const activatingUser = {
                id: user?.id,
                first_name: user?.first_name,
                last_name: user?.last_name,
                role: user?.groups,
                right: user?.additional_group
            };


            if (activatingUser && valueModal.role !== undefined && modal.activationUser === false) {
                setModal({...modal, activationUser: true});
            }
            if (modal.activationUser === false) {
                setValueModal(activatingUser);
            }

        }
    }, [id, usersData, valueModal]);

    const [search, setSearch] = useState({search: ""});
    usersData = usersData && usersData.filter(word =>
        word["last_name"].search(new RegExp("^" + search.search, "i")) !== -1 ||
        word["first_name"].search(new RegExp("^" + search.search, "i")) !== -1
    );

    return (

        <div className='contacts-wrap pl-lg-3 pr-lg-3 content'>
            <Col>
                <Card>
                    <CardBody>
                        <Col className='pt-2 pb-4 m-auto'>
                            <Col className='pt-2 pb-3 m-auto'>
                                <SearchForm
                                    onChangeHandler={onChangeHandler}
                                />
                            </Col>
                            <Col className=''>
                                <NavLink to={"/users"}>
                                    <Button className='btn-contacts all-btn'>
                                        Все
                                    </Button>
                                </NavLink>
                                {" "}

                                <NavLink to={`/users/${STATUS_CODES_OF_USERS.active}`}>
                                    <Button className='btn-contacts btn-active-filter'>
                                        Активные
                                    </Button>
                                </NavLink>
                                {" "}

                                <NavLink to={`/users/${STATUS_CODES_OF_USERS.in_vacation}`}>
                                    <Button className='btn-contacts btn-vacation'>
                                        В отпуске
                                    </Button>
                                </NavLink>
                                {" "}

                                <NavLink to={`/users/${STATUS_CODES_OF_USERS.fired}`}>
                                    <Button className='btn-contacts btn-fired'>
                                        Уволенные
                                    </Button>
                                </NavLink>
                                {" "}
                            </Col>
                        </Col>
                        <UsersTable
                            users={usersData}
                            toggle={toggle}
                            toActive={toActive}
                        />

                        {usersData && usersData.map((u, i) => (

                            <UserMiniTable
                                key={i}
                                id={u.id}
                                first_name={u.first_name}
                                last_name={u.last_name}
                                email={u.email}
                                phone={u.phone}
                                birth_date={u.birth_date}
                                employment_date={u.employment_date}
                                fired_at={u.fired_at}
                                role={u.groups}
                                right={u.additional_group}
                                openButton={() => openButton(i)}
                                open={open}
                                i={i}
                                toggle={toggle}
                                status={u.status}
                            />

                        ))}

                    </CardBody>
                </Card>

            </Col>
            {modal.activationUser && <ActivateUserModal
                toggle={toggle}
                modal={modal}
                nameModal={"activationUser"}
                nestedNameModal={"confirmActivationUser"}
                title={"Активация пользователя"}
                groupsDataObject={groupsData}
                valueModal={valueModal}
                userClass={valueModal.role}
                userRight={valueModal.right}
                roles={groupsData.groups}
                additional_roles={groupsData.additional_groups}
            />}
            {modal.deleteUser && <DeleteUserModal
                toggle={toggle}
                modal={modal}
                nameModal={"deleteUser"}
                valueModal={valueModal}
                usersData={usersData}
            />}
            {modal.employment_date && <DateUsersModal
                toggle={toggle}
                modal={modal}
                nameModal={"employment_date"}
                changeHandler={employment_dateChangeHandler}
                value={"01.02.2015"}
                title={"date"}
            />}
            {modal.rightsAndClasses && <RightsAndClassesModal
                toggle={toggle}
                modal={modal}
                nameModal={"rightsAndClasses"}
                valueModal={valueModal}
                userClass={valueModal.role}
                userRight={valueModal.right}
                roles={groupsData.groups}
                additional_roles={groupsData.additional_groups}
            />}
            {modal.toFireUser && <ToFireUserModal

                toggle={toggle}
                modal={modal}
                nameModal={"toFireUser"}
                valueModal={valueModal}
                nestedModal={"confirmModal"}
            />}
            {modal.sendOnVacation && <SendOnVacationModal
                toggle={toggle}
                modal={modal}
                nameModal={"sendOnVacation"}
                valueModal={valueModal}
            />}
            {modal.returnFromVacation && <ReturnFromVacationModal
                toggle={toggle}
                modal={modal}
                nameModal={"returnFromVacation"}
                valueModal={valueModal}
            />}
            {modal.replace && <ReplaceTeacherModal
                toggle={toggle}
                modal={modal}
                nameModal={"replace"}
                users={usersData}
                valueModal={valueModal}
            />}
            {modal.userDetails && <MoreDetailsUserModal
                toggle={toggle}
                modal={modal}
                nameModal={"userDetails"}
                value={"userDetails"}
                title={"Информация о пользователе"}
                valueModal={valueModal}
            />}


        </div>
    );
};

export default Users;