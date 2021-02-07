/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import {Row} from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import "../../assets/css/all.css";

class Footer extends React.Component {
    render() {
        return (
            <footer
                className={"footer" + (this.props.default ? " footer-default" : "")}
            >
                <Row style={{margin: "0"}}>
                    <div className="credits ml-auto">
                        <div className="copyright">
                            &copy; {new Date().getFullYear()}
                            , made with{" "}
                            <i className="fa fa-heart heart" style={{color: "#66615B"}}/>
                        </div>
                    </div>
                </Row>
            </footer>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool,
};

export default Footer;
