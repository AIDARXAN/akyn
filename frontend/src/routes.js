import {userStatuses} from "./constants";
import Profile from "./Containers/Profile/Profile";

const routes = [
    {
        id: "profile",
        path: "/profile",
        name: "Профили",
        icon: "nc-icon nc-single-02",
        component: Profile,
    }, {
        isVisible: false,
        id: "profile",
        path: "/profile/:edit",
        name: "Профиль",
        icon: "nc-icon nc-single-02",
        component: Profile,
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
