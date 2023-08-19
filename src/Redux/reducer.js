import { MOVIES_BROWSER} from "./actionTypes";

const initialState = {
	moviesList: [],	
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
		default:
			return state;
	}
};
export default moviesDataReducer;