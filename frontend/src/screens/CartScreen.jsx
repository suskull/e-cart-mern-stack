import React from "react";
// import { useEffect } from "react";
import { ListGroup, Row,Col,Image, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cart";

import {Link} from 'react-router-dom'
const CartScreen = ({ match, location }) => {
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const productId = match.params.id;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, qty, productId]);

  return (
    <div className="cart-screen">
      <Row>
        <Col md={8}>
        <h1>SHOPPING CART</h1>
          <ListGroup variant="flush">
            {cartItems?.map((item) => {
              return (
                <ListGroup.Item>
                  <Row className='cart-item'>
                    <Col md={2}>
                    <Link to={`/product/${item.product}`}>
                     <Image src={item.image} fluid rounded/>
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>
                      {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>
                        ${item.price}
                    </Col>
                    <Col md={2}>
                        <Form.Control 
                        as='select'
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                            {[...Array(item.countInStock).keys()].map(x => 
                            <option key={x +1} value={x+1}>
                                {x+1}
                            </option>)}
                        </Form.Control>
                    </Col>
                    <Col md={3}>
                        <Button type='button'  variant='light' onClick={() => dispatch(removeFromCart(item.product))}>
                            <i className='fas fa-trash-alt'> </i>
                        </Button>
                      
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        {/* <h3> SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) ITEMS</h3> */}
                       <h3>Total: ${cartItems.reduce((acc,item) =>( acc + item.qty * item.price), 0).toFixed(2)}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block' type='button' disabled={cartItems.length === 0 }>Check out</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
