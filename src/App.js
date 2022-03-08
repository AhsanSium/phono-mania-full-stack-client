import React, { createContext, useState } from 'react';
import Menu from './Components/Header/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Home2 from './Components/Home/Home2';
import Admin from './Components/Admin/Admin';
import Login from './Components/Login/Login';
import Deals from './Components/Deals/Deals';
import Orders from './Components/Orders/Orders';
import CheckOut from './Components/CheckOut/CheckOut';
import ManageProduct from './Components/Admin/ManageProduct';
import AddProduct from './Components/Admin/AddProduct';
import EditProduct from './Components/Admin/EditProduct';
import PrivateRoute from './Components/Login/PrivateRoute';
import Header from "./Components/headers/light.js";
import CartPage from './Components/CartPage/CartPage';
import { Button } from '@material-ui/core';
import MultiCheckout from './Components/CheckOut/MultiCheckout';
import SingleItem from './Components/Cart/SingleItem';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div>
        <Header />
          {/* <Menu></Menu> */}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/shop">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home2/>
            </Route>
            <Route exact path="/">
              <Home2/>
            </Route>
            <Route path="/deals">
              <Deals></Deals>
            </Route>
            <Route path="/cart">
              <CartPage />
            </Route>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/single-product">
              <SingleItem />
            </Route>
            <PrivateRoute path="/admin">
              <Admin></Admin>
            </PrivateRoute>
            <PrivateRoute path="/addProduct">
              <AddProduct></AddProduct>
            </PrivateRoute>
            <PrivateRoute path="/editProduct">
              <EditProduct></EditProduct>
            </PrivateRoute>
            <PrivateRoute path="/manageProduct">
              <ManageProduct></ManageProduct>
            </PrivateRoute>
            <PrivateRoute path="/productOrders/:orderId">
              <CheckOut></CheckOut>
            </PrivateRoute>
            <PrivateRoute path="/checkout">
              <MultiCheckout></MultiCheckout>
            </PrivateRoute>
            <Route  path="*">
              <div style={{marginTop:'15rem', textAlign:'center'}}>
                <h3 >404 Error <br/> Page Not Found</h3>
                <Link to="/">
                  <Button color={"secondary"}>
                    Back To Home
                  </Button>
                </Link>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
