import React, { createContext, useState } from 'react';
import Menu from './Components/Header/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';
import Login from './Components/Login/Login';
import Deals from './Components/Deals/Deals';
import Orders from './Components/Orders/Orders';
import CheckOut from './Components/CheckOut/CheckOut';
import ManageProduct from './Components/Admin/ManageProduct';
import AddProduct from './Components/Admin/AddProduct';
import EditProduct from './Components/Admin/EditProduct';
import PrivateRoute from './Components/Login/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div>
          <Menu></Menu>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/deals">
              <Deals></Deals>
            </Route>
            <Route path="/orders">
              <Orders></Orders>
            </Route>
            <Route path="/login">
              <Login></Login>
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
            <Route  path="*">
              <h3>404 Error</h3>
            </Route>
          </Switch>
        </div>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
