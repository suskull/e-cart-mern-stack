import React, { useState, useEffect } from "react";
// import products from "../products";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/products";
import Spinner from "../components/layout/Spinner";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state?.productList);
  const { products, isLoading } = productList;

  useEffect(() => {
    setTimeout(() => {
       dispatch(getProducts());
    }, 1000)
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Row>
          {products?.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
