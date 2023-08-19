import React, { useState, useEffect } from 'react'
import { Card, CardActionArea, Typography, CardMedia, CardContent, Grid } from '@mui/material';
import { getMovieListing } from '../Redux/actions';
import { connect } from 'react-redux';

export const MoviesGrid = (props) => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        props.getMovieListing();
    }, [getMovieListing]);

    useEffect(() => {
        props && props.data.moviesList && props.data.moviesList.length > 0 && setMovieList(props.data.moviesList);
    }, [props])

    return (
        <div>
            <Grid container spacing={1}>
                {movieList && movieList.map((item, index) => (
                    <>
                        <Grid item sm={3}>
                            <Card sx={{ maxWidth: 345 }} key={index}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item && item.poster_path}
                                        alt={item && item.original_title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item && item.original_title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item && item.overview ? item.overview : "Not available"}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </>
                ))}
            </Grid>

        </div>
    )
}

const mapStateToProps = (state) => ({ data: state.data })
const mapDispatchToProps = { getMovieListing, }

export default connect(mapStateToProps, mapDispatchToProps)(MoviesGrid);
