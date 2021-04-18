import {userStatuses} from "./constants";
import Profile from "./Containers/Profile/Profile";
import CreatePost from "./Containers/CreatePost/CreatePost";

const routes = [
    {
        id: "profile",
        path: "/profile",
        name: "Профиль",
        icon: "nc-icon nc-single-02",
        component: Profile,
    }, {
        isVisible: false,
        id: "profile",
        path: "/profile/:edit",
        name: "Профиль",
        icon: "nc-icon nc-single-02",
        component: Profile,
    },

    {
        id: "create_post",
        path: "/create-post",
        name: "Пост чыгаруу",
        icon: "nc-icon nc-simple-add",
        component: CreatePost,
    },


    {
        isVisible: false,
        path: "/login",
        component: null
    }, {
        isVisible: false,
        path: "/registration",
        component: null
    }, {
        isVisible: false,
        path: "/recover-password/:token",
        component: null
    }, {
        isVisible: false,
        path: "/reset-password",
        component: null
    }
];

export default routes;
