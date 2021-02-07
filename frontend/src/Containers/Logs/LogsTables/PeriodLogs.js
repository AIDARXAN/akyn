import {Table} from "reactstrap";
import moment from "moment";
import "moment/locale/ru";
import React from "react";

const PeriodLogs  = props => {
    moment.locale("ru");
    return (
        <Table>
            <thead className="text-primary">
            <tr>
                <th className="text-center ">Дата</th>
                <th className="text-center ">Админ</th>
                <th className="text-center ">Действие</th>
                <th className="text-center ">Пользователь</th>
                <th className="text-center ">Период</th>
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
                        {log.action.action}
                    </td>
                    <td className="text-center">
                        {log.action.user.first_name} {log.action.user.last_name}
                    </td>
                    <td className="text-center">
                        {moment(log.action.period).format("MMMM YYYY")}
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

export default PeriodLogs;