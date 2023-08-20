import React, {useState} from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from '../Styles/CustomStyles';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MoviesGrid from './MoviesGrid';
import { options } from '../Redux/actions';
import axios from 'axios';

export const NavBar = (props) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        if (!searchQuery) return;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`, options);
            const list = response && response.data && response.data.results;
            return list;
        } catch (error) {
            console.error('Failed to fetch:', error);
            return [];
        }
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: 'white' }}>
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
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSearchSubmit();
                                    }
                                }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'flex', md: 'flex', sm: 'flex' } }}>
                            <IconButton edge="end">
                                <HomeIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ margin: "25px" }}>
                <MoviesGrid handleSearchSubmit={handleSearchSubmit}/>
            </Box>
        </div>
    )
}

export default NavBar;