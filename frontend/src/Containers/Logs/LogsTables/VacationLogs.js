import {Table} from "reactstrap";
import moment from "moment";
import {typesOfLogs} from "../../../constants";
import React from "react";

const VacationLogs  = props => {
    return (
        <Table>
            <thead className="text-primary">
            <tr>
                <th className="text-center ">Дата</th>
                <th className="text-center ">Админ</th>
                <th className="text-center ">Действие</th>
                <th className="text-center ">Пользователь</th>
                <th className="text-center ">Дата начала</th>
                <th className="text-center ">Дата конца</th>
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
                        {log.action.user_full_name}
                    </td>
                    <td className="text-center">
                        {moment(log.action.vacation_start_date).format("DD.MM.YYYY")}
                    </td>
                    <td className="text-center">
                        {moment(log.action.vacation_end_date).format("DD.MM.YYYY")}
                    </td>
                    <td className="text-center">
                        {log.action.comment}
                    </td>

                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default VacationLogs;