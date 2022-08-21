import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import AdminBar from './AdminBar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import tw from "twin.macro";

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#ccefff94',
        padding: '15px',
        borderRadius: '10px',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Form = tw.form`text-sm max-w-sm sm:max-w-none mx-auto`
const Input = tw.input`w-full sm:w-auto block sm:inline-block px-6 py-4 rounded bg-secondary-600 tracking-wider font-bold border border-secondary-600 focus:border-secondary-300 focus:outline-none sm:rounded-r-none hover:bg-secondary-500 transition duration-300 text-gray-200`
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;


const AddProduct = () => {

    const [image, setImage] = useState({
        imageURL: '',
        isUploading: false
    });
    const { register, handleSubmit, watch, errors } = useForm();
    const handleImageUpload = event => {
        setImage({ isUploading: true });
        const imageData = new FormData();
        imageData.set('key', 'b4ae6a0ba23102c9dec5c0b9be2ab6fb');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                setImage({ imageURL: response.data.data.display_url, isUploading: false });
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
            headers: {
                'Content-Type': 'application/json'
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
        <div style={{ marginTop: '15rem' }}>
            <Container maxWidth="lg">
                <AdminBar></AdminBar>
                <Container style={{ marginLeft: '20%' }} maxWidth="lg">
                    <h3>Add Product</h3>
                    <Form className={classes.root} onSubmit={handleSubmit(onSubmit)}>

                        <Input name="name" placeholder="NAME" ref={register} required />

                        <br />
                        <Input name="price" placeholder="PRICE" ref={register} required />
                        <br />
                        {
                            console.log(image.isUploading)
                        }
                        {
                            image.isUploading &&
                            <p>Image Uploading</p>
                        }

                        <Input name="exampleRequired" type="file" onChange={handleImageUpload} required />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <br />
                        <SubmitButton type="submit">Submit</SubmitButton>
                    </Form>
                </Container>
            </Container>
        </div>
    );
};

export default AddProduct;