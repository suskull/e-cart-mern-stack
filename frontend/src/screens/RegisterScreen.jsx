import React, {useState} from "react";
import { Form, Row, Col, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector}  from 'react-redux';
import {userRegister} from '../actions/user'
import { useEffect } from "react";
import Message from "../components/layout/Message";

const RegisterScreen = ({history}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const user = useSelector(state => state.userRegister)
  const {userInfo, error, isLoading} = user

  const handleFormSubmit = e => {
    e.preventDefault()
    if(password !== confirmPassword) {
        setMessage('Password does not match')
        setTimeout(() => {
          setMessage('')
        }, 1000)
    } else {
     dispatch(userRegister(name,email,password))
    }
  }

  useEffect(() => {
    if(userInfo) {
      history.push('/')

    }
  }, [userInfo])


  return (
    <FormContainer>
      <h1>Sign up</h1>
      {message && <Message variant='danger' >{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
      <Button type='submit' variant='primary'>Sign up</Button>

      </Form>
      <Row className='py-3'>
            <Col>
            Already have account ? {' '}
            <Link to='/login'>
                Login            
            </Link>
            </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
