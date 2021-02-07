import React from "react";
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const CustomModalWindow = (props) => {
    return (
        <div>

            <Modal centered={true} isOpen={props.modal} toggle={() => props.toggle(props.nameModal)}>
                {props.title && <ModalHeader id='modal-header' className={props.headerClass} toggle={() => props.toggle(props.nameModal)}>{props.title}</ModalHeader>}

                <ModalBody>
                    <Form className="edit-form">

                        {props.children}

                    </Form>
                </ModalBody>
                <ModalFooter>
                    {props.close && <Button color="secondary"
                                            id='close'
                                            onClick={() => props.toggle(props.nameModal)}>{props.close}</Button>}
                    {props.confirm && <Button
                        disabled={
                            props.disabled
                        }
                        id='confirm'
                        color={props.button_color}
                        type={props.type}
                        onClick={props.onClick}
                    >
                        {props.confirm}
                    </Button>}
                </ModalFooter>
            </Modal>

        </div>
    );
};

export default CustomModalWindow;