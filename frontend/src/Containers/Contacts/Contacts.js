import React, {useEffect, useState} from "react";
import ContactTable from "../../components/ContactTable/ContactTable";
import {Button, Card, CardBody, Col} from "reactstrap";
import "./Contacts.css";
import ContactsMiniTable from "../../components/ContactTable/ContactsMiniTable";
import SearchForm from "../../components/SearchForm/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {getContacts} from "../../store/acrions/user/actionsCreators";
import {NavLink} from "react-router-dom";
import {STATUS_CODES_OF_USERS} from "../../constants";

const Contacts = props => {
    const dispatch = useDispatch();

    let contacts = useSelector(state => state.user.contacts);

    useEffect(() => {
        if (props.match.params.status) {
            dispatch(getContacts(props.match.params.status));
        } else {
            dispatch(getContacts());
        }
    }, [props.match.params.status]);

    const [search, setSearch] = useState({search: ""});

    const tableStatus = {"1": "Активен", "2": "Уволен", "3": "В отпуске", "null": "Не активирован"};

    const checkStatus = (user) => {

        if (user.status === STATUS_CODES_OF_USERS.fired) {
            return "#ed969e";

        } else if (user.status === null) {
            return "#b3b7bb";

        } else if (user.status === STATUS_CODES_OF_USERS.in_vacation) {
            return "#ffdf7e";
        }
    };


    const onChangeHandler = (e) => {
        let value = e.target.value;
        if (value[e.target.value.length - 1] === "\\") return setSearch({search: ""});
        setSearch({search: value});
    };

    contacts = contacts && contacts.filter(word =>
        word["first_name"].search(new RegExp("^" + search.search, "i")) !== -1 ||
        word["email"].search(new RegExp("^" + search.search, "i")) !== -1 ||
        word["phone"].search(new RegExp("^" + search.search, "i")) !== -1

    );

    return (
        <>
            <div className='contacts-wrap pt-3 pl-lg-3 pr-lg-5'>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <Col className='pt-2 pb-4 m-auto'>
                                <Col className='pt-2 pb-3 m-auto'>
                                    <SearchForm
                                        onChangeHandler={onChangeHandler}
                                    />
                                </Col>
                                <Col className=''>
                                    <NavLink to={"/contacts"}>
                                        <Button className='btn-contacts all-btn'>
                                            Все
                                        </Button>
                                    </NavLink>
                                    {" "}

                                    <NavLink to={`/contacts/${STATUS_CODES_OF_USERS.active}`}>
                                        <Button className='btn-contacts btn-active-filter'>
                                            Активные
                                        </Button>
                                    </NavLink>
                                    {" "}

                                    <NavLink to={`/contacts/${STATUS_CODES_OF_USERS.in_vacation}`}>
                                        <Button className='btn-contacts btn-vacation'>
                                            В отпуске
                                        </Button>
                                    </NavLink>
                                    {" "}

                                    <NavLink to={`/contacts/${STATUS_CODES_OF_USERS.fired}`}>
                                        <Button className='btn-contacts btn-fired'>
                                            Уволенные
                                        </Button>
                                    </NavLink>
                                    {" "}
                                </Col>
                            </Col>
                            <Col className='table-contacts'>
                                {contacts && <ContactTable
                                    rows={contacts}
                                    checkStatus={checkStatus}
                                    tableStatus={tableStatus}
                                />}
                            </Col>
                            <Col className='table-contacts-mini '>
                                {contacts && contacts.map((k, i) => (
                                    <ContactsMiniTable
                                        name={k.last_name + " " + k.first_name}
                                        email={k.email}
                                        phone={k.phone}
                                        status={k.status}
                                        key={i}
                                        user={k}
                                        checkStatus={checkStatus}
                                        tableStatus={tableStatus}
                                    />
                                ))}
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        </>
    );

};

export default Contacts;