import React, {useEffect, useState} from "react";
import Subscriber from "./Subscriber";

const SubscriberList = ({users, subscribeOnUser, unsubscribeFromUser, user}) => {
    useEffect(() => {}, [users]);
    console.log(users)
    return (
         users?.map((follower, index) => {
                return (
                    <Subscriber user={follower} subscribe={subscribeOnUser} unsubscribe={unsubscribeFromUser}/>
                )
        })
    )
}
export default SubscriberList;