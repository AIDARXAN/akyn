export const CREATE_POST_RES = 'CREATE_POST_RES';
export const CREATE_POST_ERR = 'CREATE_POST_ERR';

export const createPostRes = () => ({type: CREATE_POST_RES});
export const createPostErr = (error) => ({type: CREATE_POST_ERR, error});

export const LIKE_POST_RES = "LIKE_POST_RES";
export const LIKE_POST_ERR = "LIKE_POST_ERR";

export const likePostRes = () => ({type: LIKE_POST_RES});
export const likePostErr = (error) => ({type: LIKE_POST_ERR, error});

export const LIKE_POST_DELETE_RES = "LIKE_POST_DELETE_RES";
export const LIKE_POST_DELETE_ERR = "LIKE_POST_DELETE_ERR";

export const likePostDeleteRes = () => ({type: LIKE_POST_DELETE_RES});
export const likePostDeleteErr = (error) => ({type: LIKE_POST_DELETE_ERR, error});

export const CREATE_COMMENT_RES = "CREATE_COMMENT_RES";
export const CREATE_COMMENT_ERR = "CREATE_COMMENT_ERR";

export const createCommentRes = () => ({type: CREATE_POST_RES});
export const createCommentErr = (error) => ({type: CREATE_POST_ERR, error});

export const UPDATE_POST_RES = "UPDATE_POST_RES"
export const UPDATE_POST_ERR = "UPDATE_POST_ERR"

export const updatePostRes = () => ({type: UPDATE_POST_RES})
export const updatePostErr = (error) => ({type: UPDATE_POST_ERR, error})

export const DELETE_POST_RES = "DELETE_POST_RES"
export const DELETE_POST_ERR = "DELETE_POST_ERR"

export const deletePostRes = () => ({type: DELETE_POST_RES})
export const deletePostErr = (error) => ({type: DELETE_POST_ERR, error})