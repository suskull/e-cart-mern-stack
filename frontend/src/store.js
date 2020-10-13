import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productList, productDetails} from './reducers/products'
import {cartReducer} from './reducers/cart'
import {userLoginReducer} from './reducers/user'

const reducer = combineReducers({
    productList,
    productDetails,
    cart: cartReducer,
    user: userLoginReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}

const initialState = {
   cart: { cartItems : cartItemsFromStorage},
   user: { userInfo: userInfoFromStorage}

}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

  
)

export default store