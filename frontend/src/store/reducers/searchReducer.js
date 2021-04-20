import {SEARCH_RESULTS_ERR, SEARCH_RESULTS_RES} from "../acrions/Search/actions";

const initialState = {
    searchResults: [],
    resultsErr: null,
};

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESULTS_RES:
            return {...state, searchResults: action.data, resultsErr: null};
        case SEARCH_RESULTS_ERR:
            return {...state, resultsErr: action.error};

        default:
            return state;
    }
};

export default followReducer;