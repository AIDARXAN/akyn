// LOGIN
export const USER_LOGIN_RES = "USER_LOGIN_RES";
export const USER_LOGIN_ERR = "USER_LOGIN_ERR";

export const userLoginRes = (data) => ({type: USER_LOGIN_RES, data});
export const userLoginErr = (error) => ({type: USER_LOGIN_ERR, error});

// REGISTRATION

export const USER_REGISTRATION_RES = "USER_REGISTRATION_RES";
export const USER_REGISTRATION_ERR = "USER_REGISTRATION_ERR";

export const userRegistrationRes = (data) => ({type: USER_REGISTRATION_RES, data});
export const userRegistrationErr = (error) => ({type: USER_REGISTRATION_ERR, error});

// LOGOUT
export const USER_LOGOUT_RES = "USER_LOGOUT_RES";
export const USER_LOGOUT_ERR = "USER_LOGOUT_ERR";

export const userLogoutRes = (data) => ({type: USER_LOGOUT_RES, data});
export const userLogoutErr = (error) => ({type: USER_LOGOUT_ERR, error});

// USER DELETION
export const USER_DELETION_RES = "USER_DELETION_RES";
export const USER_DELETION_ERR = "USER_DELETION_ERR";

export const userDeletionRes = () => ({type: USER_DELETION_RES,});
export const userDeletionErr = (error) => ({type: USER_DELETION_ERR, error});

// FIRE USER

export const FIRE_USER_RES = "FIRE_USER_RES";
export const FIRE_USER_ERR = "FIRE_USER_ERR";

export const fireUserRes = () => ({type: FIRE_USER_RES});
export const fireUserErr = (error) => ({type: FIRE_USER_ERR, error});

//

export const SEND_TO_VACATION_USER_RES = "SEND_TO_VACATION_USER_RES";
export const SEND_TO_VACATION_USER_ERR = "SEND_TO_VACATION_USER_ERR";

export const sendToVacationUserRes = () => ({type: SEND_TO_VACATION_USER_RES});
export const sendToVacationUserErr = (error) => ({type: SEND_TO_VACATION_USER_ERR, error});

export const RETURN_FROM_VACATION_USER_RES = "RETURN_FROM_VACATION_USER_RES";
export const RETURN_FROM_VACATION_USER_ERR = "RETURN_FROM_VACATION_USER_ERR";

export const returnFromVacationUserRes = () => ({type: RETURN_FROM_VACATION_USER_RES});
export const returnFromVacationUserErr = (error) => ({type: RETURN_FROM_VACATION_USER_ERR, error});

// Users

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";

export const fetchUsersRequest = () => ({type: FETCH_USERS_REQUEST});
export const fetchUsersSuccess = (data) => ({type: FETCH_USERS_SUCCESS, data});
export const fetchUsersFail = (error) => ({type: FETCH_USERS_FAIL, error});

// GET USER CONTACTS

export const GET_CONTACTS_REQ = "GET_CONTACTS_REQ";
export const GET_CONTACTS_RES = "GET_CONTACTS_RES";
export const GET_CONTACTS_ERR = "GET_CONTACTS_ERR";

export const getContactsReq = () => ({type: GET_CONTACTS_REQ});
export const getContactsRes = data => ({type: GET_CONTACTS_RES, data});
export const getContactsErr = error => ({type: GET_CONTACTS_REQ, error});

// CURRENT_USER
export const FETCH_CURRENT_USER_RES = "FETCH_CURRENT_USER_RES";
export const FETCH_CURRENT_USER_ERR = "FETCH_CURRENT_USER_ERR";

export const fetchCurrentUserRes = currentUser => ({type: FETCH_CURRENT_USER_RES, currentUser});
export const fetchCurrentUserErr = error => ({type: FETCH_CURRENT_USER_ERR, error});

// EDIT_PROFILE
export const EDIT_PROFILE_RES = "EDIT_PROFILE_RES";
export const EDIT_PROFILE_ERR = "EDIT_PROFILE_ERR";

export const editProfileRes = () => ({type: EDIT_PROFILE_RES});
export const editProfileErr = error => ({type: EDIT_PROFILE_ERR, error});

// EDIT_USER_PROFILE_PASSWORD
export const EDIT_USER_PROFILE_PASSWORD_RES = "EDIT_USER_PROFILE_PASSWORD_RES";
export const EDIT_USER_PROFILE_PASSWORD_ERR = "EDIT_USER_PROFILE_PASSWORD_ERR";

export const editUserProfilePasswordRes = () => ({type: EDIT_USER_PROFILE_PASSWORD_RES});
export const editUserProfilePasswordErr = error => ({type: EDIT_USER_PROFILE_PASSWORD_ERR, error});

// EDIT_USER_PROFILE_AVATAR
export const EDIT_USER_PROFILE_AVATAR_RES = "EDIT_USER_PROFILE_AVATAR_RES";
export const EDIT_USER_PROFILE_AVATAR_ERR = "EDIT_USER_PROFILE_AVATAR_ERR";

export const editUserProfileAvatarRes = () => ({type: EDIT_USER_PROFILE_AVATAR_RES});
export const editUserProfileAvatarErr = error => ({type: EDIT_USER_PROFILE_AVATAR_ERR, error});

// EDIT_USER_CLASSES_AND_RIGHTS
export const EDIT_USER_CLASSES_AND_RIGHTS_RES = "EDIT_USER_CLASSES_AND_RIGHTS_RES";
export const EDIT_USER_CLASSES_AND_RIGHTS_ERR = "EDIT_USER_CLASSES_AND_RIGHTS_ERR";

export const editUserClassesAndRightsRes = data => ({type: EDIT_USER_CLASSES_AND_RIGHTS_RES, data});
export const editUserClassesAndRightsErr = error => ({type: EDIT_USER_CLASSES_AND_RIGHTS_ERR, error});

export const REPLACE_TEACHER_RES = "REPLACE_TEACHER_RES";
export const REPLACE_TEACHER_ERR = "REPLACE_TEACHER_ERR";
export const CLEAN_UP_REPLACE_TEACHER_ERR = "CLEAN_UP_REPLACE_TEACHER_ERR";

export const replaceTeacherRes = () => ({type: REPLACE_TEACHER_RES});
export const replaceTeacherErr = (error) => ({type: REPLACE_TEACHER_ERR, error});
export const cleanUpReplaceTeacherErr = () => ({type: CLEAN_UP_REPLACE_TEACHER_ERR});

export const FETCH_WORKDAY_NORM_RES = "FETCH_WORKDAY_NORM_RES";
export const FETCH_WORKDAY_NORM_ERR = "FETCH_WORKDAY_NORM_ERR";

export const fetchWorkDayNormRes = (data) => ({type: FETCH_WORKDAY_NORM_RES, data});
export const fetchWorkDayNormErr = (error) => ({type: FETCH_WORKDAY_NORM_ERR, error});
