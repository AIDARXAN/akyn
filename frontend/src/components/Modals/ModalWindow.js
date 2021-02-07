import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


const ModalWindow = (props) => {
    return (
        <div>

            <Modal centered={true} isOpen={props.modal} toggle={() => props.toggle(props.nameModal)}>

                <ModalHeader toggle={() => {
                    if(props.closePeriod) return props.closePeriodHandler();
                    props.toggle(props.nameModal);
                }}>{props.title}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    {props.close && <Button color="secondary" onClick={() => props.toggle(props.nameModal)}>{props.close}</Button>}
                    {props.save &&
                    <Button id="modal-save-button" disabled={props.isSaveDisable} color="primary pl-3" type="submit" onClick={props.toggle}>{props.save}</Button>}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalWindow;