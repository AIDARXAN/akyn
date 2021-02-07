import React, {useEffect, useState} from "react";
import CustomModalWindow from "./CustomModalWindow";
import {useDispatch} from "react-redux";
import {editUserClassesAndRights} from "../../store/acrions/user/actionsCreators";
import {userAdditionalRolesRus, userRolesRus} from "../../constants";

const RightsAndClassesModal = (
    {
        toggle,
        modal,
        nameModal,
        userClass,
        userRight,
        valueModal,
        roles,
        additional_roles,
    }) => {

    const dispatch = useDispatch();
    const [classes, setClass] = useState([]);
    const [rights, setRights] = useState([]);

    useEffect(() => {
        setClass(roles.map(d => {
            const role = userClass.find(data => {
                    return data.name === d.name;
                });
            return {
                select: role?.name === d.name,
                id: d.id,
                name: userRolesRus[d.name]
            };
        }));
        setRights(additional_roles.map(d => {
            return {
                select: userRight !== null ? userRight.name === d.name : false,
                id: d.id,
                name: userAdditionalRolesRus[d.name]
            };
        }));
    }, []);

    const getGroup = (group) => {
        return group.find((u, i) => {
            if (u.select === true) {
                return u.id;
            }
        });
    };



    const sendRequest = (e) => {
        e.preventDefault();
        const new_class = getGroup(classes);
        const new_right = getGroup(rights);
        const data = {
            userId: valueModal.id,
            new_group: new_class === undefined ? null : new_class.id,
            additional_group: new_right === undefined ? null : new_right.id,
        };
        dispatch(editUserClassesAndRights(data));
        modal.rightsAndClasses = false;
    };

    return (
        <div>
            <CustomModalWindow
                toggle={toggle}
                modal={modal.rightsAndClasses}
                nameModal={nameModal}
                close={"Отмена"}
                confirm={"Сохранить"}
                title={`Выберите тип пользователя ${valueModal.first_name} ${valueModal.last_name}`}
                button_color={"btn btn-info"}
                onClick={sendRequest}
            >
                <p>Выберите тип пользователя:</p>
                {classes.map((d, i) => (
                    <div className="custom-control custom-checkbox" key={d.id}>

                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id={d.name}
                            onChange={(e) => {
                                let checked = true;
                                setClass(classes.find(data => {
                                    if (data.select === true)
                                        data.select = false;
                                }));
                                setClass(classes.map((data) => {
                                    if (d.id === data.id) {
                                        data.select = checked;
                                    }
                                    return data;
                                }));
                            }}
                            checked={d.select}

                        />
                        <label
                            className="custom-control-label"
                            htmlFor={d.name}
                        >{d.name}</label>
                    </div>))}
                <br/>
                <p>Выберите дополнительные права:</p>
                {rights.map((d, i) => (
                    <div className="custom-control custom-checkbox" key={d.id}>

                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id={d.name}
                            onChange={(e) => {
                                let checked = e.target.checked;
                                setRights(rights.find(data => {
                                    if (data.select === true)
                                        data.select = false;
                                }));
                                setRights(rights.map((data) => {
                                    if (d.id === data.id) {
                                        data.select = checked;
                                    }
                                    return data;
                                }));
                            }}
                            checked={d.select}

                        />
                        <label
                            className="custom-control-label"
                            htmlFor={d.name}
                        >{d.name}</label>
                    </div>))}
            </CustomModalWindow>
        </div>
    );
};

export default RightsAndClassesModal;