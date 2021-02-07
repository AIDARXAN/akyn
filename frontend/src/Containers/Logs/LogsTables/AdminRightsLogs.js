import React from "react";
import {Table} from "reactstrap";
import moment from "moment";

const AdminRightsLogs = props => {
    return (
        <Table>
            <thead className="text-primary">
            <tr>
                <th className="text-center ">Дата</th>
                <th className="text-center ">Админ</th>
                <th className="text-center ">Действие</th>
                <th className="text-center ">Пользователь</th>
            </tr>
            </thead>
            <tbody>
            {props.logs.map((log, i) => (
                <tr key={i}>
                    <td className="text-center">
                        {moment(log.date).format("DD.MM.YYYY")}
                    </td>
                    <td className="text-center">
                        {log.user.first_name} {log.user.last_name}
                    </td>
                    <td className="text-center">
                        {log.action.action}
                    </td>
                    <td className="text-center">
                        {log.action.user.first_name} {log.action.user.last_name}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default AdminRightsLogs;