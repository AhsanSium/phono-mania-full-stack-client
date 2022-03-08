import axios from 'axios';
import * as actionTypes from './shopping-types';

export const addToCart = (itemID) => {
    return{
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemID
        }
    }
}

export const removeFromCart = ( itemID ) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: itemID
        }
    }
}

export const adjustQty = (itemID, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            id: itemID,
            qty: value,
        }
    }
}

export const loadCurrentItem = (item) => {
    return {
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item,
    }
}

export const fetchDataRequest = () => {
    return {
        type: actionTypes.FETCH_DATA_REQUEST
    }
}

const fetchDataSuccess = data => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        payload: data
    }
}

const fetchDataFailure = error => {
    return {
        type: actionTypes.FETCH_DATA_ERROR,
        payload: error,
    }
}

export const fetchData = () => {
    return (dispatch) => {
        
        dispatch(fetchDataRequest())

        axios.get('https://cherry-pie-50881.herokuapp.com/products')
        .then (response => {
            const data = response.data
            dispatch(fetchDataSuccess(data))
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(fetchDataFailure(errorMsg))
            // console.log(errorMsg);
            // setTimeout(()=>{
            //     const reload = window.confirm(errorMsg + '\n Press OK to reload');
            //     if(reload === true){
            //         document.location.reload()
            //     }
            // }, 3000)
        })
    }
}
