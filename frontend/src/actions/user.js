import axios from 'axios'
const { USER_LOGIN, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_LOGOUT, CLEAR_MESSAGE, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } = require("./types")

export const userLogin = (email, password) => async(dispatch) => {
    
    try {
        dispatch({
            type: USER_LOGIN
        })            

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
        })
        setTimeout(() => {
            dispatch({
                type: CLEAR_MESSAGE
            })
    
        }, 1000)
    }
  
}

export const userLogout = () => async (dispatch) => {
    dispatch({
        type:USER_LOGOUT
    })
}
export const userRegister = (name,email,password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER
        })            

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/register', {name,email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
        })
        setTimeout(() => {
            dispatch({
                type: CLEAR_MESSAGE
            })
    
        }, 1000)
    }
}