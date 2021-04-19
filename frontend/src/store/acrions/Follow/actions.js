export const GET_FOLLOWERS_RES = 'GET_FOLLOWERS_RES'; 
export const GET_FOLLOWERS_ERR = 'GET_FOLLOWERS_ERR';

export const getFollowersRes = (data) => ({type: GET_FOLLOWERS_RES, data})
export const getFollowersErr = (error) => ({type: GET_FOLLOWERS_ERR, error})


export const GET_FOLLOWING_RES = 'GET_FOLLOWING_RES'; 
export const GET_FOLLOWING_ERR = 'GET_FOLLOWING_ERR';

export const getFollowingRes = (data) => ({type: GET_FOLLOWING_RES, data})
export const getFollowingErr = (error) => ({type: GET_FOLLOWING_ERR, error})

export const FOLLOW_RES = "FOLLOW_RES";
export const FOLLOW_ERR = "FOLLOW_ERR";

export const followRes = () => ({type: FOLLOW_RES})
export const followErr = (error) => ({type: FOLLOW_ERR, error})

export const UNFOLLOW_RES = "UNFOLLOW_RES";
export const UNFOLLOW_ERR = "UNFOLLOW_ERR";

export const unfollowRes = () => ({type: UNFOLLOW_RES})
export const unfollowErr = (error) => ({type: UNFOLLOW_ERR, error})