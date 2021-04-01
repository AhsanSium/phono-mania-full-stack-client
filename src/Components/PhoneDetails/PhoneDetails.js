import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const PhoneDetails = (props) => {

    console.log(props);
    const product = props.props;
    const history = useHistory();

    const handlePurchase = () => {

        const url = `/orders/:${product._id}`;
        history.push(url);
    }

    return (
        <div>
            <p>{product.name}</p>
            <img src={product.imageURL} alt=""/>
            <p>Price: {product.price}</p>
            <Link to={`/productOrders/${product._id}`}>Buy Now</Link>
        </div>
    );
};

export default PhoneDetails;