import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from './onboarding/Login'
import Signup from './onboarding/Signup'
import Cards from './trips/Cards'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

function App() {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/trips" component={Cards} />
    </>
  )
}

export default App
