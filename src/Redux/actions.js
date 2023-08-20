import { MOVIES_BROWSER } from './actionTypes';
import axios from 'axios';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTM3NTJjOWZlNDQyMjdhYTZhNDg5OTlmNmEwYmYyMiIsInN1YiI6IjY0ZGZhNTA5YTNiNWU2MDExYzQwZWMzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LCoByYeu7Iu-mlnMTOmU41-Sg27k9jV71PbJCEX8FMI'
    }
};

export const getMovieListing = (pg) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page='+pg+'&primary_release_date.gte=2023-09-01&sort_by=primary_release_date.asc'), options);
            const movieList = response.data && response.data.results;
            dispatch({
                type: MOVIES_BROWSER.GET_MOVIE_LISTING,
                payload: movieList,
            });
        } catch (error) {
            dispatch({
                type: MOVIES_BROWSER.FAILURE_LISTING,
                payload: "Failed to fetch movie data!",
            });
        }
    };
};

export const getMovieDetails = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(('https://api.themoviedb.org/3/movie/'+id+'?language=en-US'), options);
            const movieDeets = response.data && response.data;
            dispatch({
                type: MOVIES_BROWSER.GET_MOVIE_DETAILS,
                payload: movieDeets,
            });
        } catch (error) {
            dispatch({
                type: MOVIES_BROWSER.FAILURE_MOVIE_DETAILS,
                payload: "Failed to fetch movie data!",
            });
        }
    };
};
