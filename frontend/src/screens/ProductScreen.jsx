import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";
import { getProductById } from "../actions/products";
import { addToCart } from "../actions/cart";
import { useDispatch, useSelector } from "react-redux";

import Rating from "../components/Rating";
import Spinner from "../components/layout/Spinner";
import Message from "../components/layout/Message";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(0);
  console.log(qty);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { isLoading, product, error } = productDetails;

  useEffect(() => {
    dispatch(getProductById(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=${qty}`)
    dispatch(addToCart(match.params.id, qty))
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="product-screen">
          <Link to="/">
            <button className="btn btn-light my-3">Go Back</button>
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product?.image} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>{product?.name}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>{product?.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product?.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock > 0 ? "In Stock" : "Out Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row style={{ alignItems: "center" }}>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product?.countInStock).keys()]
                              .slice(0, 10)
                              .map((x) => (
                                <option key={x } value={x }>
                                  {x }
                                </option>
                              ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <button className="btn btn-dark btn-block" onClick={addToCartHandler} disabled={product.countInStock === 0}>
                      Add to Cart
                    </button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
