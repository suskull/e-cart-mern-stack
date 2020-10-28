import { AccordionToggle } from "react-bootstrap";
import { CART_ADD_ITEM, CART_CLEAR_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../actions/types";

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {}, shippingMethod: ''},
    action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload
  
        const existItem = state.cartItems.find((x) => x.product === item.product)
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
        }
      case CART_REMOVE_ITEM:
        return {
          ...state, 
          cartItems: state.cartItems.filter(item => item.product !== action.payload)
        }  
      case CART_CLEAR_ITEM: 
      return {
        ...state,
        cartItems: []
      }  
      case CART_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload
        }
      case CART_SAVE_PAYMENT_METHOD: 
      return{
        ...state,
        shippingMethod: action.payload
      } 
      default:
        return state
    }
  }
  