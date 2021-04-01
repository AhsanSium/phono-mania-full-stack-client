import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";

const CheckOut = () => {

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
        fetch('http://localhost:5000/productById/' + orderId)
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

    }, [setProduct])

    // console.log(product.data?.name);
    const name = product.data?.name;
    const image = product.data?.imageURL;
    const price = product.data?.price;

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        const orderDetails = {products:product.data, shipment:data, user:loggedInUser, orderTime:new Date(), email:loggedInUser.email};
        console.log(orderDetails);
        fetch('http://localhost:5000/addOrder', { 
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('Order Placed');
            }
        })
    };


    return (
        <div>
            <h3>CheckOut</h3>
            <p>{orderId}</p>
            <p>Name: {name}</p>
            <img src={image} alt="" />
            <p>Price: {price}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                
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
            
            </form>
        </div>
    );
};

export default CheckOut;