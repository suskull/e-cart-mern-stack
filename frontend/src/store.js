import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productList, productDetails} from './reducers/products'
import {cartReducer} from './reducers/cart'
import {userLoginReducer, userRegisterReducer, userDetailsReducer} from './reducers/user'
import { orderReducer } from './reducers/order'

const reducer = combineReducers({
    productList,
    productDetails,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    orderCreate: orderReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const shippingMethodFromStorage = localStorage.getItem('shippingMethod') ? JSON.parse(localStorage.getItem('shippingMethod')) : ''
const initialState = {
   cart: { 
       cartItems : cartItemsFromStorage, 
       shippingAddress: shippingAddressFromStorage,
       shippingMethod: shippingMethodFromStorage
   },
   userLogin: { userInfo: userInfoFromStorage

}

}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

  
)

export default store