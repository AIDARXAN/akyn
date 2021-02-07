import PropTypes from "prop-types";
import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Collapse} from "reactstrap";
import routes from "../../routes";

const SideBarSheetDropDown = (
    {toggleSheet, getCurrentUser, prop, sheetToggle}
) => {
    const location = useLocation().pathname;
    const activeRoute = routeName => {
        // eslint-disable-next-line react/prop-types
        return location.indexOf(routeName) > -1 ? "active" : "";
    };

    return (
        <li>
            <NavLink
                onClick={() => {
                    toggleSheet();
                    getCurrentUser();
                }}
                to={"#"}
                className='nav-link font-weight-bold'
                id='sheetPage'
            >
                <i className={prop.icon}/>
                <p>Ведомости</p>
            </NavLink>
            <Collapse isOpen={sheetToggle}>
                <ul className='list-unstyled p-0 m-0'>
                    {routes.filter(route => route.path === "/sheet-users" || route.path === "/sheet-mentors").map((route, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    activeRoute(route.path) +
                                    (route.pro ? " active-pro" : "")
                                }>
                                <NavLink
                                    to={route.path}
                                    className='nav-link'
                                    id={route.id + "Page"}
                                >
                                    <p>
                                        {route.path === "/sheet-users" ?
                                            "Ведомость сотрудников" :
                                            "Ведомость наставников"}
                                    </p>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </Collapse>
        </li>
    );
};

SideBarSheetDropDown.propTypes = {
    toggleSheet: PropTypes.func,
    getCurrentUser: PropTypes.func,
    prop: PropTypes.object,
    sheetToggle: PropTypes.bool
};

export default SideBarSheetDropDown;