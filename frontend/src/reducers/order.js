import { ORDER_CREATE, ORDER_CREATE_FAILURE, ORDER_CREATE_SUCCESS } from '../actions/types'

export const orderReducer = (state = {} , action) => {
    switch (action.type) {
        case ORDER_CREATE:
            return {
                ...state,
                isLoading: true
            }    
        case ORDER_CREATE_SUCCESS: 
             return {
            ...state,
            isLoading: false,
            message: 'Order created success',
            order: action.payload
        }
        case ORDER_CREATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}