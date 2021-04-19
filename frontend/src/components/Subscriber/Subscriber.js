import React from "react";

const Subscriber = ({user, subscribe, unsubscribe}) => {
    return (
        <div className="row w-100">
            <img
                style={{height: '30px', width: '30px', borderRadius: '50%'}}
                alt="..."
                className="avatar border-gray ml-4 mt-3"
                src={user.avatar ? user.avatar : require("assets/img/cat.jpeg")}
            />
            <p className="ml-1 mt-2 col-4">{user.first_name} {user.last_name}</p>
            <p className="ml-1 mt-3 col-1">@{user.username}</p>
            <div className="col-4">
                {user.is_subscribed ? <button className="btn btn-outline-primary btn-round ml-5" onClick={() => {unsubscribe(user.username)}}>
                Жазылдыңыз
            </button> : <button className="btn btn-primary btn-round ml-5" onClick={() => subscribe(user.username)}>
                Жазылуу
            </button>}
            </div>

        </div>
    )
}

export default Subscriber;
