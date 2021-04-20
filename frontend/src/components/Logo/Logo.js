import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/all.css";
// eslint-disable-next-line no-unused-vars

const Logo = ({center, scale}) => {
    return (
        <div className="logo" style={{textAlign: center && "center", transform: "scale(" + scale + ")"}}>
            <div className='logo-container'>
                <a
                    className='p-0 auth-logo'
                >
                    <span className="logo-image-animated"></span>
                </a>
            </div>
        </div>
    );
};

Logo.propTypes = {
    center: PropTypes.bool,
    scale: PropTypes.number
};

export default Logo;