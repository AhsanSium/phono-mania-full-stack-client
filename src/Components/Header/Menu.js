import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: 'none',
        color: 'white',
        margin: '0',
        padding: '8px 15px',
        borderRadius: '5px',
        "&:hover": {
            background: "#163242",
        }
    }

}));

const Menu = () => {

    const classes = useStyles();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className={classes.root}>
            <AppBar style={{ backgroundColor: '#3f84b58f' }} position="static">
                <Toolbar>
                    <NavLink to='/'>
                        <img style={{ width: '100%', margin: '10px' }} src={logo} alt="" />

                    </NavLink>
                    <Typography style={{ width: '100%' }} variant="h6">

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
                        {
                            loggedInUser.email ? loggedInUser.name : 'Login'
                        }
                    </NavLink>

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Menu;