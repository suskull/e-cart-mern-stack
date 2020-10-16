import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userLogout, updateUserProfile } from "../actions/user";
import Spinner from '../components/layout/Spinner'
import Message from '../components/layout/Message'
const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("")

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, error, isLoading, isAuthenticated, success } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(user);

  useEffect(() => {
       if(!userInfo) {
           history.push('/login')
       } else {
    if (!user?.name) {
      dispatch(getCurrentUser());
    } else {
      setName(user?.name);
      setEmail(user?.email);
    }
  }
   
  }, [user, dispatch, userInfo]);

//   if(!isAuthenticated) {
//     //   dispatch(userLogout())
//     //   alert('Your token is expired')
//         history.push('/')
//   }
// //    }

  const handleFormSubmit = e => {
    e.preventDefault();

    if(password !== confirmPassword) {
        setMessage('Password does not match')

        setTimeout(() => {
          setMessage('')

        },1000)
    } else if(name==='Hieu Vu') {
      setMessage('test')

      setTimeout(() => {
        setMessage('')

      },1000)
    } else {
    dispatch(updateUserProfile({name, email, password, currentPassword}))
      setPassword('')
      setConfirmPassword('')
      setCurrentPassword('')
    }
  }
  return (
    <>
      {isLoading ?<Spinner />  :(
        <Row style={{ minHeight: "80vh" }}>
          <Col md={4}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>{success}</Message>}
            <Form onSubmit={handleFormSubmit}>
              <Form.Group>
                <Form.Label> User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                 required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  // required
                ></Form.Control>
              </Form.Group>
              <Button type="submit">Update</Button>
            </Form>
          </Col>
          <Col md={8}>
            <h2>My Orders</h2>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileScreen;
