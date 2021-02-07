import React from "react";
import Alert from "reactstrap/es/Alert";

const ErrorAlert = ({error}) => {
    return (
        typeof error === "string" ?
            error.length < 100 ?
                <Alert color="danger">{error}</Alert>:
                <Alert color="danger">Error text too much, backend has a problems</Alert>
            :
        Object.keys(error).map(err => (
            <Alert color="danger" key={err}>
                <ul>
                    <h6 style={{marginLeft: "-12px"}}>{err}</h6>
                    {error && error[0] ?
                        error[err].map((subError, index) => (
                            <li key={index} id={err + "ErrorServer"}>{
                                subError
                            }</li>
                        ))
                        :
                        <li id={err + "ErrorServer"}>{
                            error[err]
                        }</li>
                    }
                </ul>
            </Alert>
        ))
    );
};

export default ErrorAlert;