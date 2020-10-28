import React , {useState} from "react";
import _ from 'lodash'
import FormContainer from "../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from 'react-redux'
import { savePaymentMethod } from "../actions/cart";
const PaymentScreen = ({history}) => {

  const {shippingAddress, shippingMethod} = useSelector(state => state.cart)
  const [paymentMethod, setPaymentMethod] = useState(shippingMethod);

  const dispatch = useDispatch()

    console.log(paymentMethod)

  if(_.isEmpty(shippingAddress)) {
        history.push('/shipping')
  }

  const handleFormSubmit = e => {
      e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label as="legend">Choose your payment method</Form.Label>
          <Col>
          <Form.Check
            type="radio"
            label="PayPal or CreditCard"
            name="paymentMethod"
            id="PayPal"
            value="PayPal"
            checked={paymentMethod ==='PayPal' ? true : false}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
            <Form.Check
            type="radio"
            label="Stripe"
            name="paymentMethod"
            id="Stripe"
            value="Stripe"
             checked={paymentMethod ==='Stripe' ? true : false}

            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        </Form.Group>

        <Button type='submit'>Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
