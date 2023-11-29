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
    const {toggleTheme } = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ color: "#233142", backgroundColor: "#66bfbf" }}>
                <Toolbar>
                    <Avatar src={ChurchIcon} alt="Reg" sx={{ width: 70, height: 70, lineHeight: "50%" }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, width: 25, height: 25, lineHeight: "30px", marginLeft: "10px" }}>
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

