// Activate user
export const ACTIVATE_USER_SUCCESS = "ACTIVATE_USER_SUCCESS";
export const ACTIVATE_USER_FAIL = "ACTIVATE_USER_FAIL";

export const activateUserSuccess = () => ({type: ACTIVATE_USER_SUCCESS});
export const activateUserError = (error) => ({type: ACTIVATE_USER_FAIL, error});

// Fetch groups
export const FETCH_GROUPS_SUCCESS = "FETCH_GROUPS_SUCCESS";
export const FETCH_GROUPS_FAIL = "FETCH_GROUPS_FAIL";

export const fetchGroupsSuccess = (data) => ({type: FETCH_GROUPS_SUCCESS, data});
export const fetchGroupsFail = (error) => ({type: FETCH_GROUPS_FAIL, error});
