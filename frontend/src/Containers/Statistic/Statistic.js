import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/lib/CardBody";
import DateSwitcher, {monthNames} from "../../components/DateSwitcher/DateSwitcher";
import YearStatisticModal from "../../components/Modals/YearStatisticModal";
import {getGeneralStatistic} from "../../store/acrions/Statistic/actionsCreators";
import {closeOrOpenPeriod} from "../../store/acrions/Period/actionsCreators";
import ClosePeriodModal from "./ClosePeriodModal";
import ChangeWorkDayNormModal from "./ChangeWorkDayNormModal";
import {updateWorkDayNormReq} from "../../store/acrions/WorkDayNorm/actionCreators";
import {getDaysInMonth} from "../../services";

const FIRST_DATE_OF_MONTH = 1;


const Statistic = () => {

    const dispatch = useDispatch();

    const currentDate = new Date();
    const [date, setDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), FIRST_DATE_OF_MONTH));
    const daysInMonth = getDaysInMonth(date.getMonth() + 1, date.getFullYear());
    const [controlIsOpen, setControlIsOpen] = useState([]);
    const [yearModalIsOpen, setYearModalIsOpen] = useState(false);
    const [usedUser, setUsedUser] = useState(null);

    const generalStatistic = useSelector(state => state.statistic.generalStatistic);

    const [togglePeriodModal, setTogglePeriodModal] = useState(false);
    const [toggleChangeNormModal, setToggleChangeNormModal] = useState(false);

    const [updateWorkDayNorm, setUpdateWorkDayNorm] = useState({
        monthId: "",
        userId: "",
        workDayNormGroupId: "",
        year: "",
        month: ""
    });

    const openToggleChangeNormModal = (
        monthId,
        userId,
        workDayNormGroupId,
        year,
        month,
        workingDaysNorm
    ) => {
        setToggleChangeNormModal(!toggleChangeNormModal);
        setWorkingDays(workingDaysNorm);
        setUpdateWorkDayNorm({
            monthId: monthId,
            userId: userId,
            workDayNormGroupId: workDayNormGroupId,
            year: year,
            month: month
        });
    };

    const submitToggleChangeNormModal = () => {
        setToggleChangeNormModal(!toggleChangeNormModal);
        if (workingDays !== null) {
            dispatch(updateWorkDayNormReq(
                updateWorkDayNorm.monthId,
                updateWorkDayNorm.userId,
                updateWorkDayNorm.workDayNormGroupId,
                workingDays,
                updateWorkDayNorm.year,
                updateWorkDayNorm.month
            ));
        }
    };

    const closeChangeNormModal = () => {
        setToggleChangeNormModal(!toggleChangeNormModal);
    }

    const [workingDays, setWorkingDays] = useState( null);
    const changeWorkingDays = e => {
        const value = parseInt(e.target.value);
        if ((value >= 0 && value <= daysInMonth) || isNaN(value)) {
            setWorkingDays(value);
        }
    };

    const [currentPeriodData, setCurrentPeriodData] = useState({
        month: "",
        year: "",
        userId: "",
        isClosedPeriod: false
    });
    const openTogglePeriodModal = (month, year, userId, isClosedPeriod) => {
        setTogglePeriodModal(!togglePeriodModal);
        setCurrentPeriodData({
            month: month,
            year: year,
            userId: userId,
            isClosedPeriod: isClosedPeriod
        });
    };

    const [comment, setComment] = useState("");
    const changeComment = e => setComment(e.target.value);

    const closeTogglePeriodModal = () => {
        if (comment !== "") {
            dispatch(closeOrOpenPeriod(
                currentPeriodData.month,
                currentPeriodData.year,
                currentPeriodData.userId,
                comment,
                generalStatistic?.prevMonthIsHaveStatistic || false
            ));
            setTogglePeriodModal(!togglePeriodModal);
            setComment("");
        }
    };

    const changeDate = date => {
        dispatch(getGeneralStatistic(date.getFullYear(), date.getMonth() + 1));
        setDate(date);
    };

    const toggleControlButton = index => {
        let isOpen = [];
        isOpen[index] = !controlIsOpen[index];
        setControlIsOpen(isOpen);
    };

    useEffect(() => {
        dispatch(getGeneralStatistic(date.getFullYear(), date.getMonth() + 1));
    }, []);

    const toggleYearModal = user => {
        setYearModalIsOpen(!yearModalIsOpen);
        setUsedUser(user);
    };


    const tableHeaderItems = ["№", "Имя сотрудника", "Норма рабочих дней", "Отработано дней", "Часов наставничества", "Действия"];

    const haveNotStatistic = <p>Статистика за <b>{monthNames[date.getMonth()]} {date.getFullYear()}</b> отсутствует</p>;

    const changeNormButton = (
        isOpen,
        monthId,
        userId,
        workDayNormGroupId,
        year,
        month,
        userEmail,
        workingDaysNorm
    ) => {
        if (!isOpen) {
            return (
                <DropdownItem
                    id={"changeNorm-" + userEmail}
                    onClick={() => openToggleChangeNormModal(monthId, userId, workDayNormGroupId, year, month, workingDaysNorm)}>
                    Изменить норму
                </DropdownItem>
            );
        }
    };

    const MountStatisticInAYear = user => <DropdownItem onClick={() => toggleYearModal(user)}>
        Годовая статистика
    </DropdownItem>;
    const closePeriod = (isOpen, month, year, userId, userEmail) => (
        <DropdownItem id={"changePeriod-" + userEmail} onClick={() => currentDate.getMonth() + 1 !== month ?
            openTogglePeriodModal(month, year, userId, isOpen) : dispatch(closeOrOpenPeriod(month, year, userId))
        }>
            {isOpen ? "Открыть" : "Закрыть"} период
        </DropdownItem>
    );

    const mountControlButton = (index, closed, userId, user, monthId, groupId, workingDaysNorm) => (
        <>
            <ButtonDropdown isOpen={controlIsOpen[index]} toggle={() => toggleControlButton(index)}>
                <DropdownToggle
                    id={"controlStatistic-" + user.email}
                    className="btn btn-outline-default btn-sm dropdown-toggle btn btn-secondary">
                    Управление
                </DropdownToggle>
                <DropdownMenu className="drop-menu">
                    {changeNormButton(closed, monthId, userId, groupId, date.getFullYear(), date.getMonth() + 1, user.email, workingDaysNorm)}
                    {MountStatisticInAYear(user)}
                    {closePeriod(closed, date.getMonth() + 1, date.getFullYear(), userId, user.email)}
                </DropdownMenu>
            </ButtonDropdown>
        </>
    );

    const colorOfUserWithClosedPeriod = "#dee2e6";
    let numberOfStatistic = 0;

    return (
        <div className='content'>
            <Card>
                <YearStatisticModal
                    isOpen={yearModalIsOpen}
                    toggle={toggleYearModal}
                    user={usedUser}
                    defaultDate={date}
                />
                <CardBody>
                    <DateSwitcher
                        date={date}
                        changeDate={changeDate}
                        statisticSwitcher
                        statisticCanChangeToPrevPeriod={generalStatistic?.prevMonthIsHaveStatistic || false}
                    />

                    {generalStatistic ? (
                        <table className='w-100'>
                            <thead>
                            <tr className='text-center border-bottom'>
                                {tableHeaderItems.map(headerItemName => (
                                    <th
                                        className='text-uppercase'
                                    >{headerItemName}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {generalStatistic.usersData.map((statisticItem, index) => {
                                const user = statisticItem.user;
                                const workingDaysNorm = statisticItem.working_days_norm;
                                const daysWorked = statisticItem.days_worked;
                                const closed = statisticItem.closed;
                                const group = statisticItem.group;
                                const month = statisticItem.month;
                                let mentorHoursWorked = null;
                                const mentorStatistic = generalStatistic.usersData.find(stat => (
                                    stat.user.id === user.id
                                    && stat.additional_group
                                    && statisticItem.month.id === stat.month.id
                                ));

                                if (!statisticItem.additional_group)
                                    numberOfStatistic += 1;
                                if (!!mentorStatistic)
                                    mentorHoursWorked = mentorStatistic.days_worked;

                                return !statisticItem?.additional_group && (
                                    <tr className='text-center border-bottom'
                                        style={{backgroundColor: closed && colorOfUserWithClosedPeriod}}>
                                        <td className='font-weight-light'>{numberOfStatistic}</td>
                                        <td className='font-weight-light'>{user.first_name} {user.last_name}</td>
                                        <td className='font-weight-light'>{workingDaysNorm}</td>
                                        <td className='font-weight-light'>{daysWorked}</td>
                                        <td className='font-weight-light'>{mentorHoursWorked}</td>
                                        <td className='font-weight-light'>{mountControlButton(index, closed, user.id, user, month.id, group, workingDaysNorm)}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    ) : haveNotStatistic}
                </CardBody>
            </Card>

            <ClosePeriodModal periodClosed={currentPeriodData.isClosedPeriod} close={openTogglePeriodModal}
                              modal={togglePeriodModal} toggle={closeTogglePeriodModal} comment={comment}
                              setComment={changeComment}/>
            <ChangeWorkDayNormModal modal={toggleChangeNormModal}
                                    onClick={submitToggleChangeNormModal}
                                    close={closeChangeNormModal}
                                    workDayNorm={workingDays}
                                    setWorkDayNorm={changeWorkingDays}
                                    daysInMonth={daysInMonth}
            />

        </div>
    );
};

export default Statistic;