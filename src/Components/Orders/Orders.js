import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const Orders = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/orders?email='+loggedInUser.email, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setOrders(data));
    },[])

    const {id} = useParams();

    return (
        <div>
            <h3>This is Order:  {orders[0]?.email}</h3>
            {
                console.log(orders[0])
            }

        </div>
    );
};

export default Orders;