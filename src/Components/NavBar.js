import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { connect } from 'react-redux';
import MoviesGrid from './MoviesGrid';
import { CustomStyles } from '../Styles/CustomStyles';

export const NavBar = (props) => {

    const classes = CustomStyles();

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(12),
            width: '600px',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'black',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className={classes.appBarStyle}>
                    <Toolbar>
                        <Typography
                            variant="h4"
                            component="div"
                            color="CaptionText"
                            sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                            Movies Bar
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon color="action" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'flex', md: 'flex', sm: 'flex' } }}>
                            <IconButton
                                edge="end"
                                //onClick={handleProfileMenuOpen}
                            >
                                <HomeIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ margin: "25px"}}>
                <MoviesGrid/>
            </Box>
        </div>
    )
}

export default NavBar;