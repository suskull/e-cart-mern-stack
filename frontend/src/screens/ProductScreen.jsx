import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { getProductById } from "../actions/products";
import { useDispatch, useSelector } from "react-redux";

import Rating from "../components/Rating";
import Spinner from "../components/layout/Spinner";
const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { isLoading, product } = productList;

  useEffect(() => {
      setTimeout(() => {
    dispatch(getProductById(match.params.id));

      },1000)
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
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
                  <ListGroup.Item>
                    <button className="btn btn-dark btn-block">
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
