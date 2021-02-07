// Users statuses
export const ACTIVE = 1;
export const FIRED = 2;
export const IN_VACATION = 3;

export const userStatuses = {
    active: ACTIVE,
    fired: FIRED,
    inVacation: IN_VACATION
};

export const STATUS_CODES_OF_USERS = {
    active: 1,
    fired: 2,
    in_vacation: 3
};

// Work days statuses
export const WORK_DAY = 1;
export const VACATION = 2;
export const DAY_OFF = 3;
export const WEEKEND = 4;

export const workDayStatuses = {
    workDay: WORK_DAY,
    vacation: VACATION,
    dayOff: DAY_OFF,
    weekend: WEEKEND
};


// User roles
export const ADMIN = "admin";
export const TEACHERS = "teachers";
export const MENTORS = "mentors";
export const SUPPORTS = "supports";
export const ADMINISTRATION = "administration";

export const userRoles = {  
    [ADMIN]: ADMIN,
    [TEACHERS]: TEACHERS,
    [MENTORS]: MENTORS,
    [SUPPORTS]: SUPPORTS,
    [ADMINISTRATION]: ADMINISTRATION
};

// User roles on russian language
export const TEACHERS_RUS = "преподаватель";
export const SUPPORTS_RUS = "младший преподаватель";
export const ADMINISTRATION_RUS = "администрация";

export const userRolesRus = {
    [TEACHERS]: TEACHERS_RUS,
    [SUPPORTS]: SUPPORTS_RUS,
    [ADMINISTRATION]: ADMINISTRATION_RUS
};
// User additional roles on ru  ssian language
export const ADMIN_RUS = "админ";
export const MENTORS_RUS = "наставник";

export const userAdditionalRolesRus = {
    [ADMIN]: ADMIN_RUS,
    [MENTORS]: MENTORS_RUS
};
//

export const valuesForUsersTimeWorked = {
    [ADMINISTRATION]: {
        emptyDay: {hours: 0, value: 0},
        halfDay: {hours: 4, value: 0.5},
        fullDay: {hours: 8, value: 1},
    },
    [TEACHERS]: {
        emptyDay: {hours: 0, value: 0},
        fullDay: {hours: 1, value: 1},
    },
    [MENTORS]: {
        emptyDay: {hours: 0, value: 0},
        fullDay: {hours: 1, value: 1},
    },
    [SUPPORTS]: {
        emptyDay: {hours: 0, value: 0},
        fullDay: {hours: 1, value: 1},
        fullDayWithAdditionalTime: {hours: 4, value: 2}
    },
};

export const EMPTY_DAY_COLOR = "#F5725A";
export const HALF_DAY_COLOR = "#FAC84A";
export const FULL_DAY_COLOR = "#00DF6C";
export const WEEKEND_DAY_COLOR = "#343a40";


// TYPES OF LOGS

export const VACATIONS = 1;
export const PERIODS = 2;
export const REPLACEMENTS = 3;
export const ADMIN_RIGHTS = 4;
export const DISMISSAL = 5;
export const DELETION = 6;

export const typesOfLogs = {
    [VACATIONS]: {en: "Vacations", ru: "Отпуск", id: "vacationsButton", background: "rgb(234, 234, 234)", color: "rgb(102, 97, 91)"},
    [PERIODS]: {en: "Periods", ru: "Периоды", id: "periodsButton", background: "rgb(234, 234, 234)", color: "rgb(102, 97, 91)"},
    [REPLACEMENTS]: {en: "Replacements", ru: "Замены", id: "ReplacementsButton", background: "rgb(135, 135, 135)", color: "rgb(255, 255, 255)"},
    [ADMIN_RIGHTS]: {en: "Admin rights", ru: "Права администратора", id: "rightsButton", background: "rgb(135, 135, 135)", color: "rgb(255, 255, 255)"},
    [DISMISSAL]: {en: "Dismissal", ru: "Увольнение", id: "dismissalButton", background: "rgb(140, 110, 100)", color: "rgb(255, 255, 255)"},
    [DELETION]: {en: "Deletion", ru: "Удаление", id: "deletionButton", background: "rgb(140, 110, 100)", color: "rgb(255, 255, 255)"},
};

export const TIME_TO_SHOW_SUCCESS_ALERT = 5000;


export const OLD_PASSWORD = ["Your old password was entered incorrectly. Please enter it again."];
export const PASSWORD_TOO_COMMON = "This password is too common.";
export const ENTIRELY_NUMERIC = "This password is entirely numeric.";

export const password_errors = {
    [OLD_PASSWORD]: "Ваш старый пароль введен не правильно. Пожалуйста введите еще раз.",
    [PASSWORD_TOO_COMMON]: "Этот пароль слишком простой.",
    [ENTIRELY_NUMERIC]: "Этот пароль состоит полностью из цифр.",
}

export const eighteenYears = 18;
export const minimumAcceptableBirthDayDate = new Date(new Date().getFullYear() - eighteenYears, new Date().getMonth()+1, new Date().getDate())
