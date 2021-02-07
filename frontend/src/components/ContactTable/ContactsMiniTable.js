import React from "react";
import {Table} from "reactstrap";

const ContactsMiniTable = ({name, email, phone, status, checkStatus, user, tableStatus}) => {


    return (

        <Table className="mt-2">
            <thead className="text-primary">
            <tr style={{background: checkStatus(user)}}>
                <th className="text-center" colSpan="2">{name}</th>
            </tr>
            </thead>
            <tbody>
            <tr className="hov-effect">
                <td className="font-weight-bold td-table-mini">Аватар</td>
                <td className="text-center p-0 m-0 td-table-mini">
                    <img style={{width: "80px"}} src={require("../../assets/img/cat.jpeg")} alt={name}/>
                </td>
            </tr>
            <tr className="hov-effect">
                <td className="font-weight-bold td-table-mini">Почта</td>
                <td className="text-center td-table-mini">{email}</td>
            </tr>
            <tr className="hov-effect">
                <td className="font-weight-bold td-table-mini">Номер телефона</td>
                <td className="text-center td-table-mini">{phone}</td>
            </tr>
            <tr className="hov-effect">
                <td className="font-weight-bold td-table-mini">Статус</td>
                <td className="text-center td-table-mini">{tableStatus[status]}</td>
            </tr>
            </tbody>
            </Table>

    );
};

export default ContactsMiniTable;