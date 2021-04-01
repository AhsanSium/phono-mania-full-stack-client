import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navLink:{
        textDecoration:'none',
        color:'white',
        margin:'1%',
        "&:hover": {
            background: "#efefef"
          }
    }
    
}));

const Menu = () => {

    const classes = useStyles();

    return (
        <div>
            
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            PhonoMania
                        </Typography>

                        
                            <NavLink className={classes.navLink} to='/'>
                                Home
                            </NavLink>
                       
                        
                        
                            <NavLink className={classes.navLink} to='/admin'>
                                Admin
                            </NavLink>
                            
                        
                        
                            <NavLink className={classes.navLink} to='/orders'>
                                Orders
                            </NavLink>
                            
                        
                        
                            <NavLink className={classes.navLink} to='/deals'>
                                Deals
                            </NavLink>
                            
                       
                
                            <NavLink className={classes.navLink} to='/login'>
                                Login
                            </NavLink>
                            
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
};

export default Menu;