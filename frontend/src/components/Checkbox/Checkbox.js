import React from "react";
import {FormGroup, Label} from "reactstrap";
import "./checkbox.css";

const Checkbox = ({label, isSelected, onCheckboxChange}) => (
    <div className="form-check">
        <FormGroup check>

            <Label check>
                <input
                    id="input-visible"
                    type="checkbox"
                    name={label}
                    checked={isSelected}
                    onChange={onCheckboxChange}
                    className="form-check-input input-visible"
                />
                {label}
            </Label>
        </FormGroup>

    </div>
);

export default Checkbox;