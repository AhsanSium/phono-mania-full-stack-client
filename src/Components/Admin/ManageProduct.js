import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import AdminBar from './AdminBar';

const ManageProduct = () => {

    const [products, setProducts] = useState({
        loading: false,
        data: null,
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(()=>{
        setProducts({ loading: true });
        fetch('https://cherry-pie-50881.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts({ loading: false, data:data });
        })
        .catch(err => console.log(err));
    },[setProducts])

    const handleDelete = (id) => {
        console.log(id);
        fetch('https://cherry-pie-50881.herokuapp.com/delete/' + id ,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log(result, 'Deleted');
            alert('Product Deleted');
            history.replace(from);
        })
    }

    return (
        <div style={{marginLeft:'20%'}}>
            <AdminBar></AdminBar>
            <h3>This Is Manage Product</h3>
            {
                products.loading &&
                <h3>Loading Products</h3>
            }
            {
                products.data&&products.data.map(product => <li style={{padding:'10px'}}>Name:{product.name} Price:  {product.price} <Button  size="small" variant="contained" color="secondary" onClick={()=>handleDelete(product._id)}>Delete </Button> </li> )
            }
        </div>
    );
};

export default ManageProduct;