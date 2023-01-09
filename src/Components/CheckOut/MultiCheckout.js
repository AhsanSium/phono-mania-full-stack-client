import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import { Container, Grid, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        background: '#ccefff94',
        padding: '15px',
        borderRadius: '10px',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const MultiCheckOut = ({ cart }) => {

    const classes = useStyles();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const { orderId } = useParams();
    // const [product, setProduct] = useState({
    //     id: '',
    //     isLoading: false,
    //     data: null
    // });
    // useEffect(() => {
    //     const newProduct = { ...product };
    //     newProduct.isLoading = true;
    //     newProduct.id = orderId;
    //     fetch('https://phono-mania-server.onrender.com/productById/' + orderId)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             newProduct.data = data;
    //             newProduct.isLoading = false;
    //             setProduct(newProduct);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })

    // }, [setProduct]);

    // // console.log(product.data?.name);
    // const name = product.data?.name;
    // const image = product.data?.imageURL;
    // const price = product.data?.price;

    let items = 0;
    let price = 0;

    cart.forEach(element => {
        items += element.qty;
        price += element.qty * element.price;
    });

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        const orderDetails = { products: cart, shipment: data, user: loggedInUser, orderTime: new Date(), email: loggedInUser.email, totalItem: items, totalPrice: price };
        console.log(orderDetails);
        fetch('https://phono-mania-server.onrender.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Order Placed');
                }
            })
    };


    return (
        <Container maxWidth="lg" style={{ marginTop: '10rem' }}>
            <h3>Order Page</h3>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table" style={{ textAlign: 'center' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name: </TableCell>
                                    {/* <TableCell>Order Id: </TableCell> */}
                                    <TableCell style={{ textAlign: 'center' }}>Image: </TableCell>
                                    <TableCell>Quantity: </TableCell>
                                    <TableCell>Price: </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cart.map(product =>
                                        <TableRow>
                                            <TableCell>{product.name && product.name}</TableCell>
                                            {/* <TableCell>{orderId}</TableCell> */}
                                            <TableCell style={{ textAlign: 'center' }}>
                                                <img width="20%" src={product.imageURL && product.imageURL} alt="" />
                                            </TableCell>
                                            <TableCell>{product.qty && product.qty} </TableCell>
                                            <TableCell>{product.price * product.qty}</TableCell>
                                        </TableRow>
                                    )
                                }
                                <TableRow>
                                    <TableCell>
                                        Total Items: {items}
                                    </TableCell>
                                    <TableCell>
                                        Total Price: {price}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>

                        <input name="name" defaultValue={loggedInUser.name} placeholder="Name" ref={register({ required: true })}
                            style={{ border: '1px dotted cyan', padding: '8px', borderRadius: '10px', background: 'white' }}
                        />
                        {errors.name && <span>This field is required</span>}
                        <br />
                        <input name="Email" placeholder="E-mail" defaultValue={loggedInUser.email} ref={register({ required: true })}
                            style={{ border: '1px dotted cyan', padding: '8px', borderRadius: '10px', background: 'white' }}
                        />
                        {errors.Email && <span>This field is required</span>}
                        <br />

                        <textarea name="address" placeholder="Address" ref={register({ required: true })}
                            style={{ border: '1px dotted cyan', padding: '8px', borderRadius: '10px', background: 'white' }}
                        />
                        {errors.address && <span>This field is required</span>}
                        <br />

                        <input type="submit" value='Place Order'
                            style={{ border: '1px dotted cyan', padding: '5px', borderRadius: '10px', background: 'white', cursor: 'pointer' }}
                        />

                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.shop.cart,
    }
}

export default connect(mapStateToProps)(MultiCheckOut);