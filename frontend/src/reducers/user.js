import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  CLEAR_MESSAGE,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_FETCH,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAILURE,
  USER_UPDATE_SUCESS,
  USER_UPDATE,
  USER_UPDATE_FAILURE
} from "../actions/types";

export const userLoginReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        // isAuthenticated: false
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
        // isAuthenticated: true
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        // isAuthenticated: false
      };
    case USER_LOGOUT:
      return {};
    case CLEAR_MESSAGE:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        isLoading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case USER_LOGOUT:
      return {};
    case CLEAR_MESSAGE:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_FETCH:
    case    USER_UPDATE:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case USER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
      case    USER_UPDATE_SUCESS:
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          isAuthenticated: true,
          success: 'Profile updated'
        };
    case USER_DETAILS_FETCH_FAILURE:
     case    USER_UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAuthenticated: false,
      };
      case USER_LOGOUT:
        return {};
        case CLEAR_MESSAGE:
      return {
        ...state,
        success: null,
        error: null
      };
    default:
      return state;
  }
};

// export const userLogoutReducer = (state = { }, action) => {
//     switch (action.type) {
//         case USER_LOGOUT:
//             return {
//                 ...state,
//                 isAuthenticated: false
//             }

//         default:
//             break;
//     }
// }
