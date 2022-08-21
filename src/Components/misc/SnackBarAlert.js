import { Snackbar } from '@material-ui/core';
import React, { forwardRef, useState } from 'react';
import Alert from '@mui/material/Alert';


// const FancyButton = React.forwardRef((props, ref) => (
//     <button ref={ref} className="FancyButton">
//       {props.children}
//     </button>
//   )); message, status, open, setOpen,


const SnackBarAlert = React.forwardRef((props, ref) => {

    const handleClick = () => {
        props.setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };
    console.log("Inside SnackBar")

    return (
        <Snackbar open={props.open} autoHideDuration={2500} onClose={handleClose} ref={ref}>
            <Alert onClose={handleClose} severity={props.status} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
})

export default SnackBarAlert;