export const SEARCH_RESULTS_RES = "SEARCH_RESULTS_RES";
export const SEARCH_RESULTS_ERR = "SEARCH_RESULTS_ERR";

export const searchResultsRes = (data) => ({type: SEARCH_RESULTS_RES, data})
export const searchResultsErr = (error) => ({type: SEARCH_RESULTS_ERR, error})