import PerfectScrollbar from "perfect-scrollbar";
import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Nav} from "reactstrap";
import {fetchCurrentUser} from "../../store/acrions/user/actionsCreators";
import "./sidebar.css";

let ps;

class Sidebar extends React.Component {
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

                                    (typeof route.groups === "object" && route.groups.find(role => role === this.props.user.groups[0]?.name) ||
                                        route.groups) && !!(route.status && route.status.find(s => s === this.props.user.status)) || !route.status
                                )
                            ) {
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
