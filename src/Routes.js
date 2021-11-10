import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Edit from "./components/Admin/Edit";
import Add from "./components/Admin/Add";
import Home from "./components/Home/Home";
import ShopContextProvider from "./context/ShopContext";
import UserContextProvider from "./context/UserContext";
import AuthContextProvider from "./components/Auth/AuthContextProvider";
import Login from "./components/Auth/Login";
import Detail from "./components/Detail/Detail";
import Favourit from "./components/Favourite/Favourit";
import CreditCard from "./components/CreditCard/CreditCard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";

const Routes = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ShopContextProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={Add} />
              <Route exact path="/edit" component={Edit} />
              <Route exact path="/auth" component={Login} />
              <Route exact path="/detail" component={Detail} />
              <Route exact path="/fav" component={Favourit} />
              <Route exact path="/credit" component={CreditCard} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </ShopContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default Routes;
