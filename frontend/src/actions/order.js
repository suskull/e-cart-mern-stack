import axios from 'axios'
import { ORDER_CREATE_FAILURE, ORDER_CREATE, ORDER_CREATE_SUCCESS } from './types'
export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({type: ORDER_CREATE})

        const {userInfo: {token}} = getState().userLogin
        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`

            }
        }

        const {data} = await axios.post('/api/orders', order, config)

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: error?.response?.data?.message ? error?.response?.data?.message : error.message
        })
    }
}