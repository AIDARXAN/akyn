import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../../components/Post/Post";
import {fetchFeed} from "../../store/Feed/actionCreators";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed.feed)
    useEffect(()=> {
        dispatch(fetchFeed());
    }, [])
    return (
        <div className='content'>
            {feed && feed.map((publication, index) => {
                return (
                    <Post post={publication}/>
                )
            })}
        </div>
    )
}

export default Feed;