import React from "react";
import ModalWindow from "../../components/Modals/ModalWindow";
import CustomModalWindow from "../../components/Modals/CustomModalWindow"
import "../../components/Input/maskedTextInput.css";

const ChangeWorkDayNormModal = ({close, modal, workDayNorm, setWorkDayNorm, onClick, daysInMonth}) => {
    return (
        <div id="close-period_modal">
            <CustomModalWindow
                toggle={close}
                onClick={onClick}
                modal={modal}
                nameModal={"Изменение нормы"}
                confirm={"Сохранить"}
                disabled={workDayNorm === 0 ? false : !workDayNorm}
                title={"Изменение нормы рабочих дней в месяце"}
                button_color={"primary pl-3"}
            >
                <div className="d-flex justify-content-between align-content-center"><label>Норма рабочих
                    дней (от 0 до {daysInMonth})</label></div>
                <input id="timesheet-norm" onChange={setWorkDayNorm} type="number" className="form-control"
                       value={workDayNorm}/>

            </CustomModalWindow>
        </div>
    );
};

export default ChangeWorkDayNormModal;