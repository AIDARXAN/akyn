import React from "react";
import {Table} from "reactstrap";
import {typesOfLogs} from "../../../constants";
import moment from "moment";

const DeletionLogs = props => {
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
                        {typesOfLogs[log.type].ru}
                    </td>
                    <td className="text-center">
                        {log.action.first_name} {log.action.last_name}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default DeletionLogs;