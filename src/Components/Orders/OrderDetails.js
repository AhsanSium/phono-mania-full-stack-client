import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';



const OrderDetails = (props) => {

    const name = props.props.user.name;
    const image = props.props.products.imageURL;
    const price = props.props.products.price;
    const orderTime = props.props.orderTime;
    const address = props.props.shipment.address;

    console.log(props.props);

    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>1</TableCell>
            <TableCell>{(new Date(orderTime)).toDateString('dd/MM/yyyy')}</TableCell>
            <TableCell><img style={{width:'60px'}} src={image} alt=""/></TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>${price}</TableCell>
        </TableRow>
        
    );
};

export default OrderDetails;