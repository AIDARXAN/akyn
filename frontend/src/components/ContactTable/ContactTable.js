import React from "react";
import {Table} from "reactstrap";
import {apiURL} from "../../configAPI";

const ContactTable = ({rows, checkStatus, tableStatus}) => {

    return (

        <Table>
            <thead className="text-primary">
            <tr>
                <th className="text-center  ">Аватар</th>
                <th className="text-center ">Имя сотрудника</th>
                <th className="text-center ">Почта</th>
                <th className="text-center ">Номер телефона</th>
                <th className="text-center ">Статус</th>
            </tr>
            </thead>
            <tbody id='contacts-table-body'>
            {rows.map((k, i) => (
                <tr key={i} className={"hov"} style={{background: checkStatus(k)}}>
                    <td className="text-center p-0 m-0"><img
                                        style={{width: "50px"}}
                                        alt="..."
                                        className="border-gray "
                                        src={k.avatar ? apiURL.urlsAvatar + k.avatar : require("assets/img/cat.jpeg")}
                                    />
                    </td>
                    <td className="text-center">{k.first_name !== "" ? k.first_name + " " + k.last_name : "НЕ УСТАНОВЛЕНО"}</td>
                    <td className="text-center">{k.email !== "" ? k.email : "НЕ УСТАНОВЛЕН"}</td>
                    <td className="text-center">{k.phone !== "" ? k.phone : "НЕ УСТАНОВЛЕН"}</td>
                    <td className="text-center">{tableStatus[k.status]}</td>
                </tr>
            ))}
            </tbody>
        </Table>

    );
};

export default ContactTable;