import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // appBar: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    // },
    drawer: {
        [theme.breakpoints.up("md")]: {
          width: drawerWidth,
          flexShrink: 0
        }
    },
    drawerPaper: {
        width: '16%',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
}));


const AdminBar = () => {
    

    const classes = useStyles();

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}> <MenuIcon /> Menu </Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>

                    <div className={classes.toolbar} />
                    <List style={{marginTop:'25%'}}>
                        {/* {['Inbox', 'Starred', 'Send email'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))} */}
                        <Link style={{textDecoration:'none',color:'#2b4fff'}} to="/addProduct">
                        <ListItem button >
                            <ListItemText primary={'Add Product'} />
                        </ListItem>
                        </Link>
                        <Link style={{textDecoration:'none',color:'#ff1f67'}} to="/manageProduct">
                        <ListItem button >
                            <ListItemText primary={'Manage Product'} />
                        </ListItem>
                        </Link>
                        <Link style={{textDecoration:'none',color:'#007979'}} to="/editProduct">
                        <ListItem button >
                            <ListItemText primary={'Edit Product'} />
                        </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </React.Fragment>
            ))}
      </div>
    );
};

export default AdminBar;