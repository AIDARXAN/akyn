import React from "react";
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

const SearchForm = ({onChangeHandler}) => {
    return (
        <InputGroup className="no-border">
            <Input placeholder="Адамды издөө..."
                   onChange={onChangeHandler}
                   className="input-contacts"
                   id='contacts-search'
            />
            <InputGroupAddon addonType="append">
                <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    );
};

export default SearchForm;