import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
        maxWidth: '100%',
        borderRadius:'15px',
        boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
    },
  }));

const PhoneDetails = (props) => {

    const classes = useStyles();

    console.log(props);
    const product = props.props;
    const history = useHistory();

    const handlePurchase = () => {

        const url = `/orders/:${product._id}`;
        history.push(url);
    }

    return (
          <Paper className={classes.paper}>
            <h3>{product.name}</h3>
            <img style={{width:'100%', height:'350px'}} src={product.imageURL} alt=""/>
            <h4>Price: ${product.price}</h4>
            
                <Link style={{textDecoration:'none', color:'black'}} to={`/productOrders/${product._id}`}>
                    <Button variant="outlined" color="primary" >Buy Now</Button>
                </Link>
            
          </Paper>
        
    );
};

export default PhoneDetails;