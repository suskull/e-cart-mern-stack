import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
} from "../actions/types";

// const inititalState = {
//   products: [],
//   // isLoading: true,
//   // product: null
// };

export const productList = (state = { products: [], isLoading: true }, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [],
        isLoading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };

    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};


export const productDetails = (state = { product: { reviews : []} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        // product: [],
        isLoading: true,
      };

    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
      };

    case GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};