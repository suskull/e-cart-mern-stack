import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
const {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  CLEAR_MESSAGE,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_FETCH_FAILURE,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH,
  USER_UPDATE_FAILURE,
  USER_UPDATE,
  USER_UPDATE_SUCESS,
  CART_CLEAR_ITEM
} = require("./types");

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 1000);
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });

  dispatch({
    type: CART_CLEAR_ITEM
  })

  localStorage.removeItem('userInfo')
};
export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 1000);
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    // if (localStorage.userInfo.token) {
    //   setAuthToken(localStorage.userInfo.token);
    // }
    dispatch({
      type: USER_DETAILS_FETCH,
    });
    const {userInfo: {token}} = getState().userLogin
    
    const config = {

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.get("/api/users/profile", config);

    dispatch({
      type: USER_DETAILS_FETCH_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FETCH_FAILURE,
      payload: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    });
    dispatch(userLogout())
  }
};


export const  updateUserProfile = user => async (dispatch, getState) => {
  try {
    
    dispatch({
      type: USER_UPDATE
    })

        const {userInfo: {token}} = getState().userLogin
    
    const config = {

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.put('/api/users/profile', user, config)

    dispatch({
      type: USER_UPDATE_SUCESS,
      payload: data,
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 1000);
  }
}