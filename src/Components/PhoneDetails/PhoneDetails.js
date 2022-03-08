import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/Shopping/shopping-actions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
        maxWidth: '100%',
        borderRadius:'15px',
        boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
    },
  }));

const PhoneDetails = ({product, addToCart}) => {

    const classes = useStyles();

    //console.log(addToCart);
    // const product = props;
    const history = useHistory();

    const handlePurchase = () => {
        const url = `/orders/:${product._id}`;
        history.push(url);
    }
    //console.log(product);

    const value = '4.' + Math.floor(Math.random() * (9 - 0 + 1)) + 0;

    return (
          <Paper className={classes.paper} style={{width:'auto', height:'550px', display:'flex', justifyContent:'space-between',flexDirection:'column', alignItems:'center'}}>
            <h3>{product.name}</h3>
            <img style={{width:'100%', maxWidth:'250px',height:'300px' }} src={product.imageURL} alt=""/>
            <Rating name="read-only" value={value} readOnly />
            <h4>Price: ${product.price}</h4>
            <div>
                <Link style={{textDecoration:'none', color:'black'}} to={`/productOrders/${product._id}`}>
                    <Button variant="outlined" color="primary" >Buy Now</Button>
                </Link>
                <Button variant="outlined" style={{borderColor:'#009465', color:"#00cc8b"}} onClick={()=> addToCart(product._id)}>
                  Add To Cart
                </Button>
            </div>
          </Paper>
        
    );
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  }
}

export default connect(null, mapDispatchToProps)(PhoneDetails);