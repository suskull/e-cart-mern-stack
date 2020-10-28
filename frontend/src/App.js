import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInScreen from "./screens/SignInScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { ShippingScreen } from "./screens/ShippingScreen";
import NotFound from "./components/NotFound";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
    <>
      <Router>
        <Header />
        <Container className='py-3'>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/login'  component={SignInScreen} />
          <Route path='/signup' component={RegisterScreen} />
          <Route path='/profile'  component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <PrivateRoute path='/shipping' component={ShippingScreen}/>
          <PrivateRoute path='/payment' component={PaymentScreen}/>
          <PrivateRoute path='/placeorder' component={PlaceOrderScreen}/>
          

          {/* <Route component={NotFound}/> */}
        </Container>
  

        <Footer />
      </Router>
    </>
  );
}

export default App;
