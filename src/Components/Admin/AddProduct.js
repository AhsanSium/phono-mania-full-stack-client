import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import AdminBar from './AdminBar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
      background:'#ccefff94',
      padding:'15px',
      borderRadius:'10px',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const AddProduct = () => {

    const [image, setImage] = useState({
        imageURL:'',
        isUploading:false
    });
    const { register, handleSubmit, watch, errors } = useForm();
    const handleImageUpload = event => {
        setImage({isUploading:true});
        const imageData = new FormData();
        imageData.set('key','b4ae6a0ba23102c9dec5c0b9be2ab6fb');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
              console.log(response.data.data.display_url);
            setImage({imageURL : response.data.data.display_url ,isUploading:false});
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const onSubmit = data => {
        console.log('Inside Submit', data)
        console.log('Inside Image', image)
        const eventData = {
            name: data.name,
            price: data.price,
            imageURL: image?.imageURL
        };
        const url = 'https://cherry-pie-50881.herokuapp.com/addProduct';
        console.log(eventData);
        console.log(data);
        fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(res => {
            console.log(res);
            alert('Product Added');
        });
    };

    const classes = useStyles();

    return (
        <div>
            
            
            <Container maxWidth="lg">
            <AdminBar></AdminBar>
            <Container style={{marginLeft:'20%'}} maxWidth="lg">
            <h3>Add Product</h3>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                
                <TextField id="standard-basic" variant="outlined" name="name" placeholder="NAME" ref={register}/>
                {/* <input name="name" placeholder="NAME" defaultValue="Name" ref={register} /> */}

                <br/>
                <TextField id="outlined-basic" variant="outlined" name="price" placeholder="PRICE" ref={register}/>
                {/* <input name="price" placeholder="PRICE" ref={register}  /> */}
                <br/>
                {
                    console.log(image.isUploading)
                }
                {
                    image.isUploading &&
                    <p>Image Uploading</p>
                }
                <TextField id="outlined-basic" variant="outlined" name="exampleRequired" type="file" onChange={handleImageUpload} />
                
                {/* <input name="exampleRequired" type="file" onChange={handleImageUpload} /> */}
                {/* {errors.exampleRequired && <span>This field is required</span>} */}
                <br/>
                <TextField id="outlined-basic" variant="outlined"  type="submit" />
                {/* <input type="submit" /> */}
            </form>
            </Container>
            </Container>
        </div>
    );
};

export default AddProduct;