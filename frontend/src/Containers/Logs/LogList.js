import moment from "moment";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLogs} from "../../store/acrions/Log/actionsCreators";
import {ADMIN_RIGHTS, DELETION, DISMISSAL, PERIODS, REPLACEMENTS, typesOfLogs, VACATIONS} from "../../constants";
import {NavLink, useParams} from "react-router-dom";
import {Button, Card, CardBody} from "reactstrap";
import DeletionLogs from "./LogsTables/DeletionLogs";
import DateSwitcher from "../../components/DateSwitcher/DateSwitcher";
import DismissalLogs from "./LogsTables/DismissalLogs";
import LogsOfReplacement from "./LogsTables/LogsOfReplacement";
import VacationLogs from "./LogsTables/VacationLogs";
import AdminRightsLogs from "./LogsTables/AdminRightsLogs";
import PeriodLogs from "./LogsTables/PeriodLogs";
import {maskedDateInput} from "../../components/Input/MaskedTextInput";
import DatePicker, {registerLocale} from "react-datepicker";
import ru from "date-fns/locale/ru";

const FIRST_DATE_OF_MONTH = 1;

const LogList = () => {
    registerLocale("ru", ru);
    const dispatch = useDispatch();
    let {type} = useParams();
    type = parseInt(type);

    const currentDate = new Date();
    const [date, setDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), FIRST_DATE_OF_MONTH));

    const [diapasonStartDate, setDiapasonStartDate] = useState(null);
    const [diapasonEndDate, setDiapasonEndDate] = useState(null);
    const [search, setSearch] = useState({search_start: "", search_end: ""});

    const changeDiapasonStartDate = (value) => {
        setDiapasonStartDate(value);
        if (value !== null) 
            setSearch({search_start: value});
    };

    const changeDiapasonEndDate = (value) => {
        setDiapasonEndDate(value);
        if (value !== null)
            setSearch({search_end: value})
    };

    useEffect(() => {
        if (type) {
            dispatch(getLogs(type, date.getFullYear()));
        } else {
            dispatch(getLogs());
        }
    }, [type]);

    const changeDate = date => {
        setDate(date);
        dispatch(getLogs(type, date.getFullYear()));
    };

    const convertStringToDate = (value) => {
        return Date.parse(moment(value).format("YYYY-MM-DD"))
    }


    const logs = useSelector(state => state.logs.logs);
    const logs_type = parseInt(logs?.type);
    let logs_data = logs?.logs;
    const last_year_have = logs?.last_year_have;
    if (diapasonEndDate !== null || diapasonStartDate !== null) {
        let startDate = diapasonStartDate?.getTime();
        let endDate = diapasonEndDate?.getTime();
        logs_data = logs_data && logs_data.filter(log => (
            (startDate <= convertStringToDate(log.date) && convertStringToDate(log.date) <= endDate) ||
            (startDate === undefined && convertStringToDate(log.date) <= endDate) ||
            (endDate === undefined && convertStringToDate(log.date) >= startDate))
        );
    }
    
    return (
        <div className="content">
            <Card>
                <CardBody>
                    <DateSwitcher
                        date={date}
                        changeDate={changeDate}
                        last_year_have={last_year_have}
                        yearSwitcher
                    />
                    <div className="row col-lg-8">
                        <div className="form-group col-xs-6">
                            <DatePicker
                            id='logs-start-of-diapason'
                            onChange={changeDiapasonStartDate}
                            selected={diapasonStartDate}
                            isClearable={true}
                            dateFormat="dd.MM.yyyy"
                            locale='ru'
                            placeholderText="Начало диапазона"
                            showMonthDropdown
                            showYearDropdown
                            customInput={maskedDateInput()}
                        />
                        </div>
                        <pre> </pre>
                        <div className="form-group col-xs-6">
                            <DatePicker
                            id='logs-end-of-diapason'
                            onChange={changeDiapasonEndDate}
                            minDate={diapasonStartDate}
                            selected={diapasonEndDate === new Date() ? null : diapasonEndDate}
                            isClearable={true}
                            dateFormat="dd.MM.yyyy"
                            locale='ru'
                            placeholderText="Конец диапазона"
                            showMonthDropdown
                            showYearDropdown
                            customInput={maskedDateInput()}
                        />
                        </div>
                    </div>
                    <div>
                        {Object.keys(typesOfLogs).map((type, id) => (
                            <span key={id}>
                                <NavLink to={"/logs/" + type}>
                                    <Button
                                        className='btn-contacts all-btn-logs'
                                        style={{background: typesOfLogs[type].background, color: typesOfLogs[type].color}}
                                        id={typesOfLogs[type].id}
                                    >
                                        {typesOfLogs[type].ru}
                                    </Button>
                                </NavLink>
                                {" "}
                            </span>
                        ))}
                    </div>
                    {type && logs_data && logs_type ?
                        <div>
                            {
                                logs_data.length > 0 ? (
                                    logs_type === DISMISSAL && <DismissalLogs logs={logs_data}/> ||
                                    logs_type === DELETION && <DeletionLogs logs={logs_data}/> ||
                                    logs_type === REPLACEMENTS && <LogsOfReplacement logs={logs_data}/> ||
                                    logs_type === VACATIONS && <VacationLogs logs={logs_data}/> ||
                                    logs_type === ADMIN_RIGHTS && <AdminRightsLogs logs={logs_data}/> ||
                                    logs_type === PERIODS && <PeriodLogs logs={logs_data}/>
                                ) :
                                <span>В разделе <b>"{typesOfLogs[type].ru}"</b> логов нет</span>
                            }
                        </div>
                        :
                        "Выберите тип логов"
                    }
                </CardBody>
            </Card>
        </div>
    );
};

export default LogList;