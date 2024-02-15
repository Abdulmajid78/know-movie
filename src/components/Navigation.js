import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

import {useHistory, useLocation} from 'react-router-dom'
import {useEffect} from "react";

export default function LabelBottomNavigation() {
    const location = useLocation()
    const [value, setValue] = React.useState(
        location.pathname === '/' ? 'trending' :
                location.pathname === '/movies' ? 'movies' :
                location.pathname === '/series' ? 'series' :
                'search'
    );
    const history = useHistory()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(value)
    console.log(history)

    useEffect(() => {
        if (value === 'trending') {
            history.push('/')
        } else if (value === 'movies') {
            history.push('/movies')
        } else if (value === 'series') {
            history.push('/series')
        } else if (value === 'search') {
            history.push('/search')
        }

    }, [value]);

    return (
        <div>
            <BottomNavigation className="bottom-navigation" value={value} onChange={handleChange}>
                <BottomNavigationAction
                    className="text-dark-emphasis"
                    label="Trending"
                    value="trending"
                    icon={<WhatshotIcon/>}
                />
                <BottomNavigationAction
                    className="text-dark-emphasis"
                    label="Movies"
                    value="movies"
                    icon={<MovieCreationIcon/>}
                />
                <BottomNavigationAction
                    className="text-dark-emphasis"
                    label="Series"
                    value="series"
                    icon={<TvIcon/>}
                />
                <BottomNavigationAction
                    className="text-dark-emphasis"
                    label="Search"
                    value="search"
                    icon={<SearchIcon/>}
                />
            </BottomNavigation>
        </div>
    );
}
