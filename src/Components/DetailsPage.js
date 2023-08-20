import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getMovieDetails } from '../Redux/actions';
import { Link, useParams } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, Grid, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export const DetailsPage = (props) => {

    const [movie, setMovieDetails] = useState({});
    const params = useParams();

    useEffect(() => {
        props.getMovieDetails(params && params.id && params.id);
    }, [props, params]);

    useEffect(() => {
        props && props.data.movieDetails && props.data.movieDetails != null && setMovieDetails(props.data.movieDetails);
    }, [props])

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: 'white'}}>
                    <Toolbar>
                        <Typography
                            variant="h4"
                            component="div"
                            color="CaptionText"
                            sx={{ display: { xs: 'block', md: 'block' } }}
                        >
                            Movie Details
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'flex', md: 'flex', sm: 'flex' } }}>
                            <IconButton
                                edge="end"
                                component={Link}
                                to={"/"}
                            >
                                <HomeIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {movie ? 
            <Box sx={{ margin: "25px" }}>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={12} xs={12}>
                        <img src={movie && movie.poster_path && ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                            alt={movie && movie.title}
                            height={'300px'}
                            width={'280px'}
                        />
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography gutterBottom variant="h4" component="div">
                            {movie && movie.original_title}
                            <span style={{ color: "#9B9B9B" }} > ({movie && movie.popularity}) </span>
                        </Typography>
                        <Divider style={{ margin: "10px" }} />
                        <Typography variant="h5">
                            {`Release date: ${movie && movie.release_date}`}
                        </Typography>
                        <Typography variant="h5">
                            Genre:
                            {movie && movie.genres && movie.genres.map((item) => (
                                ` ${item.name} | `
                            ))}
                        </Typography><br />
                        <Typography variant="h6">
                            {`Description: ${movie && movie.overview ? movie.overview : "Not available"}`}
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
                :
            <p>Loading</p>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({ data: state.data })
const mapDispatchToProps = { getMovieDetails }

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);