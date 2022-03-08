import React, { useEffect, useState } from 'react';
import { Badge, IconButton, styled } from "@material-ui/core";
//import { styled } from '@mui/material/styles';
//import IconButton from '@mui/material/IconButton';
//import ShoppingCartIcon from '@material-ui/icons-material/ShoppingCart';

// import IconButton from '@mui/material/IconButton';
import { AddShoppingCart } from "@material-ui/icons";
import { connect } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

const style = {
    wrapper:{
        display:'inline',
        // justifyContent:'end',
        // overflowX:'none',
        // position:'sticky',
        // position: '-webkit-sticky',
        // top: 0,
        // height:'1.5rem'
        // padding:'0px',
    },
    cart:{
        position:'sticky'
    }
}


const Cart = ({cart}) => {

    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        let count = 0;
        cart.forEach(element => {
            count += element.qty;
        });  
        setCartCount(count);
    },[cart, cartCount])

    return (
        <div style={style.wrapper}>
            {
            cartCount > 0 ?
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartCount} color="secondary">
                    <AddShoppingCart />
                    {/* <span style={{color:'red'}}>
                        {cartCount}
                    </span> */}
                </StyledBadge>
            </IconButton>
            :<></>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,
    }
}

export default connect (mapStateToProps)(Cart);
