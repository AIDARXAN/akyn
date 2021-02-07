import React from "react";
import {Collapse} from "reactstrap";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const SidebarDropDownMenu = ({toggle, boolValue, linkName, icon, routes}) => {
    return (

        <li>
            <NavLink
                style={{margin: "0 15px"}}
                className='nav-link font-weight-bold help-link'
                onClick={toggle}
                to={"#"}
            >
                <i className={icon}/>
                <p className='d-flex align-items-center'>{linkName}</p>
            </NavLink>

            <Collapse isOpen={boolValue}>
                {routes.map((value) => {
                    return (
                        <NavLink
                            key={value.id}
                            to={value.path}
                            className='text-decoration-none drop-link'
                        >
                            <p className='pl-4 py-2'>{value.name}</p>
                        </NavLink>
                    );
                })}
            </Collapse>
        </li>

    );
};
SidebarDropDownMenu.propTypes = {
    toggle: PropTypes.func,
    boolValue: PropTypes.bool,
    linkName: PropTypes.string,
    icon:PropTypes.string,
    routes:PropTypes.array

};
export default SidebarDropDownMenu;