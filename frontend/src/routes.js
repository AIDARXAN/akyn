import {userRoles, userStatuses} from "./constants";
import AdminWorkDays from "./Containers/AdminWorkDays/AdminWorkDays";
import Contacts from "./Containers/Contacts/Contacts";

import SettingsBot from "./Containers/Help/SettingsBot";
import LogList from "./Containers/Logs/LogList";
import MentorsSheetComponent from "./Containers/MentorsSheetComponent/MentorsSheetComponent";
import MentorsWorkDays from "./Containers/MentorsWorkDays/MentorsWorkDays";
import Profile from "./Containers/Profile/Profile";
import SheetComponent from "./Containers/SheetComponent/SheetComponent";
import Statistic from "./Containers/Statistic/Statistic";
import SupportWorkDays from "./Containers/SupportWorkDays/SupportWorkDays";
import TeacherWorkDays from "./Containers/TeacherWorkDays/TeacherWorkDays";
import Users from "./Containers/Users/Users";
import VacationSheet from "./Containers/VacationSheet/VacationSheet";
import VacationSheetComponent from "./Containers/VacationSheetComponent/VacationSheetComponent";

const routes = [
    {
        groups: [userRoles.supports],
        status: [userStatuses.active],
        id: "work-days-support",
        path: "/workDays/supports",
        name: "Рабочие дни",
        icon: "nc-icon nc-laptop",
        component: SupportWorkDays,
    }, {
        groups: [userRoles.administration],
        status: [userStatuses.active],
        id: "work-days-admin",
        path: "/workDays/administration",
        name: "Рабочие дни",
        icon: "nc-icon nc-laptop",
        component: AdminWorkDays,
    }, {
        groups: [userRoles.teachers],
        status: [userStatuses.active],
        id: "work-days-teacher",
        path: "/workDays/teachers",
        name: "Рабочие дни",
        icon: "nc-icon nc-laptop",
        component: TeacherWorkDays,
    }, {
        additionalGroup: [userRoles.mentors],
        status: [userStatuses.active],
        id: "work-days-mentors",
        path: "/workDays/mentors",
        name: "Рабочие дни ментора",
        icon: "nc-icon nc-laptop",
        component: MentorsWorkDays,
    }, {
        groups: [userRoles.administration, userRoles.supports, userRoles.teachers],
        status: [userStatuses.active],
        id: "vacation-sheet",
        path: "/vacation-sheet",
        name: "Отпускные дни",
        icon: "nc-icon nc-controller-modern",
        component: VacationSheet,
    }, {
        groups: [userRoles.administration, userRoles.supports, userRoles.teachers],
        status: [userStatuses.active],
        id: "userSheet",
        path: "/sheet-users",
        name: "Ведомость",
        icon: "nc-icon nc-single-copy-04",
        component: SheetComponent,
    }, {
        additionalGroup: [userRoles.admin, userRoles.mentors],
        groups: [userRoles.administration, userRoles.teachers],
        status: [userStatuses.active],
        id: "mentorsSheet",
        path: "/sheet-mentors",
        name: "Ведомость наставника",
        icon: "nc-icon nc-single-copy-04",
        component: MentorsSheetComponent,
    }, {
        groups: [userRoles.administration, userRoles.supports, userRoles.teachers],
        status: [userStatuses.active],
        path: "/weekend-sheet",
        name: "Ведомость отпусков",
        icon: "nc-icon nc-sun-fog-29",
        component: VacationSheetComponent,
    }, {
        id: "profile",
        path: "/profile",
        name: "Профиль",
        icon: "nc-icon nc-single-02",
        component: Profile,
    }, {
        status: [userStatuses.active],
        isVisible: false,
        id: "profile",
        path: "/profile/:edit",
        name: "Профиль",
        icon: "nc-icon nc-single-02",
        component: Profile,
    }, {
        status: [userStatuses.active],
        additionalGroup: [userRoles.admin],
        groups: [userRoles.administration],
        id: "users",
        path: "/users",
        name: "Пользователи",
        icon: "nc-icon nc-tile-56",
        component: Users,
    }, {
        status: [userStatuses.active],
        isVisible: false,
        additionalGroup: [userRoles.admin],
        groups: [userRoles.administration],
        id: "users",
        path: "/users/openActivatingUser/:id",
        name: "Пользователи",
        icon: "nc-icon nc-tile-56",
        component: Users,
    }, {
        status: [userStatuses.active],
        isVisible: false,
        additionalGroup: [userRoles.admin],
        groups: [userRoles.administration],
        id: "users",
        path: "/users/toActive/:toActive",
        name: "Пользователи",
        icon: "nc-icon nc-tile-56",
        component: Users,
    }, {
        status: [userStatuses.active],
        additionalGroup: [userRoles.admin],
        groups: [userRoles.administration],
        isVisible: false,
        id: "users",
        path: "/users/:status",
        name: "Пользователи",
        icon: "nc-icon nc-tile-56",
        component: Users,
    }, {
        status: [userStatuses.active],
        additionalGroup: [userRoles.admin],
        id: "statisticsInSideBar",
        path: "/statistic",
        name: "Статистика",
        icon: "nc-icon nc-chart-bar-32",
        component: Statistic
    }, {
        status: [userStatuses.active],
        groups: [userRoles.admin, userRoles.administration],
        additionalGroup: [userRoles.admin],
        id: "logs",
        path: "/logs",
        name: "Логи",
        icon: "nc-icon nc-align-left-2",
        component: LogList,
    }, {
        status: [userStatuses.active],
        additionalGroup: [userRoles.admin],
        isVisible: false,
        id: "logs",
        path: "/logs/:type",
        name: "Логи",
        icon: "nc-icon nc-align-left-2",
        component: LogList,
    }, {
        status: [userStatuses.active, userStatuses.inVacation],
        id: "contacts",
        path: "/contacts",
        name: "Контакты",
        icon: "nc-icon nc-bullet-list-67",
        component: Contacts,
    }, {
        status: [userStatuses.active, userStatuses.inVacation],
        isVisible: false,
        id: "contacts",
        path: "/contacts/:status",
        name: "Контакты",
        icon: "nc-icon nc-bullet-list-67",
        component: Contacts,
    }, {
        isVisible: false,
        id: "help2",
        path: "/help/settingsBot",
        name: "настройка телеграм бота",
        filterId: "help",
        component: SettingsBot,
    }, {
        isVisible: false,
        path: "/login",
        component: null
    }, {
        isVisible: false,
        path: "/registration",
        component: null
    }, {
        isVisible: false,
        path: "/recover_password/:token",
        component: null
    }, {
        isVisible: false,
        path: "/reset",
        component: null
    }
];

export default routes;
