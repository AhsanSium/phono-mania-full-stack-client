import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import { Container, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

const CheckOut = () => {

    const classes = useStyles();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { orderId } = useParams();
    const [product, setProduct] = useState({
        id: '',
        isLoading: false,
        data: null
    });
    useEffect(() => {
        const newProduct = { ...product };
        newProduct.isLoading = true;
        newProduct.id = orderId;
        fetch('https://phono-mania-server.onrender.com/productById/' + orderId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                newProduct.data = data;
                newProduct.isLoading = false;
                setProduct(newProduct);
            })
            .catch(err => {
                console.log(err);
            })

    }, [setProduct]);

    // console.log(product.data?.name);
    const name = product.data?.name;
    const image = product.data?.imageURL;
    const price = product.data?.price;

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        const orderDetails = { products: product.data, shipment: data, user: loggedInUser, orderTime: new Date(), email: loggedInUser.email };
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
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table" style={{ textAlign: 'center' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name: </TableCell>
                            <TableCell>Order Id: </TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Image: </TableCell>
                            <TableCell>Price: </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{name}</TableCell>
                            <TableCell>{orderId}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>
                                <img width="20%" src={image} alt="" />
                            </TableCell>
                            <TableCell>{price} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

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

                <input type="submit"
                    style={{ border: '1px dotted cyan', padding: '5px', borderRadius: '10px', background: 'white', cursor: 'pointer' }}
                />

            </form>
        </Container>
    );
};

export default CheckOut;