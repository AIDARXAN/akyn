export const FETCH_COMMENTS_RES = 'FETCH_COMMENTS_RES'
export const FETCH_COMMENTS_ERR = 'FETCH_COMMENTS_ERR'

export const fetchCommentsRes = (data) => ({type: FETCH_COMMENTS_RES, data})
export const fetchCommentsErr = (error) => ({type: FETCH_COMMENTS_ERR, error})