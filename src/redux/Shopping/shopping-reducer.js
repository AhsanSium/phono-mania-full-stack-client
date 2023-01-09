// import { useEffect, useState } from 'react';
import * as actionTypes from './shopping-types';

// const [products, setProducts] = useState({
//     loading: false,
//     data: null,
//   });

// useEffect(()=>{
// setProducts({ loading: true });
// fetch('https://phono-mania-server.onrender.com/products')
// .then(res => res.json())
// .then(data => {
//     console.log(data);
//     setProducts({ loading: false, data:data });
// })
// .catch(err => console.log(err));
// },[setProducts]);

const INITIAL_STATE = {
    data: [], // {id, title, description, price, img}
    cart: [], // {id, title, description, price, img, qty}
    currentItem: null,
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case actionTypes.FETCH_DATA_ERROR:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload,
            }
        case actionTypes.FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.ADD_TO_CART:
            // Get the items data from the products array
            const item = state.data.find(singleData => singleData._id === action.payload.id);

            // Check if the item is in the cart already.
            const inCart = state.cart.find(item => item._id === action.payload.id ? true : false);

            return {
                ...state,

                cart: inCart ?
                    state.cart.map((item) => item._id === action.payload.id ? { ...item, qty: item.qty + 1 } : item) : [...state.cart, { ...item, qty: 1 }],

            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item._id !== action.payload.id),
            }
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => item._id === action.payload.id ? { ...item, qty: action.payload.qty } : item
                ),
            }
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            }
        default:
            return state;
    }
}

export default shopReducer;