import PerfectScrollbar from "perfect-scrollbar";
import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Nav} from "reactstrap";
import {userRoles} from "../../constants";
import routes from "../../routes";
import {fetchCurrentUser} from "../../store/acrions/user/actionsCreators";
import "./sidebar.css";
import SidebarDropDownMenu from "./SidebarDropDownMenu";
import SideBarSheetDropDown from "./SideBarSheetDropDown";
import SideBarWorkDays from "./SideBarWorkDays";

let ps;

class Sidebar extends React.Component {

    state = {
        workDaysToggle: false,
        sheetToggle: false,
        helpToggle: false
    };

    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.sidebar = React.createRef();
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        // eslint-disable-next-line react/prop-types
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    componentDidMount() {
        this.props.getCurrentUser();
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }

    toggleSheet() {
        this.setState({...this.state, sheetToggle: !this.state.sheetToggle});
    }

    toggleWorkDays() {
        this.setState({...this.state, workDaysToggle: !this.state.workDaysToggle});
    }

    toggleHelp() {
        this.setState({...this.state, helpToggle: !this.state.helpToggle});
    }

    render() {
        return (
            <div
                className='sidebar'
                /* eslint-disable-next-line react/prop-types */
                data-color={this.props.bgColor}
                /* eslint-disable-next-line react/prop-types */
                data-active-color={this.props.activeColor}
            >
                <div className='logo'>
                    <div className='logo-container'>
                        <a
                            className='p-0 sidebar-logo ml-2'
                        >
                            <span className='logo-image-animated'></span>
                        </a>
                    </div>
                </div>
                <div className='sidebar-wrapper' ref={this.sidebar}>
                    {this.props.user && this.props.user.groups && <Nav>
                        {this.props.routes.map((route, key) => {

                            if (
                                route.isVisible !== false &&
                                (
                                    (((
                                        (typeof route.groups === "object" && route.groups.find(role => role === this.props.user.groups[0]?.name)) ||
                                        (route.additionalGroup && this.props.user?.additional_group && route.additionalGroup.find(group => group === this.props.user.additional_group.name))
                                    ) && this.props.user.account_activation_date !== null)
                                    ||
                                    (!route.groups && !route.additionalGroup)) && !!(route.status && route.status.find(s => s === this.props.user.status)) || !route.status
                                )
                            ) {

                                if ((route.path === "/sheet-mentors" && this.props.user.additional_group?.name !== userRoles.mentors) ||
                                    ((route.path === "/sheet-mentors" && this.props.user.additional_group?.name === userRoles.mentors)))
                                    return;
                                if ((route.path === "/weekend-sheet" || route.path === "/sheet-users" || route.path === "/vacation-sheet") && this.props.user?.account_activation_date === null)
                                    return;
                                if ((route.path === "/workDays/mentors") && (this.props.user.additional_group?.name === userRoles.mentors))
                                    return;
                                if ((route.path === `/workDays/${this.props.user.groups[0]?.name}` && this.props.user.additional_group?.name === userRoles.mentors)
                                    || route.path === "/workDays/teachers" && this.props.user.additional_group?.name === userRoles.mentors)
                                    return <SideBarWorkDays
                                        getCurrentUser={this.props.getCurrentUser}
                                        toggleWorkDays={() => this.toggleWorkDays()}
                                        workDaysToggle={this.state.workDaysToggle}
                                        prop={route}
                                        user={this.props.user}
                                    />;
                                if ((route.path === "/sheet-users" && this.props.user.additional_group?.name === userRoles.mentors)
                                    || route.path === "/sheet-users" && this.props.user.additional_group?.name === userRoles.admin) {
                                    return <SideBarSheetDropDown
                                        getCurrentUser={this.props.getCurrentUser}
                                        toggleSheet={() => this.toggleSheet()}
                                        sheetToggle={this.state.sheetToggle}
                                        prop={route}
                                        user={this.props.user}
                                    />;
                                }

                                return (
                                    <li
                                        className={
                                            this.activeRoute(route.path) +
                                            (route.pro ? " active-pro" : "")
                                        }
                                        key={key}
                                    >
                                        <NavLink
                                            style={{margin: "0 15px"}}
                                            onClick={() => this.props.getCurrentUser()}
                                            to={route.path}
                                            className='nav-link font-weight-bold'
                                            activeClassName='active'
                                            id={route.id + "Page"}
                                        >
                                            <i className={route.icon}/>
                                            <p>{route.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            }
                        })}
                        <SidebarDropDownMenu
                            toggle={this.toggleHelp.bind(this)}
                            boolValue={this.state.helpToggle}
                            linkName={"Помощь"}
                            icon={"nc-icon nc-ambulance"}
                            routes={routes.filter(r => r.filterId === "help")}
                        />
                    </Nav>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(fetchCurrentUser())
});

Sidebar.propTypes = {
    routes: PropTypes.any,
    user: PropTypes.any,
    getCurrentUser: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
