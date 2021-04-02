import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import AdminBar from './AdminBar';
const Admin = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
            <Grid container spacing={3}>
                <Grid item xs={4}><AdminBar></AdminBar></Grid>
                <Grid item xs={8}>
                    <h2>This is Admin Panel</h2>
                    <h4>Hello, {loggedInUser.name}</h4>
                </Grid>
            </Grid>
            
    );
};

export default Admin;