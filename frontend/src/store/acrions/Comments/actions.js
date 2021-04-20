export const FETCH_COMMENTS_RES = 'FETCH_COMMENTS_RES'
export const FETCH_COMMENTS_ERR = 'FETCH_COMMENTS_ERR'

export const fetchCommentsRes = (data) => ({type: FETCH_COMMENTS_RES, data})
export const fetchCommentsErr = (error) => ({type: FETCH_COMMENTS_ERR, error})

export const UPDATE_COMMENT_RES = "UPDATE_COMMENT_RES"
export const UPDATE_COMMENT_ERR = "UPDATE_COMMENT_ERR"

export const updateCommentRes = () => ({type: UPDATE_COMMENT_RES})
export const updateCommentErr = (error) => ({type: UPDATE_COMMENT_ERR, error})

export const DELETE_COMMENT_RES = "DELETE_COMMENT_RES"
export const DELETE_COMMENT_ERR = "DELETE_COMMENT_ERR"

export const deleteCommentRes = () => ({type: DELETE_COMMENT_RES})
export const deleteCommentErr = (error) => ({type: DELETE_COMMENT_ERR, error})