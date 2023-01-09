import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import AdminBar from './AdminBar';
import { UserContext } from '../../App';

const ManageProduct = () => {

    const [products, setProducts] = useState({
        loading: false,
        data: null,
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        if ((sessionStorage.getItem('user'))) {
            setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
        }
    }, [])

    useEffect(() => {
        setProducts({ loading: true });
        fetch('https://phono-mania-server.onrender.com/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts({ loading: false, data: data });
            })
            .catch(err => console.log(err));
    }, [setProducts])

    const handleDelete = (id) => {
        if (window.confirm('Are You Sure, You want to Delete The Product?')) {
            console.log(id);
            if (loggedInUser.admin === true) {
                fetch('https://phono-mania-server.onrender.com/delete/' + id, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result, 'Deleted');
                        alert('Product Deleted');
                        // history.replace(from);
                    })
            }
            else {
                alert("Sorry ! You are Not Authorized to Delete")
            }

        }
    }

    return (
        <div style={{ marginTop: '15rem' }}>
            <div style={{ marginLeft: '20%' }}>
                <AdminBar></AdminBar>
                <h3>Manage Product</h3>
                {
                    products.loading &&
                    <h3>Loading Products</h3>
                }
                <table style={{ padding: '5vh' }}>
                    <thead style={{ padding: '5vh', margin: '5vh' }}>
                        <tr style={{ padding: '5vh', margin: '5vh' }}>
                            <td>Name : </td>
                            <td>Price: </td>
                            <td>Delete: </td>
                        </tr>

                    </thead>
                    <tbody style={{ padding: '5vh', margin: '5vh' }}>
                        {
                            products.data && products.data.map(product =>
                                <tr style={{ padding: '5vh', margin: '5vh' }}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td><Button size="small" variant="contained" color="secondary" onClick={() => handleDelete(product._id)}>Delete </Button></td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;