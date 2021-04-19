import {subscribeReq, unsubscribeReq} from "../../store/acrions/Follow/actionCreators";

export const subscribe = (username) => async (dispatch) => {
    dispatch(subscribeReq(username))
}
// todo put this into component
export const unsubscribe = (username) => async (dispatch) => {
    dispatch(unsubscribeReq(username))
}