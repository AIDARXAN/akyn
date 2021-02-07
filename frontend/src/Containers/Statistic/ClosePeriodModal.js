import React from "react";
import ModalWindow from "../../components/Modals/ModalWindow";

const ClosePeriodModal = ({toggle, modal, periodClosed, comment, setComment, close}) => {
    return (
        <div id="close-period_modal">
            <ModalWindow
                closePeriod
                closePeriodHandler={close}
                toggle={toggle}
                modal={modal}
                nameModal={"Закрытие периода"}
                save={periodClosed ? "Открыть" : "Закрыть"}
                isSaveDisable={comment === ""}
                title={periodClosed ? "Открыть период" : "Закрыть период"}
                button_color={"btn btn-alert"}
            >
                <div className="d-flex justify-content-between align-content-center"><label>Комментарий</label></div>
                <input id="comment" onChange={setComment} type="text" className="form-control"
                       value={comment}/>
            </ModalWindow>
        </div>
    );
};

export default ClosePeriodModal;