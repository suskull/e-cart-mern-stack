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

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container className='py-3'>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/login' exact component={SignInScreen} />
          {/* <Route path='/cart' exact component={CartScreen} /> */}
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
