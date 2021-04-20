export const FEED_RES = "FEED_RES";
export const FEED_ERR = "FEED_ERR";

export const feedRes = (data) => ({type: FEED_RES, data})
export const feedErr = (error) => ({type: FEED_ERR, error})