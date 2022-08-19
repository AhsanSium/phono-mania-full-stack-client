import React, { useEffect, useState } from 'react';
import PhoneDetails from '../PhoneDetails/PhoneDetails';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/Shopping/shopping-actions';
import tw from "twin.macro";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import AwesomeSlider from 'react-awesome-slider';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
import loadingImage from '../../images/loading-small.gif';
import image1 from "../../images/slider2.jpg";
import image2 from "../../images/slider3.jpg";
import image3 from "../../images/slider4.jpg";
import image4 from "../../images/slider5.jpg";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    searchBar: {
        position: 'relative',
        top: '-165px',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const AutoplaySlider = withAutoplay(AwesomeSlider);

// const Slider = (

// );


const CardButton = tw(PrimaryButtonBase)`text-sm`;


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const Home = ({ fetchData, shop }) => {

    const [toggle, setToggle] = useState(false);

    const [products, setProducts] = useState({
        loading: true,
        data: [],
        error: ''
    });

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });

    const [filteredResults, setFilteredResults] = useState([]);

    const [selectedValue, setSelectedValue] = React.useState('');

    useEffect(() => {
        fetchData();
    }, [fetchData, toggle]);

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



    useEffect(() => {
        let newProducts = { ...products };
        newProducts.data = shop.data;
        newProducts.loading = shop.loading;
        newProducts.error = shop.error;
        setProducts(newProducts);
        setFilteredResults(newProducts.data)
    }, []);

    const [searchInput, setSearchInput] = useState('');

    //const products = shop;

    console.log(shop, products, filteredResults);

    // useEffect(()=>{
    // setProducts({ loading: true });
    // fetch('https://cherry-pie-50881.herokuapp.com/products')
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    //     setProducts({ loading: false, data:data });
    // })
    // .catch(err => console.log(err));
    // },[setProducts]);

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        console.log(searchValue);
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredData = shop.data.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            console.log(filteredData)
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(products.data)
        }
    }

    const handleChangeSwitch = (event) => {



        console.log(event.target.name, event.target.checked);
        if (event.target.name === 'checkedA') {
            setState({ ...state, [event.target.name]: event.target.checked, checkedB: false });
            if (event.target.checked === true) {
                const highToLow = shop.data.sort((a, b) => parseInt(a.price) < parseInt(b.price) ? 1 : -1);
                console.log(highToLow, 'High to Low');
                setFilteredResults(highToLow)
            }
        }
        if (event.target.name === 'checkedB') {
            setState({ ...state, [event.target.name]: event.target.checked, checkedA: false });
            if (event.target.checked === true) {
                const highToLow = shop.data.sort((a, b) => parseInt(a.price) > parseInt(b.price) ? 1 : -1);
                setFilteredResults(highToLow)
            }
        }

        if (event.target.name === 'samsung' || 'xiaomi' || 'iphone' || 'other') {
            const iPhone = [];
            const samsung = [];
            const xiaomi = [];
            const others = [];

            // shop&&shop.data.filter(singleData =>{
            //   if(singleData.name.includes('Iphone') || singleData.name.includes('Apple')){
            //       iPhone.push({
            //         imageSrc: singleData.imageURL,
            //         title: singleData.name,
            //         content: "Apple IPhone",
            //         price: singleData.price,
            //         rating: "5.0",
            //         reviews: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
            //         id: singleData._id,
            //         url: "#"
            //       })
            //   }
            //   else if(singleData.name.includes('Samsung')){
            //     samsung.push({
            //       imageSrc: singleData.imageURL,
            //       title: singleData.name,
            //       content: "Samsung",
            //       price: singleData.price,
            //       rating: "5.0",
            //       reviews: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
            //       id: singleData._id,
            //       url: "#"
            //     })
            //   }
            //   else if(singleData.name.includes('Xiaomi')){
            //     xiaomi.push({
            //       imageSrc: singleData.imageURL,
            //       title: singleData.name,
            //       content: "Xiaomi",
            //       price: singleData.price,
            //       rating: "5.0",
            //       reviews: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
            //       id: singleData._id,
            //       url: "#"
            //     })
            //   }
            //   else{
            //     others.push({
            //       imageSrc: singleData.imageURL,
            //       title: singleData.name,
            //       content: singleData.name.split(" ")[0],
            //       price: singleData.price,
            //       rating: "5.0",
            //       reviews: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
            //       id: singleData._id,
            //       url: "#"
            //     })
            //   }
            // })

            if (event.target.name === 'samsung') {
                setSelectedValue('samsung');

                shop && shop.data.filter(singleData => {
                    if (singleData.name.includes('Samsung') || singleData.name.includes('samsung')) {
                        samsung.push(singleData)
                    }
                })

                setFilteredResults(samsung);
            }
            if (event.target.name === 'xiaomi') {
                setSelectedValue('xiaomi');

                shop && shop.data.filter(singleData => {
                    if (singleData.name.includes('Xiaomi') || singleData.name.includes('xiaomi')) {
                        xiaomi.push(singleData)
                    }
                })

                setFilteredResults(xiaomi);
            }
            if (event.target.name === 'iphone') {
                setSelectedValue('iphone');

                shop && shop.data.filter(singleData => {
                    if (singleData.name.includes('Iphone') || singleData.name.includes('Apple') || singleData.name.includes('iphone')) {
                        iPhone.push(singleData)
                    }
                })

                setFilteredResults(iPhone);
            }

            if (event.target.name === 'other') {
                setSelectedValue('other');
                shop && shop.data.filter(singleData => {
                    if (singleData.name.includes('Iphone') || singleData.name.includes('Apple') || singleData.name.includes('iphone') || singleData.name.includes('Xiaomi') || singleData.name.includes('xiaomi') || singleData.name.includes('Samsung') || singleData.name.includes('samsung')) {
                    }
                    else {
                        others.push(singleData)
                    }
                })
                setFilteredResults(others);
            }

        }


    };

    return (
        <div style={{ minHeight: '1200px' }}>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false}
                interval={3000}
                style={{ marginTop: '0rem' }}
                animation="foldOutAnimation"
                cssModule={[AnimationStyles]}
                infinite={true}

            >
                <div data-src={image4}>
                    <p>Best SmartPhones</p>
                </div>
                <div data-src={image2} >
                    <p>Best SmartPhones</p>
                </div>
                <div data-src={image3} >
                    <p>Best SmartPhones</p>
                </div>
                <div data-src={image1}  >
                    <p>Best SmartPhones</p>
                </div>
            </AutoplaySlider>
            <div className={classes.searchBar}>
                <Container maxWidth="md">
                    <AppBar position="static" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'black' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Search Phone" {...a11yProps(0)} />
                            <Tab label="Sort By Price" {...a11yProps(1)} />
                            <Tab label="Sort By Brand" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
                        <div className={classes.margin}>
                            <Grid container spacing={0} alignItems="flex-end">
                                <Grid item>
                                    <PhoneAndroidIcon />
                                </Grid>
                                <Grid item>
                                    <TextField id="input-with-icon-grid" label=" Search" onChange={(e) => handleSearch(e)} />
                                </Grid>
                                {/* <Grid item>
                            <Button>Enter</Button>
                        </Grid> */}
                            </Grid>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1} style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
                        <FormControlLabel
                            control={<Switch checked={state.checkedA} onChange={handleChangeSwitch} name="checkedA" />}
                            label="High to Low"
                        />
                        <FormControlLabel
                            control={<Switch checked={state.checkedB} onChange={handleChangeSwitch} name="checkedB" color='primary' />}
                            label="Low to High"
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2} style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
                        <div>
                            <FormControlLabel
                                value="start"
                                control={
                                    <Radio
                                        checked={selectedValue === 'samsung'}
                                        onChange={handleChangeSwitch}
                                        value="samsung"
                                        name="samsung"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                }
                                label="SAMSUNG"
                                labelPlacement="end"
                            />

                            <FormControlLabel
                                value="start"
                                control={
                                    <Radio
                                        checked={selectedValue === 'xiaomi'}
                                        onChange={handleChangeSwitch}
                                        value="xiaomi"
                                        name="xiaomi"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                }
                                label="XIAOMI"
                                labelPlacement="end"
                            />

                            <FormControlLabel
                                value="start"
                                control={
                                    <Radio
                                        checked={selectedValue === 'iphone'}
                                        onChange={handleChangeSwitch}
                                        value="iphone"
                                        name="iphone"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                }
                                label="I-PHONE"
                                labelPlacement="end"
                            />

                            <FormControlLabel
                                value="start"
                                control={
                                    <Radio
                                        checked={selectedValue === 'other'}
                                        onChange={handleChangeSwitch}
                                        value="other"
                                        name="other"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                }
                                label="OTHER"
                                labelPlacement="end"
                            />

                        </div>
                    </TabPanel>
                </Container>
            </div>
            <Container maxWidth="lg">
                {/* <h1 style={{textAlign:'center'}}>Shop</h1> */}

                <div className={classes.root}>
                    {
                        shop.loading &&
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                            <img style={{ textAlign: 'center' }} src={loadingImage} alt="loading Image" />
                        </div>
                    }
                    <Grid container spacing={4} >
                        {
                            (typeof filteredResults !== 'undefined' && filteredResults.length === 0) ? shop && shop.data.map(product =>
                                <Grid key={product._id && product._id} item
                                    xs={12} sm={6} md={4}
                                >
                                    <PhoneDetails key={product._id} product={product}></PhoneDetails>
                                </Grid>
                            )
                                :
                                filteredResults.map(product =>
                                    <Grid key={product._id && product._id} item
                                        xs={12} sm={6} md={4}
                                    >
                                        <PhoneDetails key={product._id} product={product}></PhoneDetails>
                                    </Grid>
                                )
                        }
                    </Grid>
                    {
                        shop.error && shop.error ?
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
                                <p>Error: {shop.error}</p>
                                <CardButton type="button"
                                    onClick={() => setToggle(toggle === false ? true : false)}
                                >Reload
                                </CardButton>
                            </div>
                            : ''
                    }
                </div>
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        shop: state.shop,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);