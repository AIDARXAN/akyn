import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Collapse} from "reactstrap";
import routes from "../../routes";
import {userRoles} from "../../constants";

const linkPostfixes = {
  [userRoles.teachers]: 'препода',
  [userRoles.supports]: 'младшего препода',
  [userRoles.administration]: 'админа',
};

const SideBarWorkDays = (
    {toggleWorkDays, getCurrentUser, prop, workDaysToggle, user}
) => {
    const location = useLocation().pathname;
    const activeRoute = routeName => {
        // eslint-disable-next-line react/prop-types
        return location.indexOf(routeName) > -1 ? "active" : "";
    };

    const userRoleName = user.groups[0]?.name;

    return (
        <li>
            <NavLink
                onClick={() => {
                    toggleWorkDays();
                    getCurrentUser();
                }}
                to={"#"}
                className='nav-link font-weight-bold'
                id='sheetPage'
            >
                <i className={prop.icon}/>
                <p>Рабочие дни</p>
            </NavLink>
            <Collapse isOpen={workDaysToggle}>
                <ul className='list-unstyled p-0 m-0'>
                    {routes.filter(route => route.path === `/workDays/${userRoleName}` || route.path === "/workDays/mentors").map((route, index) => {
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
                                        {route.path === `/workDays/${userRoles[userRoleName]}` ?
                                            `Рабочие дни ${linkPostfixes[userRoles[userRoleName]]}` :
                                            "Рабочие дни наставника"}
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

export default SideBarWorkDays;
