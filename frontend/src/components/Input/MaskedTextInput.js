import MaskedTextInput from "react-text-mask";
import React from "react";
import "./maskedTextInput.css";

export const maskedDateInput = () => {
    return (
        <MaskedTextInput
            type="text"
            mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
            classNames='in-valid-background'
        />
    );
};

