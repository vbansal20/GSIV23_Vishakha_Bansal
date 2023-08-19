import React, { useState, useEffect } from 'react'
import { Card, CardActionArea, Typography, CardMedia, CardContent, Grid, 
    Tooltip, Stack, Pagination, Box } from '@mui/material';
import { getMovieListing } from '../Redux/actions';
import { connect } from 'react-redux';
import { CustomStyles } from '../Styles/CustomStyles';
import { Link } from 'react-router-dom';

export const MoviesGrid = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const classes = CustomStyles();

    useEffect(() => {
        props.getMovieListing(page);
    }, [getMovieListing]);

    useEffect(() => {
        props && props.data.moviesList && props.data.moviesList.length > 0 && setMovieList(props.data.moviesList);
    }, [props])

    const handleChange = (event, value) => {
        setPage(value);
        props.getMovieListing(page);
    };

    return (
        <div>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    {movieList && movieList.map((item, index) => (
                        <>
                            <Grid item sm={6} xs={12} md={3}>
                                <Card sx={{ height: "100%" }} key={index} className={classes.cardStyles}>
                                    <CardActionArea component={Link} to={`/details/${item.id}`}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item && ("https://image.tmdb.org/t/p/original"+item.poster_path)}
                                            alt={item && item.original_title}
                                        />
                                        <CardContent>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {item && item.original_title}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {item && item.popularity}
                                                </Typography>
                                            </div>

                                            <Tooltip title={item && item.overview}>
                                                <Typography className={classes.ellipsisText} variant="body2" color="text.secondary">
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
}

const mapStateToProps = (state) => ({ data: state.data })
const mapDispatchToProps = { getMovieListing, }

export default connect(mapStateToProps, mapDispatchToProps)(MoviesGrid);
