import React, { useEffect, useState } from 'react';
import PhoneDetails from '../PhoneDetails/PhoneDetails';
import loadingImage from '../../images/loading.gif';

const Home = () => {

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

    // console.log(products[0]?.name);
    // <PhoneDetails event={product}></PhoneDetails>

    return (
        <div>
            <h3>This is Home</h3>
            {
                products.loading &&
                <img src={loadingImage} alt="loading Image"/>
            }
            {
                products.data&&products.data.map(product => <PhoneDetails props={product}></PhoneDetails> )
            }
        </div>
    );
};

export default Home;