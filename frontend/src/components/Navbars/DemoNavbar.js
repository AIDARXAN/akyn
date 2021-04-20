import React from "react";
import {Collapse, Container, Dropdown, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand,} from "reactstrap";

import routes from "routes.js";
import LogoutButton from "./LogoutButton";
import {connect} from "react-redux";
import {getNotifications, readAllNotifications} from "../../store/acrions/Notification/actionCreators";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import RegistrationNotification from "../Alerts/RegistrationNotification";
import {apiURL} from "../../configAPI";
import moment from "moment";

const REGISTERED_NOTIFICATION = "RegisteredNotification";
const BIRTHDAY_NOTIFICATION = "birthday";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            dropdownOpen2: false,
            color: "transparent",
        };
        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.sidebarToggle = React.createRef();
    }

    toggle() {
        if (this.state.isOpen) {
            this.setState({
                color: "transparent",
            });
        } else {
            this.setState({
                color: "dark",
            });
        }
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    dropdownToggle() {
        if (!this.state.dropdownOpen === false) this.props.readAllNotificationsToggle();
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    dropdownToggle2() {
        this.setState({
            dropdownOpen2: !this.state.dropdownOpen2,
        });
    }

    getBrand() {
        let brandName = "Default Brand";
        routes.map((prop) => {
            if (window.location.href.indexOf(prop.path) !== -1) {
                brandName = prop.name;
            }
            return null;
        });
        return brandName;
    }

    openSidebar() {
        document.documentElement.classList.toggle("nav-open");
        this.sidebarToggle.current.classList.toggle("toggled");
    }

    // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
    updateColor() {
        if (window.innerWidth < 993 && this.state.isOpen) {
            this.setState({
                color: "dark",
            });
        } else {
            this.setState({
                color: "transparent",
            });
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateColor.bind(this));
    }

    componentDidUpdate(e) {
        if (
            window.innerWidth < 993 &&
            e.history.location.pathname !== e.location.pathname &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
            this.sidebarToggle.current.classList.toggle("toggled");
        }
    }

    render() {
        return (
            // add or remove classes depending if we are on full-screen-maps page or not
            <Navbar
                id='nav_bar'
                color={
                    // eslint-disable-next-line react/prop-types
                    this.props.location.pathname.indexOf("full-screen-maps") !== -1
                        ? "dark"
                        : this.state.color
                }
                expand='lg'
                className={
                    // eslint-disable-next-line react/prop-types
                    this.props.location.pathname.indexOf("full-screen-maps") !== -1
                        ? "navbar-absolute fixed-top"
                        : "navbar-absolute fixed-top " +
                        (this.state.color === "transparent" ? "navbar-transparent " : "")
                }
            >
                <Container fluid>
                    <div className='navbar-wrapper'>
                        <div className='navbar-toggle'>
                            <button
                                type='button'
                                ref={this.sidebarToggle}
                                id={"navbarToogle"}
                                className='navbar-toggler'
                                onClick={() => this.openSidebar()}
                            >
                                <span className='navbar-toggler-bar bar1'/>
                                <span className='navbar-toggler-bar bar2'/>
                                <span className='navbar-toggler-bar bar3'/>
                            </button>
                        </div>
                        <NavbarBrand>{this.getBrand()}</NavbarBrand>
                        <span className="position-absolute navbar-toggler" style={{right: "20px"}}>
                            {this.props.notifications && this.props.notifications.length > 0 && !this.state.isOpen &&
                            <span style={{
                                background: "#f5725a",
                                padding: " 1px 4px",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "15px",
                                borderRadius: "3px",
                                display: "inline-block",
                                position: "absolute",
                                left: "-4px"
                            }}>!</span>}
                            <span id="userNavbarToogle"
                                  className={`d-inline-block nc-icon nc-minimal-${!this.state.isOpen ? "down" : "up text-light"}`}
                                  onClick={this.toggle}/>
                        </span>
                    </div>
                    <Collapse
                        isOpen={this.state.isOpen}
                        navbar
                        className='justify-content-end text-center'
                    >
                        {/*<Nav navbar className='ml-auto'>*/}
                        {/*    <Dropdown*/}
                        {/*        nav*/}
                        {/*        isOpen={this.state.dropdownOpen}*/}
                        {/*        toggle={(e) => this.dropdownToggle(e)}*/}
                        {/*        id="bell"*/}
                        {/*    >*/}
                        {/*        <DropdownToggle caret nav id="notificationsList">*/}
                        {/*            <span style={{*/}
                        {/*                background: "#f5725a",*/}
                        {/*                padding: " 1px 4px",*/}
                        {/*                color: "white",*/}
                        {/*                fontWeight: "bold",*/}
                        {/*                fontSize: "15px",*/}
                        {/*                borderRadius: "3px"*/}
                        {/*            }}>{this.props.notifications && this.props.notifications.length}</span>*/}
                        {/*            <i className='nc-icon nc-bell-55'/>*/}
                        {/*        </DropdownToggle>*/}

                        {/*        <DropdownMenu right className='overflow-hidden'>*/}
                        {/*            <div style={{minWidth: "300px"}}>*/}
                        {/*                {this.props.notifications && this.props.notifications[0] ? this.props.notifications.map((e, id) => (*/}
                        {/*                    <div key={id} style={{*/}
                        {/*                        fontSize: "14px",*/}
                        {/*                        position: "relative",*/}
                        {/*                        padding: "15px 15px 15px 30px",*/}
                        {/*                        background: e.notification.name === REGISTERED_NOTIFICATION && "#ef8157",*/}
                        {/*                        display: "flex"*/}
                        {/*                    }}>*/}
                        {/*                        <i*/}
                        {/*                            style={{*/}
                        {/*                                transform: "scale(1.2)",*/}
                        {/*                                position: "absolute",*/}
                        {/*                                left: "10px",*/}
                        {/*                                top: "15px"*/}
                        {/*                            }}*/}
                        {/*                            className={`nc-icon nc-alert-circle-i text-${e.notification.name === REGISTERED_NOTIFICATION ? "light" : "success"} pr-2`}*/}
                        {/*                        />*/}
                        {/*                        {e.notification.name === REGISTERED_NOTIFICATION &&*/}
                        {/*                        <RegistrationNotification*/}
                        {/*                            firstName={e.notification.user.first_name}*/}
                        {/*                            lastName={e.notification.user.last_name}*/}
                        {/*                            id={e.notification.user.id}*/}
                        {/*                        />*/}
                        {/*                        }*/}
                        {/*                    </div>*/}
                        {/*                )) : <p id="not-notification" className='p-2'>Билдирүү жок</p>}*/}

                        {/*            </div>*/}
                        {/*        </DropdownMenu>*/}
                        {/*    </Dropdown>*/}
                        {/*</Nav>*/}
                        {this.props.user && <Nav className="ml-2">
                            <Dropdown
                                nav
                                direction="down"
                                isOpen={this.state.dropdownOpen2}
                                toggle={(e) => this.dropdownToggle2(e)}
                                className={`${this.state.isOpen ? "ml-auto mr-auto" : "ml-2"}`}
                            >
                                <DropdownToggle id="userInfoNavBar" tag="span" caret
                                                className="d-block"
                                                style={{
                                                    color: this.state.isOpen ? "#fff" : "#66615B",
                                                    cursor: "pointer",
                                                    fontSize: "20px"
                                                }}>
                                    <span>
                                        {this.props.user.first_name} {this.props.user.last_name}
                                        {" "}
                                        <img
                                            alt="..."
                                            className="avatar border-gray rounded-circle"
                                            style={{width: "50px", height: "50px"}}
                                            src={this.props.user.avatar ? this.props.user.avatar : require("assets/img/cat.jpeg")}
                                        />
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu right className={"text-center  d-block w-100 p-2"}>
                                    <LogoutButton color={this.state.isOpen ? "#fff" : "#66615B"}/>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>}
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    notifications: state.notification.notifications,
    user: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    readAllNotificationsToggle: () => dispatch(readAllNotifications()),
    getNewNotifications: () => dispatch(getNotifications())
});

Header.propTypes = {
    notifications: PropTypes.any,
    readAllNotificationsToggle: PropTypes.func

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

