import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import AdminBar from './AdminBar';
import AdminImage from '../../images/AdminPanel.jpg';
import { Image } from '@material-ui/icons';
const Admin = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        if ((sessionStorage.getItem('user'))) {
            setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
        }
    }, [])

    return (
        <div style={{ marginTop: '20vh', marginLeft: '5vh', overflow: 'none', display: 'flex', justifyContent: 'space-evenly' }}>
            <Grid item xs={3}><AdminBar></AdminBar></Grid>
            <Grid item xs={9} style={{ display: 'flex', alignItems: 'center' }} >
                <div style={{ maxWidth: '50%', fontFamily: 'sans-serif' }}>
                    <h2>Admin Panel</h2>
                    <h4>Hello {loggedInUser.name ? loggedInUser.name : loggedInUser.email}</h4>
                    <p>Welcome to Admin Panel <br /> <br />Click Menu for Navigation <br /> <br /> <br /> <br /> <br /> <small> More Functionalites are coming soon .... </small>  </p>
                </div>
                <div style={{ maxWidth: '50%' }}>
                    <img src={AdminImage} style={{ width: '100%', paddingLeft: '20px' }} />
                </div>
            </Grid>
        </div>

    );
};

export default Admin;