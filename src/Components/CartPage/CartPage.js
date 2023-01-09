import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import { Button, Container, Grid } from '@material-ui/core';
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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { adjustQty, removeFromCart } from '../../redux/Shopping/shopping-actions';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { Link } from 'react-router-dom';

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

const CartPage = ({ cart, removeFromCart, adjustQty }) => {

    const classes = useStyles();

    console.log(cart);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.forEach(element => {
            items += element.qty;
            price += element.qty * element.price;
        });

        setTotalPrice(price);
        setTotalItems(items);

    }, [cart, totalItems, totalPrice, setTotalPrice, setTotalItems]);

    // const increaseQty = (id) => {
    //     const match1 = cart.find(item => item._id === id ? item : []);
    //     const value1 = match1.qty + 1;
    //     console.log(match1, value1);
    //     //adjustQty(id, value1);
    // };
    // const decreaseQty = (id) => {
    //     const match2 = cart.find(item => item._id === id ? item : []);
    //     const value2 = match2.qty - 1;
    //     console.log(match2, value2);
    //     if(value2>0){
    //         //adjustQty(id, value2);
    //     }
    // };


    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { orderId } = useParams();
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

    // }, [setProduct])

    // console.log(product.data?.name);
    // const name = product&&product.name;
    // const image = product&&product.imageURL;
    // const price = product&&product.price;

    // const { register, handleSubmit, watch, errors } = useForm();
    // const onSubmit = data => {
    //     console.log(data);
    //     const orderDetails = {products:product.data, shipment:data, user:loggedInUser, orderTime:new Date(), email:loggedInUser.email};
    //     console.log(orderDetails);
    //     fetch('https://phono-mania-server.onrender.com/addOrder', { 
    //         method: 'POST',
    //         headers:{'Content-Type':'application/json'},
    //         body: JSON.stringify(orderDetails)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data){
    //             alert('Order Placed');
    //         }
    //     })
    // };

    return (
        <Container maxWidth="lg" style={{ marginTop: '10rem' }}>
            <h3 style={{ textAlign: 'center' }}>Cart</h3>
            <Grid container spacing={2}>

                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> <h4>Name:</h4>  </TableCell>
                                    {/* <TableCell> <h4>Order Id:</h4> </TableCell> */}
                                    <TableCell style={{ textAlign: 'center' }}> <h4>Image:</h4> </TableCell>
                                    <TableCell> <h4>Quantity:</h4> </TableCell>
                                    <TableCell><h4>Price:</h4></TableCell>
                                    <TableCell><h4>Remove:</h4></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cart && cart.map(item =>
                                        <TableRow>
                                            <TableCell>{item.name && item.name}</TableCell>
                                            {/* <TableCell style={{width:'20px'}}>{item._id}</TableCell> */}
                                            <TableCell style={{ textAlign: 'center' }}><img width="30%" src={item.imageURL && item.imageURL} alt="" /> </TableCell>
                                            <TableCell style={
                                                {}
                                            }>
                                                <Grid container>

                                                    <Grid item>
                                                        <span style={{
                                                            fontSize: '18px',
                                                            padding: '2px',

                                                        }}>
                                                            {item.qty && item.qty}
                                                        </span>
                                                    </Grid>
                                                    <Grid item>
                                                        <AddCircleOutlineOutlinedIcon
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: 'green',
                                                            }}
                                                            onClick={
                                                                () => {
                                                                    adjustQty(item._id, item.qty + 1);
                                                                }
                                                            }
                                                        />

                                                    </Grid>
                                                    <Grid item>
                                                        {
                                                            item.qty > 0 &&
                                                            <RemoveCircleOutlineOutlinedIcon
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    color: 'grey'
                                                                }}
                                                                onClick={
                                                                    () => {
                                                                        adjustQty(item._id, item.qty - 1);
                                                                    }
                                                                }
                                                            />

                                                        }

                                                    </Grid>

                                                </Grid>

                                            </TableCell>
                                            <TableCell>${item.qty * item.price} </TableCell>
                                            <TableCell>
                                                <Button onClick={() => removeFromCart(item._id)}>
                                                    <HighlightOffIcon style={{ color: 'red' }} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TableContainer component={Paper} style={{ padding: '5px', textAlign: 'center', paddingBottom: '2.20rem' }}>
                        <h4>
                            Cart Summary
                        </h4>
                        <Grid container spacing={1} style={{ padding: '10px' }}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper} style={{ padding: '8px' }}>
                                    Total : ({totalItems} Items)
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper} style={{ padding: '8px' }}>
                                    Total Price: {totalPrice}
                                </Paper>
                            </Grid>
                        </Grid>
                        <Link to="/checkout">
                            <Button variant="contained" style={{ background: '#007d5e', color: 'white' }}> Checkout</Button>
                        </Link>
                    </TableContainer>
                </Grid>
            </Grid>


            {/* <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                
                <input name="name" defaultValue={loggedInUser.name} placeholder="Name" ref={register({ required: true })} />
                {errors.name && <span>This field is required</span>}
                <br/>
                <input name="Email" placeholder="E-mail" defaultValue={loggedInUser.email} ref={register({ required: true })} />
                {errors.Email && <span>This field is required</span>}
                <br/>

                <input name="address" placeholder="Address" ref={register({ required: true })} />
                {errors.address && <span>This field is required</span>}                
                <br/>
                <input type="submit" />
            
            </form> */}
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.shop.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        adjustQty: (id, value) => dispatch(adjustQty(id, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);