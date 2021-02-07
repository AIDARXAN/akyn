import React from "react";
import {NavLink} from "react-router-dom";

const FillTheWorkDaySheetNotification = () => {
    return (
        <NavLink exact to={"/workDays/mentors"}>
            <div className="d-flex" style={{color: "#66615b"}}>
                <div>
                    <h6 className="text-uppercase font-weight-bold p-0 m-0">Ведомость наставников</h6>
                    <p className="d-block">Заполните ведомость наставничества!!!</p>
                </div>
            </div>
        </NavLink>
    );
};

export default FillTheWorkDaySheetNotification;