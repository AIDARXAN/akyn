import PropTypes from "prop-types";
import React from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import "./modals.css";

const SimpleModal = (
    {children, isOpen, toggle, title}
) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className='simpleModal'>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </Modal>
    );
};

SimpleModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    title: PropTypes.string
};

export default SimpleModal;