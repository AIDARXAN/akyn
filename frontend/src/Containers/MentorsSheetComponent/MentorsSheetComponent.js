import React, {createRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useReactToPrint} from "react-to-print";
import Button from "reactstrap/es/Button";
import {userRoles} from "../../constants";
import {getAllWorkDays} from "../../store/acrions/WorkDays/actionsCreators";
import Sheet from "../Sheet/Sheet";
import {checkPermissions} from "../../services";

const MentorsSheetComponent = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const dispatch = useDispatch();
    let allWorkDays = useSelector(state => state.workDays.allWorkDays);


    const dateChangeHandler = date => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        dispatch(getAllWorkDays(year, month, null, userRoles.mentors));
    };

    const componentRef = createRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllWorkDays(currentYear, currentMonth + 1, null, userRoles.mentors));
    }, []);

    return (
        <div className="content">
            <Sheet
                days={allWorkDays}
                dateChangeHandler={dateChangeHandler}
                mentors
                ref={componentRef}
            />
            {checkPermissions(userRoles.admin) && <Button
                onClick={handlePrint}
                color='primary'
            >
                Печать
            </Button>}
        </div>
    );
};

export default MentorsSheetComponent;