import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const CommonModal = ({isOpen, title, toggle, children, cancel, save, submit, alert, withoutClose, saveId, isDisabled}) => {
    return (
        <div id={'common-modal'}>
            <Modal centered={true} isOpen={isOpen} toggle={toggle}>
                {title && <ModalHeader toggle={toggle}>
                    {title}
                </ModalHeader>}

                <ModalBody>
                    {children}
                </ModalBody>

                {!withoutClose && <ModalFooter>
                    {cancel && <Button id={'cancel-button'} color="secondary" onClick={toggle}>{cancel}</Button>}
                    {save && <Button disabled={isDisabled} onClick={submit} id={saveId ? saveId : 'save-button'}
                                     color={`btn ${alert === true ? 'btn-danger' : 'btn-info'}`}>{save}</Button>}
                </ModalFooter>}
            </Modal>
        </div>
    );
};

export default CommonModal;