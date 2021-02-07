import moment from "moment";
import React from "react";
import {Table} from "reactstrap";
import {typesOfLogs} from "../../../constants";

const LogsOfReplacement = props => {

    const groupNotFoundMessage = "Группа отсутсвиует";
    const commentNotFoundMessage = "Комментарий отсутствует";

    return (
        <Table>
            <thead className="text-primary">
            <tr>
                <th className="text-center ">Дата</th>
                <th className="text-center ">Пользователь</th>
                <th className="text-center ">Действие</th>
                <th className="text-center ">Дата замены</th>
                <th className="text-center ">Кто заменяет</th>
                <th className="text-center ">Кого заменяет</th>
                <th className="text-center ">Комментарий</th>
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
                        {moment(log.action.date).format("DD.MM.YYYY")}
                    </td>
                    <td className="text-center">
                        {log.action.to_user.first_name} {log.action.to_user.last_name}
                    </td>
                    <td className="text-center">
                        {log.action.from_user.first_name} {log.action.from_user.last_name}
                    </td>
                    <td className="text-center">
                        {log.action.comment || commentNotFoundMessage}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default LogsOfReplacement;