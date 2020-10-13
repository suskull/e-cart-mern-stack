import React, {useState} from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import Message from '../components/layout/Message'
import { userLogin } from '../actions/user'
import { useEffect } from 'react'
const SignInScreen = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const {error, isLoading, userInfo} = user

    console.log(user)
    console.log('------',error)
    const handleFormSubmit = e =>  {
        e.preventDefault();
        dispatch(userLogin(email, password))
        console.log('trigger')
    }
    // setTimeout(() => {
    //     error = null
    // },500)

    useEffect(() => {
        if(userInfo) {
            history.push('/')
        }
    }, [userInfo])



    return (
        <FormContainer  >
            <h1>SIGN IN</h1>
            
           {error && <Message variant='danger' >{error}</Message>   }
            {isLoading && <Spinner />}
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter you email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter you password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' rounded>
                   Sign Up 
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                New user ? {' '}
                <Link to ='/signup'>
                    Register              
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default SignInScreen
