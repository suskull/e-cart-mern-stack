import {useSelector}from 'react-redux'
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const {userInfo} = useSelector(state => state.userLogin)
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo !== null? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />

  );
};

export default PrivateRoute;
