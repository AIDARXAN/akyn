import React from "react";
import {NavLink} from "react-router-dom";
import moment from "moment";
import {useSelector} from "react-redux";

const SearchItem = ({user}) => {
    const current_user = useSelector(state => state.user.currentUser);

    return (
        <div className="row">
            <img
                className="avatar border-gray ml-3"
                src={user.avatar ? user.avatar : require("assets/img/cat.jpeg")}
            />
            <NavLink to={current_user.username === user.username ? "/profile" : "/profile/" + user.username}
                     className="col-4 nav-link-font">{user.first_name} {user.last_name}</NavLink>
            <NavLink to={current_user.username === user.username ? "/profile" : "/profile/" + user.username}
                     className="col-2 nav-link-font">@{user.username}</NavLink>
        </div>
    )
}

export default SearchItem;