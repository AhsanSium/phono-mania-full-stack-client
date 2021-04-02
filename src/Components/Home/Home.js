import React, { useEffect, useState } from 'react';
import PhoneDetails from '../PhoneDetails/PhoneDetails';
import loadingImage from '../../images/loading.gif';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },    
  }));

const Home = () => {

    const [products, setProducts] = useState({
        loading: false,
        data: null,
    });
    // const [appState, setAppState] = useState({
    //     loading: false,
    //     data: null,
    //   });


    // async function fetchData() {
    //     setUsers(
    //             await fetch('https://reqres.in/api/users')
    //             .then(res => res.json())
    //             .then(res => res.data)
    //             .catch(err => console.log(err, 'error...'))


    useEffect(()=>{
        setProducts({ loading: true });
        fetch('https://cherry-pie-50881.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts({ loading: false, data:data });
        })
        .catch(err => console.log(err));
    },[setProducts])

    // console.log(products[0]?.name);
    // <PhoneDetails event={product}></PhoneDetails>


//     <Grid key={users.id} item
//          xs={12} sm={6} md={4} lg={4} xl={3}
//      >
//       <PplCard
//          key={users.id} email={users.email} firstname={users.first_name}
//              lastname={users.last_name} avatar={users.avatar}
//          />
//      </Grid>

    const classes = useStyles();

    return (
        <Container maxWidth="lg">
        <div className={classes.root}>
            <h1 style={{textAlign:'center'}}>Welcome to PhonoMania</h1>
            <Grid container spacing={4}>
            {
                products.loading &&
                <img style={{width:'100%', textAlign:'center'}} src={loadingImage} alt="loading Image"/>
            }
            {
                products.data&&products.data.map(product =>
                    <Grid item
                    xs={12} sm={6} md={4}
                    >
                        <PhoneDetails props={product}></PhoneDetails>
                    </Grid> 
                    )
            }
            </Grid>
        </div>
        </Container>
    );
};

export default Home;