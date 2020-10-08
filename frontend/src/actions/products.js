import axios from 'axios'
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS,GET_PRODUCT_BY_ID_FAILURE } from "./types"



export const getProducts = () => async (dispatch) => {
   
    try {
        dispatch({
            type: GET_PRODUCTS
        })
        const res = await axios.get('/api/products')
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAILURE,
            payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
        })
    }
}

export const getProductById = productId => async(dispatch) => {

    try {
        dispatch({
            type: GET_PRODUCT_BY_ID
        })
    const res = await axios.get(`/api/products/${productId}`)
        dispatch({
            type: GET_PRODUCT_BY_ID_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_BY_ID_FAILURE,
            payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
        })
    }
}