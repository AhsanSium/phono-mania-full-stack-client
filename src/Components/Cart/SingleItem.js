import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Button, Container } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import Typography from '@material-ui/core/Typography';
import styles from './singleItem.module.css';
import { addToCart } from '../../redux/Shopping/shopping-actions';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    smallImg: {
        width:'80px',
    },
    imgPaper:{
        padding:'10px',
        margin:'5px'
    }
  }));

const SingleItem = ({data , addToCart}) => {

    const classes = useStyles();
    console.log(data);
    const value = '4.' + Math.floor(Math.random() * (9 - 0 + 1)) + 0;

    return (
        <Container style={{marginTop:'10rem'}} maxWidth="md">
            {
                data?
                <Grid container spacing={2}>
                <Grid item sm={12} md={7}>
                    <Paper className={classes.paper}>
                        <div style={{}}>
                            <img style={{width:'75%', maxWidth:'400px'}} src={data&&data.imageSrc} alt="" />
                            <div style={{marginTop:'1.75rem'}}>
                            <Rating  name="read-only" value={value} readOnly />
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={5}>
                    <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        {data.title}
                    </Typography>
                    <Chip
                        icon={<LocalAtmOutlinedIcon style={{color:'white'}} />}
                        label={data.price&&data.price}
                        style={{background:'black', color:'white', padding:'1rem 2rem', fontSize:'18px'}}
                    />

                    <div style={{marginTop:'3rem'}}>
                        <Typography variant="overline" display="block" gutterBottom>
                            Description
                        </Typography>

                        <Typography style={{marginTop:'1rem', textAlign:'left'}} variant="body2" gutterBottom>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum! Provident similique accusantium nemo autem.
                        </Typography>
                    </div>
                    <div style={{display:'flex', marginTop:'3rem', justifyContent:'center'}}>
                        <Paper className={`${classes.imgPaper} ${styles.hover}`}>
                            <img className={classes.smallImg} src={data&&data.imageSrc} alt='' />
                        </Paper>
                        <Paper className={`${classes.imgPaper} ${styles.hover}`}>
                            <img className={classes.smallImg} src={data&&data.imageSrc} alt='' />
                        </Paper>
                        <Paper className={`${classes.imgPaper} ${styles.hover}`}>
                            <img className={classes.smallImg} src={data&&data.imageSrc} alt='' />
                        </Paper>
                    </div>

                    <div style={{display:'flex', marginTop:'3rem', justifyContent:'space-around'}}>
                        <Button variant="contained" onClick={()=>addToCart(data.id)}>Add To Cart</Button>
                        <Link to={`/productOrders/${data.id}`}>
                            <Button variant="contained" style={{background:'black', color:'white'}}>Buy Now</Button>
                        </Link>
                    </div>
                    </Paper>
                </Grid>
            </Grid>
            :
            <div style={{textAlign:'center', marginTop:'2rem'}}>
                <Typography variant="h5" gutterBottom>
                        No Product Selected!
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                    Go Back To
                </Typography>
                <Link style={{margin:'1rem'}} to="/shop">
                    <Button variant="contained">Shop</Button>
                </Link>
                <Link style={{margin:'1rem'}} to={`/`}>
                    <Button variant="contained" style={{background:'black', color:'white'}}>Home</Button>
                </Link>
            </div>
            }
            
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      data: state.shop.currentItem,
    }
};

const mapDispatchToProps = dispatch => {
    return {
      addToCart: (id) => dispatch(addToCart(id)),
    }
};

export default connect (mapStateToProps , mapDispatchToProps)(SingleItem);
