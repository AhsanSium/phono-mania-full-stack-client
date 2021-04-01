import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import AdminBar from './AdminBar';


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
        const url = 'http://localhost:5000/addProduct';
        console.log(eventData);
        console.log(data);
        fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(res => console.log(res));
    };

    return (
        <div>
            
            
            <Container maxWidth="lg">
            <AdminBar></AdminBar>
            <Container style={{marginLeft:'50%'}} maxWidth="lg">
            <h3>Add Product</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <input name="name" placeholder="NAME" defaultValue="Name" ref={register} />

                <br/>
                <input name="price" placeholder="PRICE" ref={register}  />
                <br/>
                {
                    console.log(image.isUploading)
                }
                {
                    image.isUploading &&
                    <p>Image Uploading</p>
                }
                <input name="exampleRequired" type="file" onChange={handleImageUpload} />

                {/* {errors.exampleRequired && <span>This field is required</span>} */}
                <br/>
                <input type="submit" />
            </form>
            </Container>
            </Container>
        </div>
    );
};

export default AddProduct;