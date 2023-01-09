import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import loadingImage from '../../images/loading.gif';
import OrderDetails from './OrderDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Orders = () => {

    const classes = useStyles();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState({
        loading: false,
        data: null,
    });
    useEffect(() => {
        setOrders({ loading: true });
        fetch('https://phono-mania-server.onrender.com/orders?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders({ loading: false, data: data }));
    }, [])

    const { id } = useParams();

    return (
        <Container maxWidth="lg">
            <h3>This is Order:  {orders[0]?.email}</h3>
            {
                console.log(orders)
            }
            <Grid container spacing={4}>
                {
                    orders.loading &&
                    <img src={loadingImage} alt="loading Image" />
                }
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><h4>Name</h4></TableCell>
                                <TableCell><h4>Quantity</h4></TableCell>
                                <TableCell><h4>Order Time</h4></TableCell>
                                <TableCell><h4>Image</h4></TableCell>
                                <TableCell><h4>Address</h4></TableCell>
                                <TableCell><h4>Price</h4></TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {
                                orders.data && orders.data.map(order =>

                                    <OrderDetails props={order}></OrderDetails>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Container>
    );
};

export default Orders;