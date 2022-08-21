import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 340;

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
        width: '26%',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    list: {
        width: 350,
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
                        <List style={{ marginTop: '25%' }}>
                            {/* {['Inbox', 'Starred', 'Send email'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))} */}
                            <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to="/admin">
                                <ListItem button >
                                    <ListItemText primary={'Admin'} />
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: '#2b4fff', fontWeight: 'bold' }} to="/addProduct">
                                <ListItem button >
                                    <ListItemText primary={'Add Product'} />
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: '#ff1f67', fontWeight: 'bold' }} to="/manageProduct">
                                <ListItem button >
                                    <ListItemText primary={'Manage Product'} />
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: '#007979', fontWeight: 'bold' }} to="/editProduct">
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