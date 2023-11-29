import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChurchIcon from "../assets/ChurchIcon.jpg";
import { Avatar } from '@mui/material';
import { useTheme } from '../ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function ButtonAppBar() {
    const { toggleTheme } = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ color: "#233142", backgroundColor: "#66bfbf" }}>
                <Toolbar>
                    <Avatar src={ChurchIcon} alt="Reg" sx={{ width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 }, lineHeight: "50%" }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', md: '1.5rem' }, marginLeft: { xs: '5px', md: '10px' } }}>
                        Father's Heart Digital Church
                    </Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        <Brightness4Icon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
