import { MOVIES_BROWSER} from "./actionTypes";

const initialState = {
	moviesList: [],	
	movieDetails: {},
	detailsError: false,
	listError: false,
	showLoading: true,
};

const moviesDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case MOVIES_BROWSER.GET_MOVIE_LISTING:
			return {
				...state,
				moviesList: action.payload,
				showLoading: false,
			}			
		
		case MOVIES_BROWSER.FAILURE_LISTING:
			return {
				...state,
                moviesList: [],
				listError: action.payload,
				showLoading: false,
			}
		case MOVIES_BROWSER.GET_MOVIE_DETAILS:
			return {
				...state,
				movieDetails: action.payload,
				showLoading: false,
			}			
		
		case MOVIES_BROWSER.FAILURE_MOVIE_DETAILS:
			return {
				...state,
                movieDetails: {},
				detailsError: action.payload,
				showLoading: false,
			}
		default:
			return state;
	}
};
export default moviesDataReducer;