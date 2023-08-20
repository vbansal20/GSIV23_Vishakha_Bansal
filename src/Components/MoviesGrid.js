import React, { useState, useEffect } from 'react'
import {
    Card, CardActionArea, Typography, CardMedia, CardContent, Grid,
    Tooltip, Stack, Pagination, Box
} from '@mui/material';
import { getMovieListing } from '../Redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const MoviesGrid = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [searchRes, setSearchResult] = useState([]);
    const [page, setPage] = useState(1);

    const searchAndDisplayMovies = async () => {
        const data = await (props && props.handleSearchSubmit());
        setSearchResult(data);
    };

    useEffect(() => {
        props.getMovieListing(page);
    }, [props.getMovieListing, page]);

    useEffect(() => {
        if(searchRes && searchRes.length > 0){
            setMovieList(searchRes);
        }
        else{
            props && props.data.moviesList && props.data.moviesList.length > 0 && setMovieList(props.data.moviesList);
        }
    }, [searchRes, props.data.moviesList])

    const handleChange = (event, value) => {
        setPage(value);
        props.getMovieListing(value);
    };

    return (
        <div>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    {movieList && movieList.map((item, index) => (
                        <>
                            <Grid item sm={6} xs={12} md={3}>
                                <Card sx={{ height: "100%", borderRadius: "10px" }} key={index}>
                                    <CardActionArea component={Link} to={`/details/${item.id}`}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item && item.poster_path ?
                                                ("https://image.tmdb.org/t/p/original" + item.poster_path) :
                                                item.backdrop_path && ("https://image.tmdb.org/t/p/original" + item.backdrop_path)}
                                            alt={item.title}
                                            style={{ fontSize: '12px' }}
                                        />
                                        <CardContent>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography gutterBottom variant="body1" component="div">
                                                    {item && item.original_title}
                                                </Typography>
                                                <Typography gutterBottom variant="body1" component="div">
                                                    {item && item.popularity}
                                                </Typography>
                                            </div>

                                            <Tooltip title={item && item.overview}>
                                                <Typography
                                                    style={{
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        'WebkitBoxOrient': 'vertical',
                                                        wordBreak: 'break-word',
                                                        'WebkitLineClamp': 2,
                                                    }}
                                                    variant="body2" color="text.secondary">
                                                    {item && item.overview ? item.overview : "Not available"}
                                                </Typography>
                                            </Tooltip>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </>
                    ))}
                </Grid>

                <Box display="flex" justifyContent="center">
                    <Pagination
                        count={20}
                        page={page}
                        onChange={handleChange}
                        size='large'
                    />
                </Box>

            </Stack>

        </div>
    )
};

const mapStateToProps = (state) => ({ data: state.data })
const mapDispatchToProps = { getMovieListing, }

export default connect(mapStateToProps, mapDispatchToProps)(MoviesGrid);
