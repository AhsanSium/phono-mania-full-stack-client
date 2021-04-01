import React, { useEffect, useState } from 'react';
import AdminBar from './AdminBar';

const ManageProduct = () => {

    const [products, setProducts] = useState({
        loading: false,
        data: null,
    });
    // const [appState, setAppState] = useState({
    //     loading: false,
    //     data: null,
    //   });

    useEffect(()=>{
        setProducts({ loading: true });
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts({ loading: false, data:data });
        })
        .catch(err => console.log(err));
    },[setProducts])

    const handleDelete = (id) => {
        console.log(id);
        fetch('http://localhost:5000/delete/' + id ,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log(result, 'Deleted');
            // setProducts(products);
        })
    }

    return (
        <div style={{marginLeft:'50%'}}>
            <AdminBar></AdminBar>
            <h3>This Is Manage Product</h3>
            {
                products.data&&products.data.map(product => <li>Name:{product.name} Price:  {product.price} <button onClick={()=>handleDelete(product._id)}>Delete</button> </li> )
            }
        </div>
    );
};

export default ManageProduct;