import  {USER_LOGIN, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT, CLEAR_MESSAGE, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from '../actions/types'

export const userLoginReducer = (state={}, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isLoading: true
            }

        case USER_LOGIN_SUCCESS: 
            return {
                ...state,
                userInfo: action.payload,
                isLoading: false

            }
        case USER_LOGIN_FAILURE : 
            return {
                ...state,
                error: action.payload,
                isLoading: false

            }    
        case USER_LOGOUT :
            return {}    
        case CLEAR_MESSAGE: 
            return {
                ...state,
                error: null
            }

        
        default:
            return state;
    }
}

export const userRegisterReducer = (state={}, action) => {
    switch (action.type) {
        case USER_REGISTER:
            return {
                ...state,
                isLoading: true
            }

        case USER_REGISTER_SUCCESS: 
            return {
                ...state,
                userInfo: action.payload,
                isLoading: false

            }
        case USER_REGISTER_FAILURE : 
            return {
                ...state,
                error: action.payload,
                isLoading: false

            }   
        case CLEAR_MESSAGE: 
            return {
                ...state,
                error: null
            }

        
        default:
            return state;
    }
}
