import {userStatuses} from "./constants";
import Profile from "./Containers/Profile/Profile";
import CreatePost from "./Containers/CreatePost/CreatePost";
import ProfileOfAnotherUser from "./Containers/Profile/ProfileOfAnotherUser";
import Search from "./Containers/Search/Search";
import Feed from "./Containers/Feed/Feed";
import NotFound from "./Containers/Error/NonFound";

const routes = [
    {
        id: "feed",
        path: "/feed",
        name: "Лента",
        icon: "nc-icon nc-send",
        component: Feed
    },
    {
        id: "search_user",
        path: "/search",
        name: "Издөө",
        icon: "nc-icon nc-zoom-split",
        component: Search
    },
    {
        id: "profile",
        path: "/profile",
        name: "Профиль",
        icon: "nc-icon nc-single-02",
        component: Profile,
    }, {
        isVisible: false,
        id: "profile",
        path: "/profile/:username",
        name: "Профиль",
        component: ProfileOfAnotherUser ,
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
    },{
        isVisible: false,
        path: "/not-found",
        component: NotFound
    }
];

export default routes;
